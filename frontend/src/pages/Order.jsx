

// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { shopDataContext } from '../context/ShopContext'
// import { authDataContext } from '../context/AuthContext'
// import Title from '../component/Title'

// const Order = () => {
//   const { product, currency } = useContext(shopDataContext)
//   const { serverUrl } = useContext(authDataContext)

//   const [orderData, setOrderData] = useState([])

//   // ✅ Fetch user orders
//   const loadOrderData = async () => {
//     try {
//       const res = await axios.post(
//         `${serverUrl}/api/order/userorders`,
//         {},
//         { withCredentials: true }
//       )

//       if (res.data && Array.isArray(res.data)) {
//         setOrderData(res.data)
//       } else {
//         setOrderData([])
//       }
//     } catch (err) {
//       console.log("Order fetch error:", err)
//       setOrderData([])
//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   }, [])

//   // ✅ Get product details safely
//   // const getProductData = (productId) => {
//   //   return product?.find(p => p._id === productId) || null
//   // }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-600'
//       case 'Shipped': return 'bg-blue-600'
//       case 'Processing': return 'bg-yellow-600'
//       case 'Cancelled': return 'bg-red-600'
//       default: return 'bg-gray-600'
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 px-4 py-10">
//       <div className="max-w-6xl mx-auto mt-16">
//         <Title text1="MY" text2="ORDERS" />

//         {orderData.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10">
//             No orders found
//           </p>
//         ) : (
//           <div className="space-y-6 mt-8">
//             {orderData.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
//               >
//                 {/* Order Header */}
//                 <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
//                   <div>
//                     <p className="text-white font-semibold">
//                       Order #{order._id.slice(-8)}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       {new Date(order.createdAt).toDateString()}
//                     </p>
//                   </div>

//                   <div className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm text-white`}>
//                     {order.status}
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="p-4">
//                   {order.items?.map((item, index) => {
                  
//                     return (
//                       <div
//                         key={index}
//                         className="flex gap-4 mb-4 pb-4 border-b border-gray-700 last:border-0"
//                       >
//                         {/* Image */}
//                         <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
//                           {item?.image?.[0] ? (
//                             <img
//                               src={item.image[0]}
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
//                               No Image
//                             </div>
//                           )}
//                         </div>

//                         {/* Details */}
//                         <div className="flex-1">
//                           <p className="text-white font-medium">
//                             {item?.name || "Product not found"}
//                           </p>
//                           <p className="text-gray-400 text-sm">
//                             Qty: {item.quantity} | Size: {item.size}
//                           </p>
//                           <p className="text-white font-semibold">
//                             {currency}{item?.price || 0}
//                           </p>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>

//                 {/* Footer */}
//                 <div className="bg-gray-900 p-4 border-t border-gray-700 text-sm text-gray-300 flex justify-between">
//                   <p>Payment: {order.paymentMethod}</p>
//                   <p>Total: {currency}{order.amount}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Order


// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { shopDataContext } from '../context/ShopContext'
// import { authDataContext } from '../context/AuthContext'
// import Title from '../component/Title'

// const Order = () => {
//   const { currency, getCartAmount } = useContext(shopDataContext)
//   const { serverUrl } = useContext(authDataContext)
//   const [discount, setDiscount] = useState(0);

//   const [orderData, setOrderData] = useState([])
//   const [trackingModal, setTrackingModal] = useState({ show: false, order: null })
//     // Calculations
//   const subtotal = getCartAmount ? getCartAmount() : 0;
//   const discountAmount = (subtotal * discount) / 100;
//   const afterDiscount = subtotal - discountAmount;
//   const shippingFee = subtotal >= 500 ? 0 : 50;
//   const gstTax = ((afterDiscount + shippingFee) * 18) / 100;
//   const total = afterDiscount + shippingFee + gstTax;

