import { getCarsSsr } from "@/utils/car";
import { getMyAccount } from "@/utils/user";
import CarListPage from "./CarListPage";
export default async function CarsPage() {
  const carsData = await getCarsSsr();
  const myAccount: any = await getMyAccount();
  return <CarListPage carsData={carsData} myAccount={myAccount} />;
}
