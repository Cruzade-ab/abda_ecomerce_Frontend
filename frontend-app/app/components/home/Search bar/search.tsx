'use client'
import React, { ChangeEvent, useState } from 'react';
import { SearchProps } from './SearchProps';

function Search(props: SearchProps) {
    const { onSearch } = props;
    const [value, setValue] = useState('Enter search...');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {

            onSearch(value);
        }
    };

    return (
        <div className="relative py-3 w-full text-gray-600">
            <input
                type="search"
                name="search"
                placeholder={value}
                className="bg-white h-10 px-5 pr-10 w-full text-sm border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition duration-300"
                onChange={(event) => searchHandler(event)}
                onKeyDown={handleKeyDown} />
            <button type="submit" className="absolute right-0 top-1 mt-3 mr-4">
                <svg
                    className="h-4 my-2 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}

export default Search;