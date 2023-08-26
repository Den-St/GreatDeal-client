import { UserI } from './user.type';
export type ReceiptI = {
    id:string,
    rate:number,
    review:string,
    jobCreator:UserI,
    worker:UserI | null
}