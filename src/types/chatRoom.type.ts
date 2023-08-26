import { JobT } from './job.type';
import { MessageT } from './message.type';
import { UserI } from './user.type';
export type ChatRoomT = {
    id:string;
    jobCreator:UserI;
    worker:UserI;
    lastMessage:MessageT;
    job:JobT;
}