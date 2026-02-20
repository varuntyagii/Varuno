// // import React from 'react'
// // import Title from '../component/Title'

// // const PlaceOrder = () => {
// //   return (
// //     <div className='w-[100vw] min-h-[100vh]  bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center flex-col md:flex-row gap-[50px]  overflow-y-hidden overflow-x-hidden mb-20 md:mb-0 '>
// //       <div className='lg:w-[50%] w-full h-full flex items-center lg:mt-[0px] mt-[90px] '>
// //         <form action="" className='lg:w-[70%] w-[95%] lg:h-[70%] h-full '>
// //           <div className='py-[10px]'>
// //             <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
// //           </div>
// //           <div className='w-full h-[70%] flex items-center justify-between px-[10px] '>
// //             <input type="text" />
// //             <input type="text" />
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // export default PlaceOrder

// import React, { useContext, useState } from 'react'
// import Title from '../component/Title'
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/AuthContext';
// import { SiRazorpay, SiStripe } from 'react-icons/si';
// import Lottie from 'lottie-react';
// import arrow from '../assets/arrow right.json'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const PlaceOrder = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   })

//   // const { getCartCount, getCartAmount, currency } = useContext(shopDataContext);
//   let { cartItem, setCartItem, getCartAmount, delivery_fee, product, currency, discount   } = useContext(shopDataContext);
//   let { serverUrl } = useContext(authDataContext);
//   let [method, setMethod] = useState("cod");
//   // const [discount, setDiscount] = useState(0);
//   let navigate = useNavigate();
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }
//   const initPay = (order) => {


//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Order Payment",
//       order_id: order.id,

//       handler: async (response) => {
//         console.log("Payment Success:", response);
//         const {data} =  await axios.post(serverUrl + '/api/order/verifyrazorpay', response, {withCredentials: true});
//         if(data){
//           setCartItem({});
//           navigate("/order")
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();   // 👈 YAHAN open hoga, handler me nahi
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       let orderItems = [];

//       for (const items in cartItem) {
//         for (const item in cartItem[items]) {
//           if (cartItem[items][item] > 0) {
//             const itemInfo = structuredClone(product.find(p => p._id === items))

//             if (itemInfo) {
//               itemInfo.size = item
//               itemInfo.quantity = cartItem[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       // Calculate the correct total amount (matching what's displayed)
//       const subtotal = getCartAmount();
//       const discountAmount = (subtotal * discount) / 100;
//       const afterDiscount = subtotal - discountAmount;
//       const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
//       const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
//       const totalAmount = Math.round((afterDiscount + shippingFee + gstTax) * 100) / 100; // 👈 ROUND KARO


//       // Debug logging
//       console.log('Total Amount:', totalAmount);

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: totalAmount
//       }

//       switch (method) {
//         case 'cod':
//           const result = await axios.post(
//             serverUrl + "/api/order/placeorder",
//             {
//               items: orderItems,
//               amount: totalAmount,
//               address: formData,
//               paymentMethod: method
//             },
//             { withCredentials: true }
//           );
//           if (result.data) {
//             setCartItem({});
//             navigate('/order');
//           }
//           else {
//             console.log(result.data.message);
//           }
//           break;
//         case 'razorpay':
//           const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true })
//           if (resultRazorpay.data.success) {
//             initPay(resultRazorpay.data.order);
//           }
//           break;
//         case 'stripe':
//           const resultStripe = await axios.post(serverUrl + '/api/order/stripe', orderData, { withCredentials: true })
//           if (resultStripe.data) {
//             console.log(resultStripe.data);
//           }
//           break;
//         default:
//           break;
//       }

//     } catch (error) {
//       console.log(error)

//     }
//     console.log('Form submitted:', formData)
//     console.log('Payment method:', method)


//   }

//   // Calculations
//   const subtotal = getCartAmount ? getCartAmount() : 0;
//   const discountAmount = (subtotal * discount) / 100;
//   const afterDiscount = subtotal - discountAmount;
//   const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
//   const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
//       const total = Math.round((afterDiscount + shippingFee + gstTax) * 100) / 100; // 👈 ROUND KARO


