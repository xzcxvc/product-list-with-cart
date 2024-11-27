import React, { useState, useEffect } from "react";
import ProductCard from "./assets/components/ProductCard";
import emptyCart from "/images/illustration-empty-cart.svg";
import axios from "axios";

const Product = ({index, product}) => {
  return (
  <>
  
  <div className="w-full xs:hidden sm:hidden md:hidden lg:block" key={index}>
    <ProductCard
      id={product.id}
      img={product.dt_img}
      title={product.name}
      desc={product.description}
      price={product.price}
    />
  </div>
  
  <div className="w-full xs:hidden sm:hidden md:block lg:hidden" key={index}>
    <ProductCard
      id={product.id}
      img={product.tb_img}
      title={product.name}
      desc={product.description}
      price={product.price}
    />
  </div>
  
  <div className="w-full xs:block sm:hidden md:hidden lg:hidden" key={index}>
    <ProductCard
      id={product.id}
      img={product.mb_img}
      title={product.name}
      desc={product.description}
      price={product.price}
    />
  </div>
    </>
    )
}
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
      <div className="bg-[#FCF8F6] min-h-screen min-w-screen px-[88px] py-[82px] font-redhatdisplay xs:px-[40px]">
        <div className="contianer flex lg:gap-[32px] lg:flex-row sm:flex-col xs:flex-col">
          <div className="list-container lg:w-9/12 sm:w-full xs:w-full">
            <h1 className="font-redhatdisplay font-extrabold lg:text-[40px] mb-[26px] xs:text-[40px]">
              Desserts
            </h1>
            <div className="product-list ">
              <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-x-[24px] gap-y-[32px]">
                {products.map((product, index) => {
                  return (
                    <Product product={product} index={index}/>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="cart-container lg:w-3/12 sm:w-full xs:w-full">
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
