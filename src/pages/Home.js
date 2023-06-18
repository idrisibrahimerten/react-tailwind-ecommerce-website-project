import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';


const Home = () => {
  const { products,selectedCategory, setSelectedCategory} = useContext(ProductContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories(); // Kategorileri API'den al
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();
      const uniqueCategories = [...new Set(data.map(item => item.category))];
      setCategories(['All', ...uniqueCategories]);
    } catch (error) {
      console.error('Kategori bilgileri alınamadı:', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter(item => {
    if (selectedCategory === '' || 'all') {
      return true; // Tüm ürünleri göster
    }
    return item.category === selectedCategory;
  });

  return (
    <div>
      <Hero/>
      <section className='py-16'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id}/>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
