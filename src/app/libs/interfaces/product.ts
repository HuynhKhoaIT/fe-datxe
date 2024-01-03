export interface IProduct {
    id?: number;
    productId?: number;
    name?: string;
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
}
