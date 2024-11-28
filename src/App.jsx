import React, { useState, useEffect } from "react";
import emptyCart from "/images/illustration-empty-cart.svg";
import axios from "axios";
import CartIcon from "/images/icon-add-to-cart.svg";

const App = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://65fb955514650eb2100a2799.mockapi.io/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const ProductCard = ({ id, img, title, desc, price, count, onAddToCart }) => {
    return (
      <div className="product-card flex flex-col gap-0 w-full" id={id}>
        <div className="product-img  transition-transform duration-500 lg:hover:scale-105 xl:hover:scale-105">
          <img src={img} alt="" className="rounded-lg w-full shadow-xl" />
          <div className="flex justify-center items-center w-full">
            <button
              onClick={() => onAddToCart()}
              className="relative font-redhatdisplay font-bold bottom-[20px] lg:text-[14px] sm:text-[14px] md:text-[14px] items-center rounded-full ring-1
             ring-red-900 bg-white lg:px-8 lg:py-3md:px-7 md:py-2 sm:px-6 sm:py-2xs:px-6 xs:py-2 flex"
            >
              <img src={CartIcon} alt="Cart Icon" />
              <p>Add to cart {count}</p>
            </button>
          </div>
        </div>
        <div className="product-details">
          <p className="text-[14px] text-gray-500">{title}</p>
          <p className="font-bold">{desc}</p>
          <p className="font-bold text-red-600">{"$" + price}</p>
        </div>
      </div>
    );
  };

  const handleAddToCart = (id) => {
    const addedToCart = products.find((product) => product.id === id);
    if (addedToCart) {
      setProducts((prevProducts) =>
        prevProducts.map(
          (product) =>
            product.id === id
              ? { ...product, count: product.count + 1 } // Increment count for the matched product
              : product // Leave other products unchanged
        )
      );
      console.log(addedToCart.name, "is added!");
    }
  };

  useEffect(() => {
    console.table(products);
  }, [products]);

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
              <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-[24px] gap-y-[32px]">
                {products.map((product, index) => {
                  return (
                    <div key={index}>
                      {/* For desktop view */}
                      <div className="w-full sm:hidden md:hidden lg:block xl:block">
                        <ProductCard
                          id={product.id}
                          img={product.dt_img}
                          title={product.name}
                          desc={product.description}
                          price={product.price}
                          count={product.count}
                          onAddToCart={() => handleAddToCart(product.id)}
                        />
                      </div>
                      {/* For tablet view */}
                      <div className="w-full sm:hidden md:block lg:hidden xl:hidden">
                        <ProductCard
                          id={product.id}
                          img={product.tb_img}
                          title={product.name}
                          desc={product.description}
                          price={product.price}
                          count={product.count}
                          onAddToCart={() => handleAddToCart(product.id)}
                        />
                      </div>
                      {/* For mobile view */}
                      <div className="w-full sm:block md:hidden lg:hidden xl:hidden">
                        <ProductCard
                          id={product.id}
                          img={product.mb_img}
                          title={product.name}
                          desc={product.description}
                          price={product.price}
                          count={product.count}
                          onAddToCart={() => handleAddToCart(product.id)}
                        />
                      </div>
                    </div>
                  );
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
};

export default App;
