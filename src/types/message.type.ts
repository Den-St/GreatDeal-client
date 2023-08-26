import { Timestamp } from 'firebase/firestore';
import { UserI } from './user.type';
export type MessageT = {
    id:string;
    sender:UserI;
    text:string;
    chatRoom:string;
    createdAt:Timestamp;
    images:string[] | null
}
export type CreateMessageFormT = {
    text:string;
    images:File[] | null
    // images:FileList | null
}

export type CreateMessageT = {
    sender:string;
    text:string;
    chatRoom:string
    createdAt:Date;
    images?:string[];
}