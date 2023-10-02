export interface IOrderDetail {
    [x: string]: any;
    id?: BigInteger;
    type?: string;
    name?: string;
    thumbnail?: string;
    sku?: string;
    unitName?: string;
    note?: string;
    quantity?: BigInteger;
    sellPrice?: BigInteger;
    total?: BigInteger;
}
