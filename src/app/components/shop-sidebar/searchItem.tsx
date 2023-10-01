'use client';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const SearchItem = () => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`?s=${encodeURIComponent(searchValue)}`);
        setSearchValue('');
    };
    return (
        <form onSubmit={handleSubmit} method="GET" className="input-group rounded">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchValue}
                onChange={handleInputChange}
            />
            <button type="submit" className="input-group-text border-0">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    );
};

export { SearchItem };
