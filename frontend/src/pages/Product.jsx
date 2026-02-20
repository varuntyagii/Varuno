import React from "react";
import Latest from "../component/Latest";
import BestSeller from "../component/BestSeller";

const Product = () => {
  return (
    <main className="w-full flex flex-col items-center pt-[1px] space-y-1">
  <Latest />
  <BestSeller />

</main>

  );
};

export default Product;
