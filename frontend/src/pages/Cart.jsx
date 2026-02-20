import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from '../component/Title';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import CheckoutSection from './CheckoutSection';

const Cart = () => {
  const { product, currency, updateQuantity, cartItem } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const prodId in cartItem) {
      for (const size in cartItem[prodId]) {
        const quantity = cartItem[prodId][size];
        if (quantity > 0) {
          tempData.push({
            _id: prodId,
            size,
            quantity,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItem]); // Watch cartItem for instant updates

  const handleUpdate = (prodId, size, quantity) => {
    updateQuantity(prodId, size, quantity);
    setCartData((prev) =>
      prev
        .map((item) =>
          item._id === prodId && item.size === size ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-24 pb-20 px-4 sm:px-6 lg:px-8 -ml-3 md:ml-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Title text1={'YOUR'} text2={'CART'} />
          <p className="mt-2 text-gray-600 text-sm">
            {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <HiOutlineShoppingBag className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Start adding items to see them here</p>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = product.find((p) => p._id === item._id);
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                          <img
                            src={productData.image?.[0] || '/fallback.png'}
                            alt={productData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-medium text-base mb-2">
                          {productData.name}
                        </h3>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>Size:</span>
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-900 font-medium">
                              {item.size}
                            </span>
                          </div>

                          <div>
                            Price: <span className="text-gray-900 font-medium">
                              {currency}{productData.price}
                            </span>
                          </div>

                          <div>
                            Subtotal: <span className="text-gray-900 font-medium">
                              {currency}{(productData.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleUpdate(item._id, item.size, 0)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <RiDeleteBin6Line className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 border border-gray-300 rounded">
                          <button
                            onClick={() => handleUpdate(productData._id, item.size, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            −
                          </button>

                          <span className="px-3 py-1 text-gray-900 font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => handleUpdate(productData._id, item.size, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CheckoutSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;