// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreLogMonitorModule, useLogMonitor} from "@ngrx/store-log-monitor";
import {useDockMonitor} from "@ngrx/store-log-monitor/src/dock-monitor";
export const environment = {
  production: false
};

export function instrumentOptions() {
  return {
    monitor: useLogMonitor({ visible: true, position: 'right' })
  };
}

export const extraModules = [
  StoreDevtoolsModule.instrumentStore(instrumentOptions),
  StoreLogMonitorModule
];
