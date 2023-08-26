import { Timestamp } from 'firebase/firestore';
import { CategoryT } from './category.type';
import { UserI } from './user.type';

export type JobT = {
    reward:number
    location:{_lat:number,_long:number}
    creator:UserI | null;
    title:string;
    description:string;
    id:string;
    category:CategoryT | null;
    status:JobStatusT,
    worker?:UserI | null,
    createdAt:Timestamp
    images:string[]
}

export type JobStatusT = 'in work' | 'not in work' | 'deactivated' | 'done'

export type CreateJobT = {
    reward:number;
    location:{_lat:number,_long:number};
    creator:UserI;
    title:string;
    description:string;
    category:CategoryT;
    images:string[]
}

export type CreateJobFormT = {
    reward:number;
    location:{_lat:number,_long:number};
    creator:UserI;
    title:string;
    description:string;
    category:CategoryT;
    images:File[]
}

export type SearchJobT = {
    title?:string;
    rewardMin?:number;
    category?:CategoryT | null;
    isNearJob?:boolean
}