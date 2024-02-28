import { getMyAccount } from "@/utils/user";
import CartComponent from "./CartComponent";
export default async function Cart() {
  const myAccount: any = await getMyAccount();

  return <CartComponent myAccount={myAccount} />;
}
