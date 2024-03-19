import { getMyAccount } from "@/utils/user";
import CartComponent from "./CartComponent";
import { getMyCars } from "../libs/prisma/car";
export default async function Cart() {
  const myAccount: any = await getMyAccount();
  const carsData = await getMyCars({
    phoneNumber: myAccount?.phone,
  });
  return <CartComponent myAccount={myAccount} carsData={carsData.data} />;
}
