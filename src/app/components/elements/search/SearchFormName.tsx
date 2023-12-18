'use client';
import { Button, CloseButton, Grid, Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
export default function SearchFormName() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            searchValue: '',
        },
        validate: {},
    });
    const handleSubmit = (values: any) => {
        try {
            router.push(`/tim-kiem?s=${values?.searchValue}`);
        } catch (error) {
            console.error('Search error:', error);
        }
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Grid style={{ position: 'relative' }}>
                <Grid.Col span={12}>
                    <Input
                        {...form.getInputProps('searchValue')}
                        placeholder="Nhập từ khoá tìm kiếm..."
                        rightSectionPointerEvents="all"
                        mt="md"
                        rightSection={
                            <Grid>
                                <CloseButton
                                    style={{
                                        display: form.values.searchValue ? undefined : 'none',
                                        position: 'absolute',
                                        right: 50,
                                        top: 2,
                                        zIndex: 1,
                                    }}
                                    aria-label="Clear input"
                                    onClick={() => {
                                        form.reset();
                                    }}
                                />
                                <Button
                                    variant="filled"
                                    size="xs"
                                    type="submit"
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
                                    <IconSearch size={18} />
                                </Button>
                            </Grid>
                        }
                    />
                </Grid.Col>
            </Grid>
        </form>
    );
}
