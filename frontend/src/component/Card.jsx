// import React, { useContext, useCallback } from "react";
// import { shopDataContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";

// const Card = React.memo(({ name, image, id, price }) => {
//   const { currency } = useContext(shopDataContext);
//   const navigate = useNavigate();

//   const handleClick = useCallback(() => {
//     navigate(`/productDetails/${id}`);
//   }, [id, navigate]);

//   return (
//     <div
//       className="
//         w-full
//         max-w-[280px]
//         bg-white/5
//         backdrop-blur-xl
//         rounded-lg
//         border border-gray-700
//         p-3
//         flex flex-col
//         cursor-pointer
//         transition-all duration-300 ease-out
//         hover:translate-y-[-4px]
//         hover:shadow-xl
//         will-change-transform
//       "
//       onClick={handleClick}
//     >
//       <img
//         src={image?.[0]}
//         alt={name}
//         className="w-full aspect-[3/4] object-cover rounded-md"
//         loading="lazy"
//       />

//       <h3 className="mt-3 text-sm md:text-base text-[#c3f6fa] font-medium line-clamp-1">
//         {name}
//       </h3>

//       <p className="mt-1 text-sm text-[#c3f6fa]">
//         {currency} {price}
//       </p>
//     </div>
//   );
// });

// Card.displayName = 'Card';

// export default Card;

import React, { useContext, useCallback, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = React.memo(({ name, image, id, price, originalPrice, category }) => {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Category ke hisaab se color scheme
  const getCategoryColors = () => {
    switch(category) {
      case 'female':
        return {
          badge: 'from-pink-500 to-rose-400',
          hover: 'hover:border-pink-500/30',
          shadow: 'hover:shadow-pink-500/20',
          accent: 'text-pink-400'
        };
      case 'male':
        return {
          badge: 'from-blue-500 to-cyan-400',
          hover: 'hover:border-blue-500/30',
          shadow: 'hover:shadow-blue-500/20',
          accent: 'text-blue-400'
        };
      case 'kid':
        return {
          badge: 'from-yellow-500 to-orange-400',
          hover: 'hover:border-yellow-500/30',
          shadow: 'hover:shadow-yellow-500/20',
          accent: 'text-yellow-400'
        };
      default:
        return {
          badge: 'from-purple-500 to-pink-400',
          hover: 'hover:border-purple-500/30',
          shadow: 'hover:shadow-purple-500/20',
          accent: 'text-purple-400'
        };
    }
  };

  const colors = getCategoryColors();

  return (
    <div
      onClick={() => navigate(`/productDetails/${id}`)}
      className={`
        group relative w-full max-w-[300px] mx-auto 
        bg-gradient-to-b from-gray-800/50 to-gray-900/50
        backdrop-blur-sm
        rounded-2xl 
        border border-gray-700/50
        ${colors.hover}
        transition-all duration-400 
        hover:translate-y-[-6px] 
        hover:scale-[1.02]
        hover:shadow-xl ${colors.shadow}
        cursor-pointer
        overflow-hidden
      `}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.badge} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl`} />
      
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {/* Skeleton Loader */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
        )}
        
        {/* Product Image */}
        <img
          src={image?.[0]}
          alt={name}
          className={`
            w-full h-full object-cover 
            transition-all duration-700 
            group-hover:scale-110
            ${imgLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full border border-white/10`}>
          <span className={`text-xs font-medium bg-gradient-to-r ${colors.badge} bg-clip-text text-transparent`}>
            {category || 'New'}
          </span>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 px-2.5 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg">
            <span className="text-white text-xs font-bold">{discount}% OFF</span>
          </div>
        )}

        {/* Quick View Button */}
        <div className="absolute inset-x-4 bottom-4">
          <button className="
            w-full py-3 
            bg-white/10 backdrop-blur-md 
            border border-white/20
            rounded-xl
            text-white text-sm font-medium
            opacity-0 translate-y-4 
            group-hover:opacity-100 group-hover:translate-y-0 
            transition-all duration-300
            hover:bg-white/20
          ">
            Quick View
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 space-y-2">
        {/* Product Name */}
        <h3 className="text-white font-medium line-clamp-1">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-1">(4.5)</span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={`text-2xl font-bold bg-gradient-to-r ${colors.badge} bg-clip-text text-transparent`}>
            {currency} {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {currency} {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className={`
          w-full mt-2 py-3 
          bg-gradient-to-r ${colors.badge}
          rounded-xl
          text-white text-sm font-medium
          transition-all duration-300
          hover:shadow-lg ${colors.shadow}
          flex items-center justify-center gap-2
          opacity-0 group-hover:opacity-100
          translate-y-2 group-hover:translate-y-0
        `}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
