export type CreateDepositT = {
    user:string
    amount:number
    createdAt:Date
    status:DepositStatusT
}

export type DepositStatusT = 'success' | 'pending';