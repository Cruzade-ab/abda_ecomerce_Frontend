import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./searchbar.css";


interface Product {
    title: string;
    url: string;
}

const SearchBar: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [searchData, setSearchData] = useState<Product[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value);
    };

    const handleClose = (): void => {
        setSearch("");
        setSearchData([]);
    };

    useEffect(() => {
        if (search !== "") {
            fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((json: Product[]) => setSearchData(json));
        }
    }, [search]);

    return (
        <section className="search_section">
            <div className="search_input_dev">
                <input
                    type='text'
                    className="search-input"
                    placeholder="Search..."
                    autoComplete="off"
                    onChange={handleChange}
                    value={search}
                />
                <div className="search-icon">
                    {
                        search === "" ? (
                            <SearchIcon />
                        ) : (
                            <CloseIcon onClick={handleClose} />
                        )
                    }
                </div>
                <div className="search_result">
                    {
                        searchData.map((data: Product, index: number) => (
                            <a href={data.url} key={index} target="_blank" className='search_suggestion_line'>
                                {data.title}
                            </a>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default SearchBar;
