import React from "react";
import Hero from "../components/hero/Hero";
import Popular from "../components/popular/popular";
import Offers from "../components/offers/offers";
import Newcollection from "../components/newcollection/newcollection";
import Newsletter from "../components/newsletter/newsletter";

const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <Newcollection />
      <Newsletter />
    </div>
  );
};

export default Shop;
