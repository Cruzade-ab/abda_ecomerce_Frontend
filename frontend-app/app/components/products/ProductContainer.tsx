import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {ProductInterface} from '../../lib/products/ProductInterface';


interface ProductsContainerProps {
    apiUrl: string; // URL to fetch product data
    section_name: string;
 }
  
 const ProductsContainer: React.FC<ProductsContainerProps> = ({ apiUrl, section_name }) => {
    // State to hold the fetched products
    const [products, setProducts] = useState<ProductInterface[]>([]);
  
    useEffect(() => {
      console.log('Effect hook triggered');
      const fetchProducts = async () => {
        try {
          const response = await fetch(apiUrl);
          const data: ProductInterface[] = await response.json();
          console.log('Fetched data:', data);

          if (Array.isArray(data)) {
            // Sort the data by wantedCount if it's defined, otherwise by a default value (e.g., 0)
            const sortedData = data.sort((a, b) => (b.wanted_count ?? 0) - (a.wanted_count ?? 0));
            setProducts(sortedData);
            console.log(sortedData)
          } else {
            console.error('Expected an array but got:', data);
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };

      fetchProducts();
    }, [apiUrl]);
    
  
    return (<>
      <h2 className=' flex flex-1 justify-center text-center align-top text-2xl md:text-4xl  font-bold'>{section_name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map(product => (
          <ProductCard key={product.general_product_id} product={product} />
        ))}
      </div></>
    );
  };
  
  export default ProductsContainer;
  

