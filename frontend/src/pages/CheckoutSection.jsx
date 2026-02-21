// import React, { useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { shopDataContext } from '../context/ShopContext';
// import axios from 'axios';

// const CheckoutSection = () => {
//   const { getCartCount, getCartAmount, currency, delivery_fee, setDiscount, discount  } = useContext(shopDataContext);
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState('');
//   const [couponApplied, setCouponApplied] = useState(false);
//   // const [discount, setDiscount] = useState(0);

//   const handleCheckout = () => {
//     if (getCartCount() > 0) {
//       navigate('/placeorder');
//     } else {
//       console.log('Your cart is empty!');
//     }
//   };

//   const handleApplyCoupon = () => {
//     // Example coupon logic - you can customize this
//     if (couponCode.toUpperCase() === 'SAVE10') {
//       setDiscount(10); // 10% discount
//       setCouponApplied(true);
//     } else if (couponCode.toUpperCase() === 'SAVE20') {
//       setDiscount(20); // 20% discount
//       setCouponApplied(true);
//     } else {
//       alert('Invalid coupon code');
//       setCouponApplied(false);
//       setDiscount(0);
//     }
//   };

//   const handleRemoveCoupon = () => {
//     setCouponCode('');
//     setCouponApplied(false);
//     setDiscount(0);
//   };

//   // Calculate values
//   // 1. Subtotal (actual cart value)
//   const subtotal = getCartAmount ? getCartAmount() : 0;

//   // 2. Discount (coupon)
//   const discountAmount = (subtotal * discount) / 100;
//   const afterDiscount = subtotal - discountAmount;

//   // 3. Shipping (BASED ON SUBTOTAL, NOT AFTER DISCOUNT)
//   const shippingFee = subtotal >= 500 ? 0 : delivery_fee;

//   // 4. GST (always on final payable amount)
//   const gstTax = ((afterDiscount + shippingFee) * 18) / 100;

//   // 5. Total
//   const total = afterDiscount + shippingFee + gstTax;



//   return (
//     <div className="space-y-4">
//       {/* Coupon Section */}
//       <div className="bg-white border border-gray-200 rounded-lg p-4">
//         <h3 className="text-sm font-medium text-gray-900 mb-3">Have a coupon?</h3>

//         {!couponApplied ? (
//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//               placeholder="Enter coupon code"
//               className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
//             />
//             <button
//               onClick={handleApplyCoupon}
//               className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
//             >
//               Apply
//             </button>
//           </div>
//         ) : (
//           <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
//             <div className="flex items-center gap-2">
//               <span className="text-green-700 text-sm font-medium">{couponCode}</span>
//               <span className="text-green-600 text-xs">({discount}% off)</span>
//             </div>
//             <button
//               onClick={handleRemoveCoupon}
//               className="text-red-600 hover:text-red-700 text-sm font-medium"
//             >
//               Remove
//             </button>
//           </div>
//         )}

//         <p className="mt-2 text-xs text-gray-500">
//           Try: SAVE10 or SAVE20
//         </p>
//       </div>

//       {/* Order Summary */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6">
//         <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

//         {/* Subtotal */}
//         <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Subtotal</span>
//             <span className="text-gray-900 font-medium">{currency}{subtotal.toFixed(2)}</span>
//           </div>

//           {/* Discount */}
//           {couponApplied && (
//             <div className="flex justify-between text-sm">
//               <span className="text-green-600">Discount ({discount}%)</span>
//               <span className="text-green-600 font-medium">-{currency}{discountAmount.toFixed(2)}</span>
//             </div>
//           )}

//           {/* Shipping */}
//           <div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Shipping Fee</span>
//               <span className="text-gray-900 font-medium">
//                 {shippingFee === 0 ? (
//                   <span className="text-green-600">FREE 🚚</span>
//                 ) : (
//                   `${currency}${shippingFee.toFixed(2)}`
//                 )}
//               </span>

//             </div>
//             {subtotal < 500 && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Add {currency}{(500 - subtotal).toFixed(2)} more to get FREE shipping
//               </p>
//             )}
//           </div>


//           {/* Tax Breakdown */}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">GST (18%)</span>
//             <span className="text-gray-900 font-medium">{currency}{gstTax.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Total */}
//         <div className="flex justify-between text-base mb-4">
//           <span className="text-gray-900 font-semibold">Total</span>
//           <span className="text-gray-900 font-semibold">{currency}{total.toFixed(2)}</span>
//         </div>

//         <button
//           onClick={handleCheckout}
//           disabled={getCartCount() === 0}
//           className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
//         >
//           Proceed to Checkout
//         </button>

//         <p className="mt-4 text-center text-xs text-gray-500">
//           All taxes included in total
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CheckoutSection;

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext';

const CheckoutSection = () => {
  const {
    getCartCount,
    getCartAmount,
    currency,
    delivery_fee,
    setDiscount,
    discount,
  } = useContext(shopDataContext);

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Handle checkout
  const handleCheckout = () => {
    if (getCartCount() > 0) {
      navigate('/placeorder');
    } else {
      console.log('Your cart is empty!');
    }
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(10);
      setCouponApplied(true);
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setCouponCode('');
    setCouponApplied(false);
    setDiscount(0);
  };

  // ✅ Calculations with empty-cart safeguard
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const discountAmount = subtotal > 0 ? (subtotal * discount) / 100 : 0;
  const afterDiscount = subtotal > 0 ? subtotal - discountAmount : 0;
  const shippingFee = subtotal > 0 ? (subtotal >= 500 ? 0 : delivery_fee) : 0;
  const gstTax = subtotal > 0 ? ((afterDiscount + shippingFee) * 18) / 100 : 0;
  const total = subtotal > 0 ? afterDiscount + shippingFee + gstTax : 0;

  return (
    <div className="space-y-4">
      {/* Coupon Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Have a coupon?</h3>

        {!couponApplied ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 text-sm font-medium"
              disabled={subtotal === 0}
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-green-700 text-sm font-medium">{couponCode}</span>
              <span className="text-green-600 text-xs">({discount}% off)</span>
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        )}

        <p className="mt-2 text-xs text-gray-500">Try: SAVE10 or SAVE20</p>
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

        <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
          {/* Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900 font-medium">{currency}{subtotal.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {couponApplied && subtotal > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount ({discount}%)</span>
              <span className="text-green-600 font-medium">-{currency}{discountAmount.toFixed(2)}</span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping Fee</span>
            <span className="text-gray-900 font-medium">
              {shippingFee === 0 ? <span className="text-green-600">FREE 🚚</span> : `${currency}${shippingFee.toFixed(2)}`}
            </span>
          </div>
          {subtotal > 0 && subtotal < 500 && (
            <p className="text-xs text-gray-500 mt-1">
              Add {currency}{(500 - subtotal).toFixed(2)} more to get FREE shipping
            </p>
          )}

          {/* GST */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">GST (18%)</span>
            <span className="text-gray-900 font-medium">{currency}{gstTax.toFixed(2)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between text-base mb-4">
          <span className="text-gray-900 font-semibold">Total</span>
          <span className="text-gray-900 font-semibold">{currency}{total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={subtotal === 0}
          className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          {subtotal === 0 ? 'Cart is empty' : 'Proceed to Checkout'}
        </button>

        <p className="mt-4 text-center text-xs text-gray-500">
          All taxes included in total
        </p>
      </div>
    </div>
  );
};

export default CheckoutSection;