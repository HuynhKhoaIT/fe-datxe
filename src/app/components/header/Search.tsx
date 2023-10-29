import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { wrapper as PopperWapper } from '../Popper';
import useDebounce from '../../hooks/useDebounce';
import 'tippy.js/dist/tippy.css';
import styles from './Header.module.scss';
import SearchItem from '../SearchItem';
import { useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '@/interfaces/product';
import { getProductsSearch } from '@/utils/product';
const cx = classNames.bind(styles);
function Search({}) {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const debouncedValue = useDebounce(searchValue, 500);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/tim-kiem?s=${encodeURIComponent(searchValue)}`);
        setSearchValue('');
    };
    useEffect(() => {
        const fetchApi = async () => {
            const result = await getProductsSearch(`s=${debouncedValue}`);
        };
        fetchApi();
    }, [debouncedValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
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
                    <button className={cx('clear-btn')} onClick={handleClear}>
                        <FontAwesomeIcon className={cx('clear')} icon={faCircleXmark} />
                    </button>
                )}
                <button className={cx(' btn', 'btn-search')} type="submit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search')} />
                </button>
            </form>
        </div>
    );
}

export default Search;
