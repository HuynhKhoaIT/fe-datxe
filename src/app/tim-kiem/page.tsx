'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchData from '../components/search/SearchData';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { useSearchParams } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();

    const search = searchParams.get('s');
    return (
        <div>
            <p style={{ marginBottom: 24 }}>
                <i style={{ marginRight: 5 }}>
                    <FontAwesomeIcon icon={faLightbulb} />
                </i>
                Kết quả tìm kiếm cho từ khoá
                <span style={{ color: 'var(--theme-color)', fontWeight: 600, marginLeft: 5 }}>{search}</span>
            </p>
            <SearchData />
        </div>
    );
}
