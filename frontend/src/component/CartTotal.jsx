// import React, { useContext } from 'react'
// import Title from './Title'
// import { shopDataContext } from '../context/ShopContext'

// const CartTotal = () => {
//     const {currrency, delivery_fee, getCartAmount} = useContext(shopDataContext);
//   return (
//     <div className='w-full lg:ml-[30px]  '> 
//     <div className='text-xl py-[10px] '>
//         <Title text1={'CART'} text2={'TOTALS'}/>
//     </div>
//       <div className='flex flex-col gap-2 mt-2 text-sm- p-[30px] border-[2px] border-gray-700 '>
//             <p>Subtotal</p>
//             <p>{currrency} {getCartAmount()}.00</p>
//       </div>
//       <hr />
//       <div className='flex justify-center text-white text-[18px] p-[10px]  '> <p>Shopping Fee</p>
//       <p>{currrency} {delivery_fee} </p> </div>
//       <hr />
//       <div className='flex justify-center text-white text-[18px] p-[10px] '>
//         <b>Total</b>
//         <b>{currrency} {getCartAmount === 0? 0: getCartAmount() + delivery_fee} </b>
//       </div>
//     </div>
//   )
// }

// export default CartTotal
