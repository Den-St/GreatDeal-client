export type CategoryT = CreateCategoryT & {
    id:string;
};

export type CreateCategoryT = {
    name:string;
    iconUrl:string;
}