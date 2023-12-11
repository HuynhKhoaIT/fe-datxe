import { Button, Grid, Select } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { getBrands, getModels, getYears } from '@/utils/branch';
import { useRouter } from 'next/navigation';
export default function SearchFormCar({ brandsData }: any) {
    const router = useRouter();
    const [opened, handlers] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [models, setModels] = useState<any>();
    const [yearCar, setYearCar] = useState<any>();

    const brandsOption = brandsData?.map((brand: any) => ({
        value: brand.id?.toString() || '',
        label: brand.name || '',
    }));

    const form = useForm({
        initialValues: {
            brand_id: 0,
            car_name_id: 0,
            year_id: 0,
        },
        validate: {},
    });

    const selectModel = async (value: number) => {
        try {
            const dong_xe = await getModels(value);
            const newModels = dong_xe?.map((model) => ({
                value: model.id?.toString() || '',
                label: model.name || '',
            }));
            setModels(newModels);
        } catch (error) {}
    };
    const selectYear = async (value: number) => {
        try {
            const yearCar = await getYears(value);
            console.log('yearCar', yearCar);
            const newYearCar = yearCar?.map((year) => ({
                value: year.id?.toString() || '',
                label: year.name || '',
            }));
            setYearCar(newYearCar);
        } catch (error) {}
    };
    const handleSubmit = async (values: any) => {
        let queryString = '';
        if (values?.brand_id) {
            queryString += 'brand_id' + '=' + values?.brand_id;
        }
        if (values?.car_name_id) queryString += '&' + 'car_name_id' + '=' + values?.car_name_id;
        if (values?.year_id) queryString += '&' + 'year_id' + '=' + values?.year_id;

        try {
            router.push(`/tim-kiem?${queryString}`);
        } catch (error) {
            console.error('Search error:', error);
        }
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid gutter={5}>
                <Grid.Col span={3.5}>
                    <Select
                        {...form.getInputProps('brand_id')}
                        checkIconPosition="right"
                        placeholder="Hãng xe"
                        data={brandsOption}
                        clearable
                        onChange={(value) => {
                            selectModel(Number(value));
                            form.setFieldValue('brand_id', Number(value));
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={3.5}>
                    <Select
                        {...form.getInputProps('car_name_id')}
                        checkIconPosition="right"
                        placeholder="Dòng xe"
                        data={models}
                        clearable
                        onChange={(value) => {
                            selectYear(Number(value));
                            form.setFieldValue('car_name_id', Number(value));
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={3}>
                    <Select
                        {...form.getInputProps('year_id')}
                        checkIconPosition="right"
                        placeholder="Năm sản xuất"
                        clearable
                        data={yearCar}
                        onChange={(value) => {
                            form.setFieldValue('year_id', Number(value));
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Button
                        loading={opened}
                        variant="filled"
                        type="submit"
                        style={{
                            background: 'var(--theme-color)',
                        }}
                    >
                        Tìm
                    </Button>
                </Grid.Col>
            </Grid>
        </form>
    );
}
