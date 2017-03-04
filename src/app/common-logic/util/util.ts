import {Observable} from 'rxjs';
export function retry(times = 3, fallback: any) {
  return (target, key, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      // call the original method (should return an observable, add check here)
      // augment the observable with retry mechanism and fallback implementation
      return originalMethod.apply(this)
      // retry 3 times, fail afterwards
        .retryWhen((errors) => {
          return errors.scan((errorCount, err) => {
            console.log('Try ' + (errorCount + 1));
            if (errorCount >= times - 1) {
              throw err;
            }
            return errorCount + 1;
          }, 0).delay(1000);
        })
        // Adding a catch clause allows you to set a fallback, this can be passed as
        // a parameter to the retry decorator
        .catch(() => Observable.of(fallback));
    };
    // return edited descriptor as opposed to overwriting the descriptor
    return descriptor;
  };
}