//   return (
//     <div className='w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center flex-col lg:flex-row gap-[50px] overflow-y-auto overflow-x-hidden mb-20 md:mb-0 py-10 px-4'>

//       {/* Delivery Information Form */}
//       <div className='lg:w-[50%] w-full flex items-center lg:mt-[0px] mt-[90px]'>
//         <form onSubmit={handleSubmit} className='lg:w-[70%] w-full mx-auto'>
//           <div className='py-[10px]'>
//             <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//           </div>

//           {/* Name Fields */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder='First name'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder='Last name'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder='Email address'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4'
//           />

//           {/* Street Address */}
//           <input
//             type="text"
//             name="street"
//             value={formData.street}
//             onChange={handleChange}
//             placeholder='Street address'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4'
//           />

//           {/* City and State */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder='City'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder='State'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Zipcode and Country */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="zipcode"
//               value={formData.zipcode}
//               onChange={handleChange}
//               placeholder='Zipcode'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder='Country'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Phone */}
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder='Phone number'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-6'
//           />
//           <Lottie
//             animationData={arrow}
//             loop={true} className=' w-[50%] h-[10%] ml-100 md:ml-70 -mb-15 md:hidden lg:block 
// '/>
//         </form>
//       </div>

//       {/* Right Side - Cart Summary & Payment */}
//       <div className='lg:w-[40%] w-full space-y-6  mt-10 '>

//         {/* Cart Total */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-4">
//           <h2 className='text-xl text-white mb-4'>Cart Total</h2>

//           <div className='space-y-2 mb-4 text-gray-300'>
//             <div className='flex justify-between'>
//               <span>Subtotal</span>
//               <span>{currency}{subtotal.toFixed(2)}</span>
//             </div>
//             <div className='flex justify-between'>
//               <span>Shipping</span>
//               <span>{shippingFee === 0 ? 'FREE' : `${currency}${shippingFee.toFixed(2)}`}</span>
//             </div>
//             <div className='flex justify-between'>
//               <span>GST (18%)</span>
//               <span>{currency}{gstTax.toFixed(2)}</span>
//             </div>
//             <div className='flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700'>
//               <span>Total</span>
//               <span>{currency}{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment Method - SEPARATE DIV */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-5 -mt-2 md:mt-1">
//           <h2 className='text-xl text-white mb-4'>Payment Method</h2>

//           <div className='space-y-3'>
//             {/* Razorpay */}
//             <div
//               onClick={() => setMethod('razorpay')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'razorpay'
//                 ? 'border-blue-500 bg-gray-700'
//                 : 'border-gray-700 hover:border-gray-600'
//                 }`}
//             >

//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-blue-500' : 'border-gray-500'
//                 }`}>
//                 {method === 'razorpay' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <SiRazorpay className="text-blue-500 text-3xl" />
//                 <span className='text-white font-medium'>Razorpay</span>
//               </div>
//             </div>

//             {/* Stripe */}
//             <div
//               onClick={() => setMethod('stripe')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'stripe'
//                 ? 'border-blue-500 bg-gray-700'
//                 : 'border-gray-700 hover:border-gray-600'
//                 }`}
//             >
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-blue-500' : 'border-gray-500'
//                 }`}>
//                 {method === 'stripe' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <SiStripe className="text-purple-500 text-3xl" />
//                 <span className='text-white font-medium'>Stripe</span>
//               </div>
//             </div>

//             {/* Cash on Delivery */}
//             <div
//               onClick={() => setMethod('cod')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'cod'
//                 ? 'border-blue-500 bg-gray-700'
//                 : 'border-gray-700 hover:border-gray-600'
//                 }`}
//             >
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-blue-500' : 'border-gray-500'
//                 }`}>
//                 {method === 'cod' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <span className='text-2xl'>💵</span>
//                 <span className='text-white font-medium'>Cash on Delivery</span>
//               </div>
//             </div>
//           </div>

