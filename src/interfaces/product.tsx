export interface IProduct {
  id?: BigInteger;
  productCode?: string;
  name?: string;
  description?: string;
  images?: string;
  unitId?: BigInteger;
  categoryId?: BigInteger;
  entryPrice?: number;
  salePrice?: number;
  price?: number;
  garageId?: string;
  garage?: any;
  title?: string;
}