//   // ✅ Fetch user orders
//   const loadOrderData = async () => {
//     try {
//       const res = await axios.post(
//         `${serverUrl}/api/order/userorders`,
//         {},
//         { withCredentials: true }
//       )

//       // Backend returns array directly, not wrapped in .orders
//       if (res.data && Array.isArray(res.data)) {
//         setOrderData(res.data)
//       } else {
//         setOrderData([])
//       }
//     } catch (err) {
//       console.log("Order fetch error:", err)
//       setOrderData([])
//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   }, [])

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-600'
//       case 'Shipped': return 'bg-blue-600'
//       case 'Processing': return 'bg-yellow-600'
//       case 'Order Placed':
//       case 'Oder Placed': return 'bg-orange-600'
//       case 'Cancelled': return 'bg-red-600'
//       default: return 'bg-gray-600'
//     }
//   }

//   // Order tracking handler
//   const handleTrackOrder = (order) => {
//     setTrackingModal({ show: true, order })
//   }

//   const closeTrackingModal = () => {
//     setTrackingModal({ show: false, order: null })
//   }

//   // Order status timeline
//   const getOrderTimeline = (status) => {
//     const statuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered']
//     const currentIndex = statuses.findIndex(s => s.toLowerCase() === status.toLowerCase())

//     return statuses.map((s, idx) => ({
//       status: s,
//       completed: idx <= currentIndex,
//       active: idx === currentIndex
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 px-4 py-10">
//       <div className="max-w-6xl mx-auto mt-16">
//         <Title text1="MY" text2="ORDERS" />

//         {orderData.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10">
//             No orders found
//           </p>
//         ) : (
//           <div className="space-y-6 mt-8">
//             {orderData.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
//               >
//                 {/* Order Header */}
//                 <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
//                   <div>
//                     <p className="text-white font-semibold">
//                       Order #{order._id.slice(-8)}
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       {new Date(order.createdAt || order.date).toDateString()}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <div className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm text-white`}>
//                       {order.status}
//                     </div>
//                     <button
//                       onClick={() => handleTrackOrder(order)}
//                       className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
//                     >
//                       Track Order
//                     </button>
//                   </div>
//                 </div>

//                 {/* Order Items */}
//                 <div className="p-4">
//                   {order.items?.map((item, index) => {
//                     // Items already contain full product data from PlaceOrder.jsx
//                     return (
//                       <div
//                         key={index}
//                         className="flex gap-4 mb-4 pb-4 border-b border-gray-700 last:border-0"
//                       >
//                         {/* Image - Direct access from item */}
//                         <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
//                           {item.image?.[0] ? (
//                             <img
//                               src={item.image[0]}
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
//                               No Image
//                             </div>
//                           )}
//                         </div>

//                         {/* Details - Direct access from item */}
//                         <div className="flex-1">
//                           <p className="text-white font-medium">
//                             {item.name || "Product"}
//                           </p>
//                           <p className="text-gray-400 text-sm">
//                             Qty: {item.quantity} | Size: {item.size}
//                           </p>
//                           <p className="text-white font-semibold">
//                             {currency}{item.price || 0}
//                           </p>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>

//                 {/* Footer */}
//                 <div className="bg-gray-900 p-4 border-t border-gray-700">
//                   <div className="grid md:grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-400 mb-1">Shipping Address</p>
//                       <p className="text-white">{order.address?.firstName} {order.address?.lastName}</p>
//                       <p className="text-gray-300">{order.address?.street}</p>
//                       <p className="text-gray-300">
//                         {order.address?.city}, {order.address?.state} - {order.address?.zipcode}
//                       </p>
//                       <p className="text-gray-300">{order.address?.country}</p>
//                       <p className="text-gray-300">{order.address?.phone}</p>
//                     </div>
//                     <div className="text-right md:text-left">
//                       <p className="text-gray-400 mb-1">Payment Method</p>
//                       <p className="text-white font-medium">{order.paymentMethod}</p>
//                       <p className="text-gray-400 mt-2">Payment Status</p>
//                       <p className={`font-medium ${order.payment ? 'text-green-400' : 'text-yellow-400'}`}>
//                         {order.payment ? 'Paid' : 'Pending'}
//                       </p>
//                       <p className="text-gray-400 mt-2">Total Amount</p>
//                       <p className="text-white font-bold text-lg">
//                                   {currency}{order.amount?.toFixed(2)}
//                                 </p>

//                       {/* <span>Total</span> */}

//               {/* <span>{currency}{total.toFixed(2)}</span> */}
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Order Tracking Modal */}
//       {trackingModal.show && trackingModal.order && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             {/* Modal Header */}
//             <div className="flex justify-between items-center p-6 border-b border-gray-700">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Track Order</h2>
//                 <p className="text-gray-400 text-sm mt-1">
//                   Order #{trackingModal.order._id.slice(-8)}
//                 </p>
//               </div>
//               <button
//                 onClick={closeTrackingModal}
//                 className="text-gray-400 hover:text-white text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               {/* Order Status Timeline */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-white mb-6">Order Status</h3>
//                 <div className="relative">
//                   {getOrderTimeline(trackingModal.order.status).map((step, idx) => (
//                     <div key={idx} className="flex items-start mb-8 last:mb-0">
//                       {/* Timeline Line */}
//                       {idx !== getOrderTimeline(trackingModal.order.status).length - 1 && (
//                         <div className={`absolute left-4 top-10 w-0.5 h-16 ${step.completed ? 'bg-green-500' : 'bg-gray-600'}`} />
//                       )}

//                       {/* Status Icon */}
//                       <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : step.active ? 'bg-blue-500' : 'bg-gray-600'
//                         }`}>
//                         {step.completed && (
//                           <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </div>