//           {/* Place Order Button */}

//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className='w-full mt-6 bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors'
//           >
//             PLACE ORDER
//           </button>

//         </div>

//       </div>
//     </div>
//   )
// }

// export default PlaceOrder


// import React, { useContext, useState } from 'react'
// import Title from '../component/Title'
// import { shopDataContext } from '../context/ShopContext';
// import { authDataContext } from '../context/AuthContext';
// import { SiRazorpay, SiStripe } from 'react-icons/si';
// import Lottie from 'lottie-react';
// import arrow from '../assets/arrow right.json'
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PlaceOrder = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zipcode: '',
//     country: '',
//     phone: ''
//   })

//   let { cartItem, setCartItem, getCartAmount, delivery_fee, product, currency, discount } = useContext(shopDataContext);
//   let { serverUrl } = useContext(authDataContext);
//   let [method, setMethod] = useState("cod");
//   let navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   const initPay = (order) => { 
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Order Payment",
//       description: "Order Payment",
//       order_id: order.id,

//       handler: async (response) => {
//         console.log("Payment Success:", response);
//         try {
//           const { data } = await axios.post(
//             serverUrl + '/api/order/verifyrazorpay',
//             response,
//             { withCredentials: true }
//           );

//           if (data.success) {
//             setCartItem({});
//             localStorage.removeItem('cartData');
//             navigate("/order");
//           }
//         } catch (error) {
//           console.log("Payment verification failed:", error);
//           alert("Payment verification failed!");
//         }
//       }
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       let orderItems = [];

//       for (const items in cartItem) {
//         for (const item in cartItem[items]) {
//           if (cartItem[items][item] > 0) {
//             const itemInfo = structuredClone(product.find(p => p._id === items))

//             if (itemInfo) {
//               itemInfo.size = item
//               itemInfo.quantity = cartItem[items][item];
//               orderItems.push(itemInfo);
//             }
//           }
//         }
//       }

//       // Calculate total amount
//       const subtotal = getCartAmount();
//       const discountAmount = (subtotal * discount) / 100;
//       const afterDiscount = subtotal - discountAmount;
//       const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
//       const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
//       const totalAmount = parseFloat((afterDiscount + shippingFee + gstTax).toFixed(2));

//       console.log('=== ORDER CALCULATION ===');
//       console.log('Subtotal:', subtotal);
//       console.log('Discount:', discountAmount);
//       console.log('After Discount:', afterDiscount);
//       console.log('Shipping:', shippingFee);
//       console.log('GST:', gstTax);
//       console.log('Total Amount:', totalAmount);
//       console.log('In Paise:', Math.round(totalAmount * 100));

//       let orderData = {
//         address: formData,
//         items: orderItems,
//         amount: totalAmount
//       }

//       switch (method) {
//         case 'cod':
//           const result = await axios.post(
//             serverUrl + "/api/order/placeorder",
//             {
//               items: orderItems,
//               amount: totalAmount,
//               address: formData,
//               paymentMethod: method
//             },
//             { withCredentials: true }
//           );

//           if (result.data) {
//             setCartItem({});
//             localStorage.removeItem('cartData');
//             navigate('/order');
//           } else {
//             console.log(result.data.message);
//           }
//           break;

//         case 'razorpay':
//           const resultRazorpay = await axios.post(
//             serverUrl + '/api/order/razorpay',
//             orderData,
//             { withCredentials: true }
//           )

//           if (resultRazorpay.data.success) {
//             initPay(resultRazorpay.data.order);
//           }
//           break;

//         case 'stripe':
//   const token = localStorage.getItem("token");

//   const resultStripe = await axios.post(
//     serverUrl + '/api/order/create-checkout-session',
//     orderData,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   );

//   if (resultStripe.data) {
//     console.log(resultStripe.data);
//   }
//   break;


//       }

//     } catch (error) {
//       console.log("Order Error:", error)
//     }
//   }

