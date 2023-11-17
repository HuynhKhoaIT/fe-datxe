import { useSession } from 'next-auth/react';
import { ICar } from '@/interfaces/car';
import { useEffect, useState } from 'react';
import { getCar } from '@/utils/car';
import { getBrand, getModels } from '@/utils/branch';
import {
    Grid,
    LoadingOverlay,
    TextInput,
    Box,
    Select,
    Button,
    Group,
    Textarea,
    NumberInput,
    Card,
} from '@mantine/core';

const CarInfoCart = ({ cars }: { cars: ICar[] }) => {
    const { data: session } = useSession();
    const token = session?.user?.token;
    const [car, setCar] = useState<ICar>();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [loading, setLoading] = useState(false);
    const selectCar = async (value: any) => {
        try {
            const selectedCar = await getCar(token ?? '', value);
            setCar(selectedCar);
        } catch (error) {
            console.error('Error selecting car:', error);
        }
    };
    console.log(cars);
    const newModels = cars?.map((car) => ({
        value: car.id?.toString() || '',
        label: car.licensePlates || '',
    }));
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
                            data={newModels}
                            onChange={(value) => {
                                selectCar(value);
                            }}
                        ></Select>
                    </Grid.Col>
                </Grid>
                <Grid gutter={16}>
                    <Grid.Col span={6}>
                        <TextInput label="Hãng Xe" placeholder="Hãng Xe" name="brand" readOnly value={brand || ''} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Dòng xe" placeholder="Dòng xe" readOnly value={model || ''} />
                    </Grid.Col>
                </Grid>
            </Card>
        </div>
    );
};

export { CarInfoCart };
