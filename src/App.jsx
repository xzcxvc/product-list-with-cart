import React, { useState, useEffect } from "react";
import ProductCard from "./assets/components/ProductCard";
import emptyCart from "/images/illustration-empty-cart.svg";
import axios from "axios";

const Product = ({ index, product }) => {
  return (
    <>
      {/* For desktop view */}
      <div className="w-full sm:hidden md:hidden lg:block xl:block" key={index}>
        <ProductCard
          id={product.id}
          img={product.dt_img}
          title={product.name}
          desc={product.description}
          price={product.price}
        />
      </div>

      {/* For tablet view */}
      <div
        className="w-full sm:hidden md:block lg:hidden xl:hidden"
        key={index}
      >
        <ProductCard
          id={product.id}
          img={product.tb_img}
          title={product.name}
          desc={product.description}
          price={product.price}
        />
      </div>

      {/* For mobile view */}
      <div
        className="w-full sm:block md:hidden lg:hidden xl:hidden"
        key={index}
      >
        <ProductCard
          id={product.id}
          img={product.mb_img}
          title={product.name}
          desc={product.description}
          price={product.price}
        />
      </div>
    </>
  );
};
function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://65fb955514650eb2100a2799.mockapi.io/products"
      );
      setProducts(response.data);
      console.table(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="sm:hidden xs:flex items-center justify-center min-h-screen">
        <div className="cart h-[250px] bg-white rounded-xl mt-[32px] p-[24px] text-red-700">
          <p className="text-[22px] font-bold">Oops!</p>
          <p className="text-[16px] font-semibold">
            Your screen is too small :'(
          </p>
          <div className="flex flex-col items-center justify-center"></div>
        </div>
      </div>

      <div className="bg-[#FCF8F6] min-h-screen min-w-screen sm:px-[55px] sm:py-[52px] font-redhatdisplay xs:hidden sm:block md:block lg:block xl:block">
        <div className="contianer flex gap-[26px] sm:flex-col md:flex-col lg:flex-row xl:flex-row">
          <div className="list-container sm:w-full md:w-full lg:w-9/12 xl:w-9/12">
            <h1 className="font-extrabold sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[40px] mb-[26px]">
              Desserts
            </h1>
            <div className="product-list">
              <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-[24px] gap-y-[32px]">
                {products.map((product, index) => {
                  return <Product product={product} index={index} />;
                })}
              </div>
            </div>
          </div>
          <div className="cart-container sm:w-full md:w-full lg:w-3/12 xl:w-3/12">
            <div className="cart h-[250px] bg-white rounded-xl mt-[32px] p-[24px]">
              <p className="text-red-700 text-[24px] font-bold">
                Your Cart (0)
              </p>
              <div className="flex flex-col items-center justify-center">
                <img src={emptyCart} alt="" />
                <p className="text-[#83635A] font-bold text-[14px]">
                  Your added items will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
