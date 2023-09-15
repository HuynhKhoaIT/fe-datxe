export interface Order {
    id?: BigInteger;
    code?: string;
    customerId?: BigInteger;
    garageId?: BigInteger;
    subTotal?: BigInteger;
    total?: BigInteger;
    totalDiscount?: BigInteger;
    thumbnail?: string;
    date?: string;
    status?: string;
}
