import { getCarsSsr } from '@/utils/car';
import CarComponent from './CarComponent';
import { getMyAccount } from '@/utils/user';
export default async function CarsPage() {
    const myAccount: any = await getMyAccount();
    return <CarComponent myAccount={myAccount} />;
}
