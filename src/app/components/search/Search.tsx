import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons'; // Fixed typo in icon names

import { useRouter } from 'next/navigation'; // Assuming 'next/router' is the correct import

import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../header/Header.module.scss';
import { getProductsSearch } from '@/utils/product';
import useDebounce from '../../hooks/useDebounce';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const debouncedValue = useDebounce(searchValue, 500);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        router.push(`/tim-kiem?s=${encodeURIComponent(searchValue)}`);
        setSearchValue('');
    };

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         const result = await getProductsSearch(`s=${debouncedValue}`);
    //     };
    //     fetchApi();
    // }, [debouncedValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputSearchValue = e.target.value;
        if (!inputSearchValue.startsWith(' ')) {
            setSearchValue(e.target.value);
        }
    };

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <form onSubmit={handleSubmit} method="GET" className={cx('search')}>
                <input
                    value={searchValue}
                    name="s"
                    placeholder="Search"
                    spellCheck={false}
                    onChange={handleInputChange}
                    className={cx('input-search')}
                />
                {!!searchValue && (
                    <button type="button" className={cx('clear-btn')} onClick={handleClear}>
                        <FontAwesomeIcon className={cx('clear')} icon={faTimesCircle} />
                    </button>
                )}
                <button className={cx('btn', 'btn-search')} type="submit">
                    <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                </button>
            </form>
        </div>
    );
}

export default Search;
