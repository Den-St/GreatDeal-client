import { JobT } from './job.type';
import { UserI } from './user.type';
export type CreateJobRequestT = {
    applicant:string;
    job:string;
    jobCreator:string;
    createdAt:Date;
    status:JobRequestStatusT
}

export type JobRequestStatusT = 'active' | 'rejected' | 'approved';

export type JobRequestT = {
    applicant:UserI;
    job:JobT;
    jobCreator:UserI;
    createdAt:Date;
    status:JobRequestStatusT;
    id:string;
}