import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input, CloseButton, Grid, Button, Select } from '@mantine/core';
import { getBrands, getModels } from '@/utils/branch';
import { IBrand } from '@/interfaces/brand';
import { YearPickerInput } from '@mantine/dates';
import Link from 'next/link';

function SearchForm() {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [valueSearch, setValueSearch] = useState('');

    const [valueYear, setValueYear] = useState<Date | null>(null);

    const [brandsData, setBrandsData] = useState<any>([]);
    const [models, setModels] = useState<any>([]);
    const [carNameId, setCarNameId] = useState<any>();

    const router = useRouter();
    const handleSubmit = async (event: { preventDefault: () => void }, value: string): Promise<void> => {
        setLoading(true);
        event.preventDefault();
        try {
            router.push(`/tim-kiem?s=${encodeURIComponent(value)}`);
            setLoading(false);
        } catch (error) {
            console.error('Search error:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBrands();
                const newFormat = data?.map((brand) => ({
                    value: brand.id?.toString() || '',
                    label: brand.name || '',
                }));
                setBrandsData(newFormat);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    const selectBrand = async (value: number) => {
        try {
            const dong_xe: IBrand[] = await getModels(value);
            const newModels = dong_xe?.map((model) => ({
                value: model.id?.toString() || '',
                label: model.name || '',
            }));
            setModels(newModels);
        } catch (error) {}
    };

    return (
        <div style={{ width: '100%' }}>
            <Grid>
                <Grid.Col span={5}>
                    <form onSubmit={(event) => handleSubmit(event, value)}>
                        <Grid style={{ position: 'relative' }}>
                            <Grid.Col span={12}>
                                <Input
                                    placeholder="Nhập từ khoá tìm kiếm..."
                                    onChange={(event) => setValue(event.currentTarget.value)}
                                    rightSectionPointerEvents="all"
                                    mt="md"
                                    value={value}
                                    rightSection={
                                        <Grid>
                                            <CloseButton
                                                style={{
                                                    display: value ? undefined : 'none',
                                                    position: 'absolute',
                                                    right: 50,
                                                    top: 2,
                                                    zIndex: 1,
                                                }}
                                                aria-label="Clear input"
                                                onClick={() => setValue('')}
                                            />
                                            <Button
                                                variant="filled"
                                                size="xs"
                                                type="submit"
                                                loading={loading}
                                                style={{
                                                    position: 'absolute',
                                                    top: 2,
                                                    right: 4,
                                                    bottom: 0,
                                                    zIndex: 1,
                                                    background: 'var(--theme-color)',
                                                    minWidth: 40,
                                                }}
                                            >
                                                <SearchOutlined />
                                            </Button>
                                        </Grid>
                                    }
                                />
                            </Grid.Col>
                        </Grid>
                    </form>
                </Grid.Col>
                <Grid.Col span={5.5} style={{ display: 'flex', alignItems: 'end' }}>
                    <form onSubmit={(event) => handleSubmit(event, value)}>
                        <Grid gutter={5}>
                            <Grid.Col span={3.5}>
                                <Select
                                    checkIconPosition="right"
                                    placeholder="Hãng xe"
                                    data={brandsData}
                                    clearable
                                    onChange={(value) => {
                                        selectBrand(Number(value));
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={3.5}>
                                <Select
                                    checkIconPosition="right"
                                    placeholder="Dòng xe"
                                    data={models}
                                    clearable
                                    onChange={(value) => {
                                        setCarNameId(value);
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col span={3}>
                                <YearPickerInput
                                    clearable
                                    placeholder="Năm SX"
                                    value={valueYear}
                                    onChange={setValueYear}
                                />
                            </Grid.Col>
                            <Grid.Col span={2}>
                                <Button
                                    loading={loading}
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
                </Grid.Col>
                <Grid.Col span={1.5} style={{ display: 'flex', alignItems: 'end' }}>
                    <Link href="/dat-lich">
                        <Button
                            loading={loading}
                            variant="filled"
                            style={{
                                background: 'var(--theme-color)',
                            }}
                        >
                            Đặt lịch
                        </Button>
                    </Link>
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default SearchForm;
