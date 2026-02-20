// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Success = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         {/* Success Icon */}
//         <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
//           <svg
//             className="w-12 h-12 text-white"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mb-8">
//           Thank you for your purchase. Your payment has been processed successfully.
//         </p>

//         <div className="space-y-3">
//           <button
//             onClick={() => navigate('/')}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
//           >
//             Go to Home
//           </button>
//           <button
//             onClick={() => navigate('/order')}
//             className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
//           >
//             View Orders
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Success;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/order')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-medium transition"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
