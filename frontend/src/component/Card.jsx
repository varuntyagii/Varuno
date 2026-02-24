import React, { useContext, useState } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = React.memo(({ name, image, id, price, originalPrice, category }) => {
  const { currency, wishlist, toggleWishlist } = useContext(shopDataContext);
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const isWishlisted = wishlist?.some(item => item._id === id);

  const categoryConfig = {
    female: { label: "Women", dot: "#f472b6" },
    male:   { label: "Men",   dot: "#60a5fa" },
    kid:    { label: "Kids",  dot: "#fbbf24" },
  };
  const cat = categoryConfig[category] || { label: "New", dot: "#a78bfa" };

  return (
    <div
      onClick={() => navigate(`/productDetails/${id}`)}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="group relative w-full max-w-[260px] mx-auto cursor-pointer"
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      {/* Image Block */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">

        {/* Skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
        )}

        {/* Image */}
        <img
          src={image?.[0]}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />

        {/* Top Bar */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {/* Category Badge */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: cat.dot }}
            />
            <span className="text-[11px] font-medium text-gray-700 tracking-wide">
              {cat.label}
            </span>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist({ _id: id, name, image, price, originalPrice, category });
            }}
            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-200 hover:scale-110"
          >
            <svg
              className="w-4 h-4 transition-all duration-200"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "#f43f5e" : "none"}
              stroke={isWishlisted ? "#f43f5e" : "#6b7280"}
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute bottom-14 left-3 bg-rose-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        {/* Add to Cart — hover reveal */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info Block */}
      <div className="mt-3 px-0.5 space-y-1">
        {/* Product Name */}
        <h3 className="text-gray-900 text-sm font-medium line-clamp-1 tracking-tight">
          {name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-gray-400 ml-0.5">4.5</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold text-gray-900">
            {currency}{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">
              {currency}{originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";
export default Card;