//                       {/* Status Text */}
//                       <div className="ml-4">
//                         <p className={`font-medium ${step.completed || step.active ? 'text-white' : 'text-gray-400'}`}>
//                           {step.status}
//                         </p>
//                         {step.active && (
//                           <p className="text-sm text-gray-400 mt-1">Current Status</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold text-white mb-4">Order Items</h3>
//                 <div className="space-y-3">
//                   {trackingModal.order.items?.map((item, idx) => (
//                     <div key={idx} className="flex gap-3 bg-gray-700 p-3 rounded-lg">
//                       <div className="w-16 h-16 bg-gray-600 rounded overflow-hidden flex-shrink-0">
//                         {item.image?.[0] && (
//                           <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <p className="text-white font-medium text-sm">{item.name}</p>
//                         <p className="text-gray-400 text-xs">Qty: {item.quantity} | Size: {item.size}</p>
//                         <p className="text-white font-semibold text-sm">{currency}{item.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Delivery Info */}
//               <div className="bg-gray-700 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold text-white mb-3">Delivery Information</h3>
//                 <div className="text-sm space-y-1">
//                   <p className="text-white">{trackingModal.order.address?.firstName} {trackingModal.order.address?.lastName}</p>
//                   <p className="text-gray-300">{trackingModal.order.address?.street}</p>
//                   <p className="text-gray-300">
//                     {trackingModal.order.address?.city}, {trackingModal.order.address?.state} - {trackingModal.order.address?.zipcode}
//                   </p>
//                   <p className="text-gray-300">{trackingModal.order.address?.country}</p>
//                   <p className="text-gray-300">Phone: {trackingModal.order.address?.phone}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 border-t border-gray-700">
//               <button
//                 onClick={closeTrackingModal}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Order

// 🔥 COMPLETE FIXED Order.jsx - SAB WORKING!

// import React, { useContext, useEffect, useState } from 'react'
// import axios from 'axios'
// import { shopDataContext } from '../context/ShopContext'
// import { authDataContext } from '../context/AuthContext'
// import Title from '../component/Title'

