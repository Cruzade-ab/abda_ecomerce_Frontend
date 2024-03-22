// import React, { useEffect, useState } from "react"
// import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";

// import ".//SearchBar.css";

// const SearchBar = () => {
//     const[search, setsearch]= useState="";
//     const[searchData, setsearchData]= useState=([]);

//     const handleChange = e => {
//         setsearch(e.target.value)
//     }
//     const handleClose =()=>{
//         setsearch("")
//         setsearchData([])
//     }
//     useEffect(()=>{
//         if (search !=="") {
//             fetch('https://fakestoreapi.com/products')
//             .then(res=>res.json())
//             .then(json=>setsearchData(json))
//         }

//     }, [Search])
//     return (
//         <section className="search_section">
//         <div className="search_input_dev">
//             <input>
//             type='text'
//             className="search-input"
//             placeholder= "Search..."
//             autoComplete="off"
//             onChange={handleChange}
//             value={search};
//             </input>
//             <div className="search-icon">
//                 {
//                     search ===""? ( <SearchIcon/>
//                     ) : (
//                     <CloseIcon onclick={handleClose}/>
//                     )
//                 }
               
//             </div>
//             <div className="search_result">
//                 {
//                     searchData.map((data, index)=>{
//                         return   <a href="data.products.url" key={index} target="_blank" className='search_suggestion_line'>
//                        {data.product.title}
//                     </a>
//                     })
//                 }
              
//             </div>
//         </div>
//         </section>
           
//     )
// };
// export default from SearchBar;


