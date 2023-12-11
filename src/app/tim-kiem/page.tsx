'use client';
import SearchData from '../components/search/SearchData';
import { IconBulb } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();
    const search = searchParams.get('s');
    return (
        <div>
            <p style={{ marginBottom: 24 }}>
                <i style={{ marginRight: 5 }}>
                    <IconBulb size={20} />
                </i>
                Kết quả tìm kiếm cho từ khoá
                <span style={{ color: 'var(--theme-color)', fontWeight: 600, marginLeft: 5 }}>{search}</span>
            </p>
            <SearchData />
        </div>
    );
}