// const Order = () => {
//   const { currency } = useContext(shopDataContext)
//   const { serverUrl } = useContext(authDataContext)
//   const [orderData, setOrderData] = useState([])
//   const [trackingModal, setTrackingModal] = useState({ show: false, order: null })

//   // ✅ FIXED: PER ORDER TOTAL CALCULATION
//   const getOrderTotal = (orderAmount, orderDiscount = 0) => {
//     const subtotal = Number(orderAmount) || 0
//     const discountAmount = (subtotal * orderDiscount) / 100
//     const afterDiscount = subtotal - discountAmount
//     const shippingFee = subtotal >= 500 ? 0 : 50
//     const gstTax = ((afterDiscount + shippingFee) * 18) / 100
//     const total = afterDiscount + shippingFee + gstTax
//     return {
//       subtotal,
//       discountAmount,
//       afterDiscount,
//       shippingFee,
//       gstTax,
//       total: parseFloat(total.toFixed(2))
//     }
//   }

//   // ✅ Fetch user orders
//   const loadOrderData = async () => {
//     try {
//       const res = await axios.post(
//         `${serverUrl}/api/order/userorders`,
//         {},
//         { withCredentials: true }
//       )
//       if (res.data && Array.isArray(res.data)) {
//         setOrderData(res.data)
//       } else {
//         setOrderData([])
//       }
//     } catch (err) {
//       console.log("Order fetch error:", err)
//       setOrderData([])
//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   }, [])

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Delivered': return 'bg-green-600'
//       case 'Shipped': return 'bg-blue-600'
//       case 'Processing': return 'bg-yellow-600'
//       case 'Order Placed':
//       case 'Oder Placed': return 'bg-orange-600'
//       case 'Cancelled': return 'bg-red-600'
//       default: return 'bg-gray-600'
//     }
//   }

//   const handleTrackOrder = (order) => {
//     setTrackingModal({ show: true, order })
//   }

//   const closeTrackingModal = () => {
//     setTrackingModal({ show: false, order: null })
//   }

//   const getOrderTimeline = (status) => {
//     const statuses = ['Order Placed', 'Processing', 'Shipped', 'Delivered']
//     const currentIndex = statuses.findIndex(s => s.toLowerCase() === status.toLowerCase())
//     return statuses.map((s, idx) => ({
//       status: s,
//       completed: idx <= currentIndex,
//       active: idx === currentIndex
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 px-4 py-10">
//       <div className="max-w-6xl mx-auto mt-16">
//         <Title text1="MY" text2="ORDERS" />

//         {orderData.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10 text-xl">No orders found</p>
//         ) : (
//           <div className="space-y-6 mt-8">
//             {orderData.map((order) => {
//               // ✅ CORRECT TOTAL CALCULATION FOR THIS ORDER
//               const totals = getOrderTotal(order.amount, order.discount || 0)

//               return (
//                 <div key={order._id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  
//                   {/* Order Header */}
//                   <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
//                     <div>
//                       <p className="text-white font-semibold text-xl">
//                         Order #{order._id.slice(-8)}
//                       </p>
//                       <p className="text-gray-400 text-sm">
//                         {new Date(order.createdAt || order.date).toDateString()}
//                       </p>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <div className={`${getStatusColor(order.status)} px-3 py-1 rounded-full text-sm font-medium text-white`}>
//                         {order.status}
//                       </div>
//                       <button
//                         onClick={() => handleTrackOrder(order)}
//                         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
//                       >
//                         Track Order
//                       </button>
//                     </div>
//                   </div>

//                   {/* Order Items */}
//                   <div className="p-4">
//                     {order.items?.map((item, index) => (
//                       <div key={index} className="flex gap-4 mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:mb-0">
//                         <div className="w-20 h-20 bg-gray-700 rounded overflow-hidden flex-shrink-0">
//                           {item.image?.[0] ? (
//                             <img
//                               src={item.image[0]}
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
//                               No Image
//                             </div>
//                           )}
//                         </div>

