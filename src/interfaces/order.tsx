export interface IOrder {
    id?: BigInteger;
    code?: string;
    customerId?: BigInteger;
    garageId?: string;
    subTotal?: BigInteger;
    total?: BigInteger;
    totalDiscount?: BigInteger;
    thumbnail?: string;
    date?: string;
    garageName?: string;
    status?: string;
    carId?: string;
    arrivalTime?: string;
    garage?: any;
}
