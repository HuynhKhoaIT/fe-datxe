import CartComponent from './CartComponent';
import { getCarsSsr } from '@/utils/car';
import { getMyAccount } from '@/utils/user';

export default async function Cart() {
    //Lấy danh sách xe
    const fetchedCars = await getCarsSsr();
    const carOptions = fetchedCars?.map((car) => ({
        value: car.id?.toString() || '',
        label: car.licensePlates || '',
        otherData: {
            carId: car.id?.toString() || '',
            brandId: car.brandCarName.id,
            brandName: car.brandCarName.name,
            modelId: car.modelCarName.id,
            modelName: car.modelCarName.name,
        },
    }));
    const account: any = await getMyAccount();

    const carDefault: any = carOptions?.filter((car) => car.value == account?.carIdDefault);
    return <CartComponent carDefault={carDefault?.[0]?.otherData} carOptions={carOptions} carId={carDefault?.value} />;
}
