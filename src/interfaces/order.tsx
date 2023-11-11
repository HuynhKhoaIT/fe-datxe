export interface IOrder {
    id?: BigInteger;
    code?: string;
    customerId?: BigInteger;
    garageId?: number;
    subTotal?: BigInteger;
    total?: BigInteger;
    totalDiscount?: BigInteger;
    thumbnail?: string;
    date?: string;
    garageName?: string;
    status?: string;
    carId?: string;
}
