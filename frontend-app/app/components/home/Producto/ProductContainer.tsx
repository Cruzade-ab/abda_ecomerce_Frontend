import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import {ProductInterface} from './ProductInterface';


interface ProductsContainerProps {
    apiUrl: string; // URL to fetch product data
 }
  
 const ProductsContainer: React.FC<ProductsContainerProps> = ({ apiUrl }) => {
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
    }, [apiUrl]); // Dependency array ensures effect runs only when apiUrl changes
  
    return (
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.general_product_id} product={product} />
        ))}
      </div>
    );
  };
  
  export default ProductsContainer;
  

