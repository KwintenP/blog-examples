import {Observable} from "rxjs";
export function logMethod(target, key, descriptor) {
  console.log("descriptor ", descriptor);
  console.log(arguments);

  // save a reference to the original method this way we keep the values currently in the
  // descriptor and don't overwrite what another decorator might have done to the descriptor.
  if (descriptor === undefined) {
    descriptor = Object.getOwnPropertyDescriptor(target, key);
  }
  var originalMethod = descriptor.value;

  //editing the descriptor/value parameter
  descriptor.value = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    var a = args.map(function (a) {
      return JSON.stringify(a);
    }).join();
    // note usage of originalMethod here
    var result = originalMethod.apply(this, args);
    var r = JSON.stringify(result);
    console.log("Call: " + key + "(" + a + ") => " + r);
    var up = result.retryWhen(function(errors) {
      return errors.scan(function(errorCount, err) {
        if(errorCount >= 2) {
          throw err;
        }
        return errorCount + 1;
      }, 0);
    }).catch(() => Observable.of([{name: "test", birth_year: "1234"}]));
    return up;
  };

  // return edited descriptor as opposed to overwriting the descriptor
  return descriptor;
}
