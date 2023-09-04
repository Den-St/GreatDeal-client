import { Timestamp } from 'firebase/firestore';
import { ChatRoomT } from './chatRoom.type';
import { JobT } from './job.type';
import { ReportCategoryT } from './reportCategory.type';
import { UserI } from "./user.type";

export type SearchReportT = {
    creatorId:string;
    suspectId:string;
    categoryIds:string[];
    statuses:string[];
}

export type CreateReportT = {
    creator:string;
    category:string;
    chat?:string;
    comment:string;
    createdAt:Date;
    suspect:string;
    status:string;
    job?:string;
}

export type ReportT = {
    id:string;
    creator:UserI;
    category:ReportCategoryT;
    chat?:string;
    comment:string;
    suspect:UserI;
    createdAt:Timestamp;
    status:string;
    job:JobT;
}