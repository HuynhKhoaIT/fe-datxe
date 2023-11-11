import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons'; // Fixed typo in icon names
import { SearchOutlined, ClearOutlined } from '@ant-design/icons';

import { useRouter } from 'next/navigation'; // Assuming 'next/router' is the correct import

import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../header/Header.module.scss';
import { getProductsSearch } from '@/utils/product';
import useDebounce from '../../hooks/useDebounce';
import { Button, Form, Input, Row, Spin } from 'antd';

const { Search } = Input;
const cx = classNames.bind(styles);
function SearchForm() {
    const [form] = Form.useForm();
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const debouncedValue = useDebounce(searchValue, 500);

    const handleSubmit = async (value: string): Promise<void> => {
        setLoading(true);
        try {
            router.push(`/tim-kiem?s=${encodeURIComponent(value)}`);
            setLoading(false);
        } catch (error) {
            console.error('Search error:', error);
            setLoading(false);
        }
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    };
    const handleClearSearch = () => {
        form.resetFields();
        setSearchValue('');
    };
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <Form form={form} onFinish={() => handleSubmit(searchValue)}>
                <Row style={{ position: 'relative' }}>
                    <Input
                        placeholder="Nhập từ khoá tìm kiếm..."
                        size="large"
                        allowClear
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                    {!!searchValue && (
                        <Button
                            style={{
                                position: 'absolute',
                                top: 4,
                                right: 70,
                                bottom: 0,
                                zIndex: 1,
                                background: 'transparent',
                                padding: '0',
                                border: 'none',
                            }}
                            onClick={handleClearSearch}
                        >
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </Button>
                    )}
                    <Button
                        icon={<SearchOutlined />}
                        type="primary"
                        htmlType="submit"
                        style={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bottom: 0,
                            zIndex: 1,
                            background: 'var(--theme-color)',
                            minWidth: 60,
                        }}
                    ></Button>
                </Row>
            </Form>
        </div>
    );
}

export default SearchForm;
{
    /* <input
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
                </button> */
}
