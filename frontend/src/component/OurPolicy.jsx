import React from 'react'
import { FaTruck, FaUndoAlt, FaLock } from 'react-icons/fa'
import Title from './Title'

const policies = [
  {
    title: "Free Shipping",
    desc: "Free delivery on all orders above ₹999 across India.",
    icon: <FaTruck />
  },
  {
    title: "Easy Returns",
    desc: "7-day hassle-free returns. No questions asked.",
    icon: <FaUndoAlt />
  },
  {
    title: "Secure Payment",
    desc: "100% secure payments with trusted gateways.",
    icon: <FaLock />
  }
]

const OurPolicy = () => {
  return (
    <div className='w-full min-h-[70vh] flex flex-col items-center justify-center  gap-16 px-4'>

      {/* Heading */}
      <div className='text-center'>
        <Title text1="OUR" text2="POLICY" />
        <p className='mt-4 text-sm md:text-lg text-blue-100'>
          Customer-first policies you can trust
        </p>
      </div>

      {/* Policy Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full'>
        {policies.map((item, index) => (
          <div
            key={index}
            className='bg-gray-900/60 border border-gray-700 rounded-2xl p-8 text-center 
                       transition-all duration-300 hover:scale-105 hover:border-blue-500 hover:shadow-xl'
          >
            {/* Icon */}
            <div className='text-4xl text-blue-500 mb-5 flex justify-center'>
              {item.icon}
            </div>

            <h3 className='text-xl font-semibold text-white mb-3'>
              {item.title}
            </h3>

            <p className='text-gray-300 text-sm leading-relaxed'>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default OurPolicy
