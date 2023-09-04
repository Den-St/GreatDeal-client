import { ReportT } from './report.type';
import { UserI } from './user.type';
export type CreateReportResultT = {
    suspect:string;
    comment:string;
    report:string;
    sentence:string;
}

export type ReportResulT = {
    suspect:UserI;
    comment:string;
    report:ReportT;
    sentence:string;
}