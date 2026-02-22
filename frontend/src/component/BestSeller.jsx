import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card';

const BestSeller = () => {
  const { product } = useContext(shopDataContext); // ✅ const
  const [bestSeller, setBestSeller] = useState([]); // ✅ const

  useEffect(() => {
    // ✅ SAFE FILTER
    const filterProduct = (product || []).filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [product]);

  return (
    <section className="w-full text-center mt-10 md:mt-16 px-4">
            <div className="  rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl  mb-10">

      <Title text1="BEST" text2="SELLER" />
      <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-blue-100">
        Our most popular picks — loved by customers and ordered again and again.
      </p>
      </div>
      
      {/* ✅ SINGLE GRID - No nesting! */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bestSeller.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
      
    </section>
  );
};

export default BestSeller;