//                         <div className="flex-1 min-w-0">
//                           <p className="text-white font-medium truncate">{item.name || "Product"}</p>
//                           <p className="text-gray-400 text-sm">
//                             Qty: {item.quantity} | Size: {item.size}
//                           </p>
//                           <p className="text-white font-semibold">
//                             {currency}{parseFloat(item.price || 0).toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* ✅ FIXED FOOTER WITH COMPLETE BREAKDOWN */}
//                   <div className="bg-gray-900 p-6 border-t border-gray-700">
//                     <div className="grid lg:grid-cols-2 gap-6">
                      
//                       {/* Shipping Address */}
//                       <div>
//                         <p className="text-gray-400 mb-3 font-medium text-sm uppercase tracking-wide">Shipping Address</p>
//                         <div className="space-y-1 text-sm">
//                           <p className="text-white font-medium">
//                             {order.address?.firstName} {order.address?.lastName}
//                           </p>
//                           <p className="text-gray-300">{order.address?.street}</p>
//                           <p className="text-gray-300">
//                             {order.address?.city}, {order.address?.state} - {order.address?.zipcode}
//                           </p>
//                           <p className="text-gray-300">{order.address?.country}</p>
//                           <p className="text-gray-200">{order.address?.phone}</p>
//                         </div>
//                       </div>

//                       {/* Payment & Totals */}
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">Payment</p>
//                           <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
//                             <span className="text-gray-300">Method:</span>
//                             <span className="font-medium text-white">{order.paymentMethod}</span>
//                           </div>
//                           <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
//                             <span className="text-gray-300">Status:</span>
//                             <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                               order.payment 
//                                 ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                                 : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
//                             }`}>
//                               {order.payment ? '✅ Paid' : '⏳ Pending'}
//                             </span>
//                           </div>
//                         </div>

//                         {/* 🔥 COMPLETE TOTALS BREAKDOWN */}
//                         <div className="bg-gray-850 p-5 rounded-xl border border-gray-700 space-y-3">
//                           <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Order Summary</p>
                          
//                           <div className="space-y-2 text-sm">
//                             <div className="flex justify-between">
//                               <span>Subtotal</span>
//                               <span className="font-mono">{currency}{totals.subtotal.toFixed(2)}</span>
//                             </div>
                            
//                             {order.discount > 0 && (
//                               <div className="flex justify-between text-green-400 font-medium">
//                                 <span>Discount ({order.discount}%)</span>
//                                 <span>-{currency}{totals.discountAmount.toFixed(2)}</span>
//                               </div>
//                             )}
                            
//                             <div className="flex justify-between">
//                               <span>Shipping</span>
//                               <span className="font-semibold">
//                                 {totals.shippingFee === 0 ? 'FREE' : `${currency}${totals.shippingFee}`}
//                               </span>
//                             </div>
                            
//                             <div className="flex justify-between font-medium text-orange-400">
//                               <span>GST (18%)</span>
//                               <span>{currency}{totals.gstTax.toFixed(2)}</span>
//                             </div>
//                           </div>

//                           {/* GRAND TOTAL */}
//                           <div className="pt-4 mt-4 border-t border-gray-600">
//                             <div className="flex justify-between items-center">
//                               <span className="text-xl font-bold text-white tracking-wide">TOTAL</span>
//                               <span className="text-2xl font-black text-white">
//                                 {currency}<span className="text-3xl">{totals.total.toFixed(2)}</span>
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         )}

//         {/* ✅ Tracking Modal */}
//         {trackingModal.show && trackingModal.order && (() => {
//           const totals = getOrderTotal(trackingModal.order.amount, trackingModal.order.discount || 0)
          
