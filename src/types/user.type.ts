import { LocationT } from './location.type';

export interface UserI {
    email?:string | null;
    displayName?:string | null;
    photoURL?:string | null;
    createdAt?:string | null;
    rating?:number | null;
    finishedJobs?:number | null;
    id?:string | null;
    lastLocation?:LocationT | null
    balance?:number | null,
    isBanned?:boolean | null
}

export interface createUserI {
    email?:string | null;
    displayName?:string | null;
    photoURL?:string | null;
    createdAt?:string | null;
}