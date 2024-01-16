export interface IProduct {
    id?: number;
    productId?: number;
    isProduct?: boolean;
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    salePrice?: number;
    quantity?: number;
    images?: string;
    metaDesciption?: string;
    createBy?: number;
    garageId?: number;
    status?: string;
    timeSaleStart?: Date;
    timeSaleEnd?: Date;
    createAt?: Date;
    updateAt?: Date;
    categories?: object;
    brands?: object;
    brandDetail?: string;
    createdBy?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
