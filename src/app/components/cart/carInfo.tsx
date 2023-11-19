import { useSession } from 'next-auth/react';
import { ICar } from '@/interfaces/car';
import { useEffect, useState } from 'react';
import { getCar } from '@/utils/car';
import { getBrand, getModels } from '@/utils/branch';
import { Grid, LoadingOverlay, TextInput, Select, Card } from '@mantine/core';

const CarInfoCart = ({ cars, carDefault }: any) => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [car, setCar] = useState<ICar>();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [carValue, setCarValue] = useState('');

    const [loading, setLoading] = useState(false);
    const selectCar = async (value: any) => {
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCar(selectedCar);
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (car) {
                    const brandData = await getBrand(car.automakerId ?? 0);
                    setBrand(brandData.name);

                    const modelData = await getBrand(car.carNameId ?? 0);
                    setModel(modelData.name);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [car]);

    console.log(carDefault?.id?.toString());
    console.log(car);
    let carId = carDefault?.id?.toString();
    return (
        <div id="root">
            <Card pos="relative">
                <LoadingOverlay visible={loading} loaderProps={{ children: 'Loading...' }} />

                <Grid gutter={16}>
                    <Grid.Col span={12}>
                        <Select
                            label="Biển số"
                            checkIconPosition="right"
                            placeholder="Biển số"
                            value={car ? car?.id : carId}
                            data={cars}
                            allowDeselect={false}
                            onChange={(value) => {
                                selectCar(value);
                            }}
                        />
                        {/* <Select
                            label="Option can NOT be deselected"
                            placeholder="Pick value"
                            data={['React', 'Angular', 'Vue', 'Svelte']}
                            defaultValue="React"
                            allowDeselect={false}
                        /> */}
                    </Grid.Col>
                </Grid>
                <Grid gutter={16}>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Hãng Xe"
                            defaultValue={carDefault?.brandCarName?.name}
                            placeholder="Hãng Xe"
                            readOnly
                            value={brand || carDefault?.brandCarName?.name}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            label="Dòng xe"
                            defaultValue={carDefault?.modelCarName?.name}
                            placeholder="Dòng xe"
                            readOnly
                            value={model || carDefault?.brandCarName?.name}
                        />
                    </Grid.Col>
                </Grid>
            </Card>
        </div>
    );
};

export { CarInfoCart };
