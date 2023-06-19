import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { CartContext } from '../contexts/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, images, category, title, price, discount } = product;

  // İndirimli fiyatı hesapla
  const discountedPrice = (price - (price * 0 / 100)).toFixed(2);

    // Check if images array is empty
  const imageUrl = images && images.length > 0 ? images[0] : '';

  return (
    <div>
      <div className='border border-[#e4e4e4] h-[300px] mv-4 relative overflow-hidden group transition'>
        <div className='w-full h-full flex justify-center items-center'>
          {/* image */}
          <div className='w-[200px] mx-auto flex justify-center items-center'>
            <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={imageUrl} alt=""/>
          </div>
          {/* buttons */}
          <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <button onClick={() => addToCart(product, id)}>
              <div className='flex justify-center items-center text-white w-12 h-12 bg-red-500'>
                <BsPlus className='text-3xl'/>
              </div>
            </button>
            <Link to={`/product/${id}`} className='w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl'><BsEyeFill/></Link>
          </div>
        </div>
      </div>
      {/* category & title & price */}
      <div className='text-sm capitalize text-gray-500 mb-1'>{category.name}</div>
      <Link to={`/product/${id}`}>
        <h2 className='font-semibold mb-1'>{title}</h2>
      </Link>
      <div className='font-semibold'>
        {/* İndirimli fiyatı göster */}
        {discountedPrice < price && (
          <div className="flex items-center">
            <span className="line-through mr-1 text-gray-500">$ {price.toFixed(2)}</span>
            {/**  <span className="text-green-500">İndirim </span> */}
            <span>$ {discountedPrice}</span>
          </div>
        )}
        {/* İndirim yoksa normal fiyatı göster */}
        {discountedPrice >= price && (
          <span> $ { price.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
}

export default Product;