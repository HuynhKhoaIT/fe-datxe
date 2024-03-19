import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import CarListPage from "./CarListPage";
import { getMyCars } from "@/app/libs/prisma/car";
export default async function CarsPage() {
  const myAccount: any = await getMyAccount();
  const carsData = await getMyCars({ phoneNumber: myAccount?.phone });
  return <CarListPage carsData={carsData.data} myAccount={myAccount} />;
}
