declare type Store = ReturnType<typeof import('./mod').createStore>['store'];

declare type AppState = ReturnType<Store['getState']>;

declare type Dispatch = Store['dispatch'];
