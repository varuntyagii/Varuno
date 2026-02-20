import React, { useContext, useCallback } from "react";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Card = React.memo(({ name, image, id, price }) => {
  const { currency } = useContext(shopDataContext);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(`/productDetails/${id}`);
  }, [id, navigate]);

  return (
    <div
      className="
        w-full
        max-w-[280px]
        bg-white/5
        backdrop-blur-xl
        rounded-lg
        border border-gray-700
        p-3
        flex flex-col
        cursor-pointer
        transition-all duration-300 ease-out
        hover:translate-y-[-4px]
        hover:shadow-xl
        will-change-transform
      "
      onClick={handleClick}
    >
      <img
        src={image?.[0]}
        alt={name}
        className="w-full aspect-[3/4] object-cover rounded-md"
        loading="lazy"
      />

      <h3 className="mt-3 text-sm md:text-base text-[#c3f6fa] font-medium line-clamp-1">
        {name}
      </h3>

      <p className="mt-1 text-sm text-[#c3f6fa]">
        {currency} {price}
      </p>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
