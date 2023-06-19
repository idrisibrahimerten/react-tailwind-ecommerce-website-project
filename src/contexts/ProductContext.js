import React, {createContext, useState ,useEffect} from 'react'

export const ProductContext = createContext();

const ProductProvider = ({children}) => {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async ()=> {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data);
  };
  fetchProducts();

  }, []);

  return <ProductContext.Provider value={{products,selectedCategory, setSelectedCategory,}}>{children}</ProductContext.Provider>;
};

export default ProductProvider