//   // Display Calculations
//   const subtotal = getCartAmount ? getCartAmount() : 0;
//   const discountAmount = (subtotal * discount) / 100;
//   const afterDiscount = subtotal - discountAmount;
//   const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
//   const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
//   const total = parseFloat((afterDiscount + shippingFee + gstTax).toFixed(2));

//   return (
//     <div className='w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center flex-col lg:flex-row gap-[50px] overflow-y-auto overflow-x-hidden mb-10 md:mb-0 py-10 px-4'>

//       {/* Delivery Information Form */}
//       <div className='lg:w-[50%] w-full flex items-center lg:mt-[0px] mt-[90px]  '>
//         <form onSubmit={handleSubmit} className='lg:w-[70%] w-full mx-auto'>
//           <div className='py-[10px]'>
//             <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//           </div>

//           {/* Name Fields */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               placeholder='First name'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={formData.lastName}
//               onChange={handleChange}
//               placeholder='Last name'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Email */}
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder='Email address'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4'
//           />

//           {/* Street Address */}
//           <input
//             type="text"
//             name="street"
//             value={formData.street}
//             onChange={handleChange}
//             placeholder='Street address'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4'
//           />

//           {/* City and State */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder='City'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder='State'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Zipcode and Country */}
//           <div className='w-full flex items-center justify-between gap-3 mb-4'>
//             <input
//               type="text"
//               name="zipcode"
//               value={formData.zipcode}
//               onChange={handleChange}
//               placeholder='Zipcode'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//             <input
//               type="text"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder='Country'
//               required
//               className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors'
//             />
//           </div>

//           {/* Phone */}
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder='Phone number'
//             required
//             className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-6'
//           />

//           <Lottie
//             animationData={arrow}
//             loop={true}
//             className='w-[50%] h-[10%] ml-100 md:ml-70 -mb-15 md:hidden lg:block'
//           />
//         </form>
//       </div>

//       {/* Right Side - Cart Summary & Payment */}
//       <div className='lg:w-[40%] w-full space-y-6 mt-10'>

//         {/* Cart Total */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-4">
//           <h2 className='text-xl text-white mb-4'>Cart Total</h2>

//           <div className='space-y-2 mb-4 text-gray-300'>
//             <div className='flex justify-between'>
//               <span>Subtotal</span>
//               <span>{currency}{subtotal.toFixed(2)}</span>
//             </div>

//             {discount > 0 && (
//               <div className='flex justify-between text-green-400'>
//                 <span>Discount ({discount}%)</span>
//                 <span>-{currency}{discountAmount.toFixed(2)}</span>
//               </div>
//             )}

//             <div className='flex justify-between'>
//               <span>Shipping</span>
//               <span>{shippingFee === 0 ? 'FREE' : `${currency}${shippingFee.toFixed(2)}`}</span>
//             </div>

//             <div className='flex justify-between'>
//               <span>GST (18%)</span>
//               <span>{currency}{gstTax.toFixed(2)}</span>
//             </div>

//             <div className='flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700'>
//               <span>Total</span>
//               <span>{currency}{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-5">
//           <h2 className='text-xl text-white mb-4'>Payment Method</h2>

//           <div className='space-y-3'>
//             {/* Razorpay */}
//             <div
//               onClick={() => setMethod('razorpay')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${
//                 method === 'razorpay'
//                   ? 'border-blue-500 bg-gray-700'
//                   : 'border-gray-700 hover:border-gray-600'
//               }`}
//             >
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                 method === 'razorpay' ? 'border-blue-500' : 'border-gray-500'
//               }`}>
//                 {method === 'razorpay' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <SiRazorpay className="text-blue-500 text-3xl" />
//                 <span className='text-white font-medium'>Razorpay</span>
//               </div>
//             </div>

