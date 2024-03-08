import React from 'react';

const SearchBar = () => {
  return (
    <div className="relative mx-auto pt-1">
      <input
        type="text"
        placeholder="Search..."
        className="py-2 px-4  border border-gray-300 rounded-full focus:outline-none focus:border-gray-400 transition duration-300 w-48 sm:w-64 md:w-96"
      />
      <button className="absolute right-0 top-0 mt-2 mr-3">
        {/* Add your search icon or button here */}
      </button>
    </div>
  );
};

export default SearchBar;
