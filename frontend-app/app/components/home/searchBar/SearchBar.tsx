import React from 'react';
import Link from 'next/link';
const SearchBar = () => {
  return (
    <div className="relative mx-auto pt-1">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4  border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition duration-300 w-48 sm:w-64 md:w-96"
      />
      <button className="absolute right-0  mt-3.5 mr-4">
        {/* Add your search icon or button here */}
        <Link href="/search"> 
            <img src="./icons8-search.png" alt="Icon" width="18" height="18"></img>
        </Link>
      </button>
    </div>
  );
};

export default SearchBar;