//             {/* Stripe */}
//             <div
//               onClick={() => setMethod('stripe')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${
//                 method === 'stripe'
//                   ? 'border-blue-500 bg-gray-700'
//                   : 'border-gray-700 hover:border-gray-600'
//               }`}
//             >
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                 method === 'stripe' ? 'border-blue-500' : 'border-gray-500'
//               }`}>
//                 {method === 'stripe' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <SiStripe className="text-purple-500 text-3xl" />
//                 <span className='text-white font-medium'>Stripe</span>
//               </div>
//             </div>

//             {/* Cash on Delivery */}
//             <div
//               onClick={() => setMethod('cod')}
//               className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${
//                 method === 'cod'
//                   ? 'border-blue-500 bg-gray-700'
//                   : 'border-gray-700 hover:border-gray-600'
//               }`}
//             >
//               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
//                 method === 'cod' ? 'border-blue-500' : 'border-gray-500'
//               }`}>
//                 {method === 'cod' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
//               </div>
//               <div className='flex items-center gap-2'>
//                 <span className='text-2xl'>💵</span>
//                 <span className='text-white font-medium'>Cash on Delivery</span>
//               </div>
//             </div>
//           </div>

//           {/* Place Order Button */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className='w-full mt-6 bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors'
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PlaceOrder