//           return (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//               <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center p-6 bg-gray-900 border-b border-gray-700">
//                   <div>
//                     <h2 className="text-2xl font-bold text-white">Track Order</h2>
//                     <p className="text-gray-400 text-lg mt-1">
//                       Order #{trackingModal.order._id.slice(-8)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={closeTrackingModal}
//                     className="text-gray-400 hover:text-white text-3xl font-bold p-2 rounded-xl hover:bg-gray-700 transition-colors"
//                   >
//                     ×
//                   </button>
//                 </div>

//                 <div className="p-8 space-y-8">
//                   {/* Status Timeline */}
//                   <div>
//                     <h3 className="text-xl font-bold text-white mb-6">Order Status</h3>
//                     <div className="relative max-w-2xl mx-auto">
//                       {getOrderTimeline(trackingModal.order.status).map((step, idx) => (
//                         <div key={idx} className="flex items-start mb-8 last:mb-0">
//                           {idx !== getOrderTimeline(trackingModal.order.status).length - 1 && (
//                             <div className={`absolute left-6 top-12 w-px h-20 ${step.completed ? 'bg-green-500' : 'bg-gray-600'}`} />
//                           )}
//                           <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4 ${
//                             step.completed ? 'bg-green-500' : step.active ? 'bg-blue-500' : 'bg-gray-600'
//                           }`}>
//                             {step.completed && (
//                               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                               </svg>
//                             )}
//                           </div>
//                           <div>
//                             <p className={`font-semibold ${step.completed || step.active ? 'text-white' : 'text-gray-400'}`}>
//                               {step.status}
//                             </p>
//                             {step.active && (
//                               <p className="text-sm text-blue-400 font-medium mt-1">Current Status</p>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Items + Totals */}
//                   <div className="grid lg:grid-cols-2 gap-8">
//                     {/* Items */}
//                     <div>
//                       <h4 className="text-xl font-bold text-white mb-6">Order Items</h4>
//                       <div className="space-y-4">
//                         {trackingModal.order.items?.map((item, idx) => (
//                           <div key={idx} className="flex gap-4 p-4 bg-gray-750 rounded-xl border border-gray-700">
//                             <div className="w-20 h-20 bg-gray-600 rounded-xl overflow-hidden flex-shrink-0">
//                               {item.image?.[0] && (
//                                 <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
//                               )}
//                             </div>
//                             <div className="flex-1">
//                               <p className="text-white font-semibold">{item.name}</p>
//                               <p className="text-gray-400 text-sm">Qty: {item.quantity} | Size: {item.size}</p>
//                               <p className="text-white font-bold text-lg">{currency}{item.price}</p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Address & Totals */}
//                     <div className="space-y-6">
//                       {/* Address */}
//                       <div className="bg-gray-750 p-6 rounded-xl border border-gray-700">
//                         <h4 className="text-xl font-bold text-white mb-4">Delivery Address</h4>
//                         <div className="space-y-2 text-sm">
//                           <p className="text-white font-semibold">
//                             {trackingModal.order.address?.firstName} {trackingModal.order.address?.lastName}
//                           </p>
//                           <p className="text-gray-300">{trackingModal.order.address?.street}</p>
//                           <p className="text-gray-300">
//                             {trackingModal.order.address?.city}, {trackingModal.order.address?.state} - {trackingModal.order.address?.zipcode}
//                           </p>
//                           <p className="text-gray-300">{trackingModal.order.address?.country}</p>
//                           <p className="text-gray-200 font-mono">📞 {trackingModal.order.address?.phone}</p>
//                         </div>
//                       </div>

