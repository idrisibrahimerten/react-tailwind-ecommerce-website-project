import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const CheckoutScreen = () => {
  const { cart, total } = useContext(CartContext);

  const formattedTotal = parseFloat(total).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
        {cart.map((item) => (
          <div className="flex justify-between items-center mb-2" key={item.id}>
            <p className="text-base">{item.title}</p>
            <p className="text-base font-bold">${item.price}</p>
          </div>
        ))}
        <p className="text-xl font-semibold mt-4">Total: ${formattedTotal}</p>
        <div className="flex justify-end mt-6">
          <Link
            to="/payment"
            className="bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;