import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import { SiRazorpay, SiStripe } from 'react-icons/si';
import Lottie from 'lottie-react';
import arrow from '../assets/arrow right.json'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  let { cartItem, setCartItem, getCartAmount, delivery_fee, product, currency, discount } = useContext(shopDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [method, setMethod] = useState("cod");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            serverUrl + '/api/order/verifyrazorpay',
            response,
            { withCredentials: true }
          );

          if (data.success) {
            setCartItem({});
            localStorage.removeItem('cartData');
            navigate("/order");
          }
        } catch (error) {
          console.log("Payment verification failed:", error);
          alert("Payment verification failed!");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleCheckOut = async (product) => {
    try {
      const response = await axios.post(serverUrl + '/api/order/create-checkout-session', { product }, { withCredentials: true });
      window.location.href = response.data.url
    } catch (error) {
      console.log("Payment verification failed:", error);
      alert("Payment verification failed!");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare order items
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(product.find(p => p._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Calculate total
      const subtotal = getCartAmount();
      const discountAmount = (subtotal * discount) / 100;
      const afterDiscount = subtotal - discountAmount;
      const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
      const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
      const totalAmount = parseFloat((afterDiscount + shippingFee + gstTax).toFixed(2));

      let orderData = {
        address: formData,
        items: orderItems,
        amount: totalAmount
      }

      switch (method) {
        case 'cod':
          const result = await axios.post(
            serverUrl + "/api/order/placeorder",
            {
              items: orderItems,
              amount: totalAmount,
              address: formData,
              paymentMethod: method
            },
            { withCredentials: true }
          );

          if (result.data) {
            setCartItem({});
            localStorage.removeItem('cartData');
            navigate('/order');
          } else {
            console.log(result.data.message);
          }
          break;

        case 'razorpay':
          const resultRazorpay = await axios.post(
            serverUrl + '/api/order/razorpay',
            orderData,
            { withCredentials: true }
          );

          if (resultRazorpay.data.success) {
            initPay(resultRazorpay.data.order);
          }
          break;

        case 'stripe':
          const resultStripe = await axios.post(
            serverUrl + '/api/order/create-checkout-session',
            {
              items: orderItems,
              amount: totalAmount,
              address: formData
            },
            { withCredentials: true }
          );

          if (resultStripe.data.success && resultStripe.data.url) {
            console.log('Order created:', resultStripe.data.orderId);
            console.log('Redirecting to Stripe:', resultStripe.data.url);
            // Clear cart before redirect
            setCartItem({});
            localStorage.removeItem('cartData');
            window.location.href = resultStripe.data.url;
          } else {
            console.error('Stripe checkout failed:', resultStripe.data);
            alert('Failed to create Stripe checkout session');
          }
          break;

        default:
          console.log("Invalid payment method");
      }

    } catch (error) {
      console.log("Order Error:", error)
    }
  }
  // Display Calculations
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const shippingFee = subtotal >= 500 ? 0 : delivery_fee;
  const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
  const total = parseFloat((afterDiscount + shippingFee + gstTax).toFixed(2));

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center flex-col lg:flex-row gap-[50px] overflow-y-auto overflow-x-hidden mb-10 md:mb-0 py-10 px-4'>
      {/* Delivery Form */}
      <div className='lg:w-[50%] w-full flex items-center lg:mt-[0px] mt-[90px]'>
        <form onSubmit={handleSubmit} className='lg:w-[70%] w-full mx-auto'>
          <div className='py-[10px]'>
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          {/* Name Fields */}
          <div className='w-full flex items-center justify-between gap-3 mb-4'>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder='First name' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder='Last name' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
          </div>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email address' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4' />
          <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder='Street address' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-4' />
          <div className='w-full flex items-center justify-between gap-3 mb-4'>
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder='City' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder='State' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
          </div>
          <div className='w-full flex items-center justify-between gap-3 mb-4'>
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} placeholder='Zipcode' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder='Country' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors' />
          </div>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone number' required className='w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 transition-colors mb-6' />
          <Lottie animationData={arrow} loop={true} className='w-[50%] h-[10%] ml-100 md:ml-70 -mb-15 md:hidden lg:block' />
        </form>
      </div>

      {/* Right Side - Cart Summary & Payment */}
      <div className='lg:w-[40%] w-full space-y-6 mt-10'>
        {/* Cart Total */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-4">
          <h2 className='text-xl text-white mb-4'>Cart Total</h2>
          <div className='space-y-2 mb-4 text-gray-300'>
            <div className='flex justify-between'><span>Subtotal</span><span>{currency}{subtotal.toFixed(2)}</span></div>
            {discount > 0 && (<div className='flex justify-between text-green-400'><span>Discount ({discount}%)</span><span>-{currency}{discountAmount.toFixed(2)}</span></div>)}
            <div className='flex justify-between'><span>Shipping</span><span>{shippingFee === 0 ? 'FREE' : `${currency}${shippingFee.toFixed(2)}`}</span></div>
            <div className='flex justify-between'><span>GST (18%)</span><span>{currency}{gstTax.toFixed(2)}</span></div>
            <div className='flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700'><span>Total</span><span>{currency}{total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-5">
          <h2 className='text-xl text-white mb-4'>Payment Method</h2>
          <div className='space-y-3'>
            {/* Razorpay */}
            <div onClick={() => setMethod('razorpay')} className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'razorpay' ? 'border-blue-500 bg-gray-700' : 'border-gray-700 hover:border-gray-600'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'razorpay' ? 'border-blue-500' : 'border-gray-500'}`}>{method === 'razorpay' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}</div>
              <div className='flex items-center gap-2'><SiRazorpay className="text-blue-500 text-3xl" /><span className='text-white font-medium'>Razorpay</span></div>
            </div>

            {/* Stripe */}
            <div onClick={() => setMethod('stripe')} className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'stripe' ? 'border-blue-500 bg-gray-700' : 'border-gray-700 hover:border-gray-600'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'stripe' ? 'border-blue-500' : 'border-gray-500'}`}>{method === 'stripe' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}</div>
              <div className='flex items-center gap-2'><SiStripe className="text-purple-500 text-3xl" /><span className='text-white font-medium'>Stripe</span></div>
            </div>

            {/* COD */}
            <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 p-4 rounded-md border-2 cursor-pointer transition-all ${method === 'cod' ? 'border-blue-500 bg-gray-700' : 'border-gray-700 hover:border-gray-600'}`}>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'cod' ? 'border-blue-500' : 'border-gray-500'}`}>{method === 'cod' && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}</div>
              <div className='flex items-center gap-2'><span className='text-2xl'>💵</span><span className='text-white font-medium'>Cash on Delivery</span></div>
            </div>
          </div>

          <button type="submit" onClick={handleSubmit} className='w-full mt-6 bg-white text-black font-medium py-3 rounded-md hover:bg-gray-200 transition-colors'>PLACE ORDER</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
