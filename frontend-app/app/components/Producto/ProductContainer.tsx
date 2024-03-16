import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {ProductInterface} from './ProductInterface';


interface ProductsContainerProps {
    apiUrl: string; // URL to fetch product data
    section_name: string;
 }
  
 const ProductsContainer: React.FC<ProductsContainerProps> = ({ apiUrl, section_name }) => {
    // State to hold the fetched products
    const [products, setProducts] = useState<ProductInterface[]>([]);
  
    // Effect to fetch data when component mounts
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setProducts(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchProducts();
    }, [apiUrl]); 
  
    return (<>
      <h2 className=''>{section_name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map(product => (
          <ProductCard key={product.general_product_id} product={product} />
        ))}
      </div></>
    );
  };
  
  export default ProductsContainer;
  

