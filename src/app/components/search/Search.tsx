'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input, CloseButton, Grid, Button, Select } from '@mantine/core';
import { getBrands, getModels } from '@/utils/branch';
import { IBrand } from '@/interfaces/brand';
import { YearPickerInput } from '@mantine/dates';
import Link from 'next/link';
import { IconSearch } from '@tabler/icons-react';
import SearchFormName from './SearchFormName';
import SearchFormCar from './SearchFormCar';
function SearchForm({ brandsData }: any) {
    // const [loading, setLoading] = useState(false);

    // const router = useRouter();
    // const handleSubmit = async (event: { preventDefault: () => void }, value: string): Promise<void> => {
    //     setLoading(true);
    //     event.preventDefault();
    //     try {
    //         router.push(`/tim-kiem?s=${encodeURIComponent(value)}`);
    //         setLoading(false);
    //     } catch (error) {
    //         console.error('Search error:', error);
    //         setLoading(false);
    //     }
    // };

    return (
        <div style={{ width: '100%' }}>
            <Grid>
                <Grid.Col span={5}>
                    <SearchFormName />
                </Grid.Col>
                <Grid.Col span={5.5} style={{ display: 'flex', alignItems: 'end' }}>
                    <SearchFormCar brandsData={brandsData} />
                </Grid.Col>
                <Grid.Col span={1.5} style={{ display: 'flex', alignItems: 'end' }}>
                    <Link href="/dat-lich">
                        <Button
                            // loading={loading}
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
