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
}

export type CreateJobT = {
    reward:number;
    location:{_lat:number,_long:number};
    creator:UserI;
    title:string;
    description:string;
    category:CategoryT;
}

export type SearchJobT = {
    title?:string;
    rewardMin?:number;
    category?:CategoryT | null;
}