//                       {/* Totals */}
//                       <div className="bg-gradient-to-br from-emerald-500/5 to-blue-500/5 p-6 rounded-2xl border border-emerald-500/20">
//                         <h4 className="text-xl font-bold text-emerald-400 mb-4">Payment Summary</h4>
//                         <div className="space-y-3 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-gray-300">Subtotal</span>
//                             <span>{currency}{totals.subtotal.toFixed(2)}</span>
//                           </div>
//                           {trackingModal.order.discount > 0 && (
//                             <div className="flex justify-between text-green-400 font-medium">
//                               <span>Discount ({trackingModal.order.discount}%)</span>
//                               <span>-{currency}{totals.discountAmount.toFixed(2)}</span>
//                             </div>
//                           )}
//                           <div className="flex justify-between">
//                             <span className="font-medium">Shipping</span>
//                             <span className="font-semibold">
//                               {totals.shippingFee === 0 ? 'FREE' : `${currency}${totals.shippingFee}`}
//                             </span>
//                           </div>
//                           <div className="flex justify-between font-semibold text-orange-400">
//                             <span>GST (18%)</span>
//                             <span>{currency}{totals.gstTax.toFixed(2)}</span>
//                           </div>
//                           <div className="pt-4 mt-4 border-t border-emerald-400/30 flex justify-between items-center">
//                             <span className="text-xl font-bold text-white">TOTAL PAID</span>
//                             <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
//                               {currency}{totals.total.toFixed(2)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-6 border-t border-gray-700 bg-gray-900/50">
//                   <button
//                     onClick={closeTrackingModal}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )
//         })()}
//       </div>
//     </div>
//   )
// }

// export default Order
// 🔥 Order.jsx - Simple + Track Order Button



import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import Title from '../component/Title'

