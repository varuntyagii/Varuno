import React, { useContext, useMemo } from "react";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

const Latest = () => {
  const { product } = useContext(shopDataContext);

  const latestProduct = useMemo(() => {
    return product?.length ? product.slice(0, 8) : [];
  }, [product]);

  return (
    <section className="w-full text-center -mt-70 md:-mt-70 px-4 relative z-10">
      <div className=" p-8 max-w-4xl mx-auto shadow-2xl  mb-10">
        <Title text1="Latest" text2="Collections" />

        <p className="mt-4 max-w-2xl mx-auto text-sm md:text-lg text-blue-100 font-light tracking-wide">
          Discover the latest arrivals — quality styles added at the right price.
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
        "
      >
        {latestProduct.map((item) => (
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

export default Latest;
