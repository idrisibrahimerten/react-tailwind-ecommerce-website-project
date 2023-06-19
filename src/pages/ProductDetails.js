import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {products} = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { images, title, category, price, description } = product;
  const imageUrl = images && images.length > 0 ? images[0] : '';

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img src={imageUrl} alt='' className="max-w-[200px] lg:max-w-sm" />
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2max-w-[450px] mx-auto'>{title}</h1>
            <div className='text-xl font-medium text-red-500 mb-6'>$ {price}</div>
            <p className='mb-8'>{description}</p>
            <button onClick={() => addToCart(product, product.id)} className='bg-primary py-4 px-8 text-white'>Add to Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;