const Order = () => {
  const { currency } = useContext(shopDataContext)
  const { serverUrl } = useContext(authDataContext)
  const [orderData, setOrderData] = useState([])
  const [trackingModal, setTrackingModal] = useState({ show: false, order: null })

  // ✅ Same calculation as CheckoutSection
  const getOrderTotal = (order) => {
    const subtotal = order.items?.reduce((sum, item) => {
      return sum + (Number(item.price || 0) * Number(item.quantity || 1))
    }, 0) || 0
    
    const discountAmount = (subtotal * (order.discount || 0)) / 100
    const afterDiscount = subtotal - discountAmount
    const shippingFee = subtotal >= 500 ? 0 : 50
    const gstTax = ((afterDiscount + shippingFee) * 18) / 100
    const total = afterDiscount + shippingFee + gstTax

    return { subtotal, discountAmount, shippingFee, gstTax, total }
  }

  useEffect(() => {
    axios.post(`${serverUrl}/api/order/userorders`, {}, { withCredentials: true })
      .then(res => setOrderData(res.data || []))
      .catch(err => console.log("Order fetch error:", err))
  }, [])

  const openTrackModal = (order) => {
    setTrackingModal({ show: true, order })
  }

  const closeTrackModal = () => {
    setTrackingModal({ show: false, order: null })
  }

  if (orderData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 px-4 py-10">
        <div className="max-w-4xl mx-auto mt-16">
          <Title text1="MY" text2="ORDERS" />
          <p className="text-gray-400 text-center mt-20 text-xl">No orders found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10">
      <div className="max-w-4xl mx-auto mt-16">
        <Title text1="MY" text2="ORDERS" />
        
        <div className="space-y-6 mt-8">
          {orderData.map((order) => {
            const totals = getOrderTotal(order)

            return (
              <div key={order._id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-gray-600">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' ? 'bg-green-600 text-white' :
                      order.status === 'Shipped' ? 'bg-blue-600 text-white' :
                      order.status === 'Processing' ? 'bg-yellow-600 text-white' :
                      order.status === 'Order Placed' ? 'bg-orange-600 text-white' :
                      order.status === 'Cancelled' ? 'bg-red-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {order.status}
                    </span>
                    
                    <button
                      onClick={() => openTrackModal(order)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      Track Order
                    </button>
                  </div>
                </div>

                {/* Items */}
                <div className="grid md:grid-cols-2 gap-6 mb-6 pt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Order Items ({order.items?.length || 0})</h3>
                    <div className="space-y-3">
                      {order.items?.map((item, index) => {
                        const itemTotal = Number(item.price || 0) * Number(item.quantity || 1)
                        return (
                          <div key={index} className="flex gap-3 p-3 bg-gray-750 rounded-lg border border-gray-700">
                            <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                              {item.image?.[0] ? (
                                <img src={item.image[0]} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-600">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-medium truncate">{item.name}</h4>
                              <p className="text-gray-400 text-sm">Qty: {item.quantity} | Size: {item.size}</p>
                              <p className="text-lg font-bold text-green-400 mt-1">{currency}{itemTotal.toFixed(2)}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Shipping Address</h4>
                    <div className="bg-gray-850 p-4 rounded-lg border border-gray-700 text-sm space-y-2">
                      <p className="font-semibold text-white">
                        {order.address?.firstName} {order.address?.lastName}
                      </p>
                      <p className="text-gray-300">{order.address?.street}</p>
                      <p className="text-gray-300">{order.address?.city}, {order.address?.state} {order.address?.zipcode && `- ${order.address?.zipcode}`}</p>
                      <p className="text-gray-300">{order.address?.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Totals */}
                <div className="bg-gray-850 p-5 rounded-lg border border-gray-700 text-white">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({order.items?.length} items)</span>
                      <span className="font-semibold">{currency}{totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{totals.shippingFee === 0 ? 'FREE' : `${currency}${totals.shippingFee}`}</span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-orange-400">
                      <span>GST (18%)</span>
                      <span>{currency}{totals.gstTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="font-bold">TOTAL</span>
                        <span className="text-2xl font-black text-white">{currency}{totals.total.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Payment: <span className={order.payment ? 'text-green-400' : 'text-yellow-400'}>
                          {order.payment ? '✅ Paid' : '⏳ Pending'}
                          
                        </span> | Method: {order.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 🔥 Track Order Modal */}
      {trackingModal.show && trackingModal.order && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-xl border border-gray-700 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">Track Order</h2>
                <p className="text-gray-400 text-lg">#{trackingModal.order._id.slice(-8).toUpperCase()}</p>
              </div>
              <button
                onClick={closeTrackModal}
                className="text-gray-400 hover:text-white text-2xl p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            {/* Timeline */}
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-semibold text-white text-center">Order Progress</h3>
              
              {['Order Placed', 'Processing', 'Shipped', 'Delivered'].map((status, idx) => {
                const isCurrent = trackingModal.order.status.toLowerCase() === status.toLowerCase()
                const isCompleted = ['Delivered'].includes(trackingModal.order.status)
                const stepIndex = ['Order Placed', 'Processing', 'Shipped', 'Delivered'].findIndex(s => s.toLowerCase() === trackingModal.order.status.toLowerCase())
                const isPast = idx < stepIndex

                return (
                  <div key={status} className="flex items-center gap-4 group">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                      isPast ? 'bg-green-500 border-green-500 text-white' :
                      isCurrent ? 'bg-blue-500 border-blue-500 text-white animate-pulse' :
                      'bg-gray-700 border-gray-600 text-gray-400 group-hover:bg-gray-600'
                    }`}>
                      {isPast ? '✓' : isCurrent ? '⚡' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${isPast ? 'text-green-400' : isCurrent ? 'text-blue-400' : 'text-gray-300'}`}>
                        {status}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-blue-400 mt-1">Currently processing</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Summary */}
            <div className="p-6 border-t border-gray-700 bg-gray-850">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Status</span>
                  <p className="font-semibold text-white mt-1">{trackingModal.order.status}</p>
                </div>
                <div>
                  <span className="text-gray-400">Payment</span>
                  <p className={`font-semibold mt-1 ${trackingModal.order.payment ? 'text-green-400' : 'text-yellow-400'}`}>
                    {trackingModal.order.payment ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeTrackModal}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


export default Order
