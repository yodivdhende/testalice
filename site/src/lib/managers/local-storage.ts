export enum localStorageKeys {
    activeUser =   'active-user',
} 
export type localStorageKey = typeof localStorageKeys[keyof typeof localStorageKeys];

