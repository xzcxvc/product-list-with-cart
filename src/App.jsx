import React, { useState, useEffect } from "react";
import emptyCart from "/images/illustration-empty-cart.svg";
import axios from "axios";
import CartIcon from "/images/icon-add-to-cart.svg";
import IncrementQty from "/images/icon-increment-quantity.svg";
import DecrementQty from "/images/icon-decrement-quantity.svg";
import RemoveItem from "/images/icon-remove-item.svg";
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

  const ProductCard = ({
    id,
    img,
    title,
    desc,
    price,
    count,
    onAddToCart,
    onCountInc,
    onCountDec,
  }) => {
    return (
      <div className="product-card flex flex-col gap-0 w-full" id={id}>
        <div className="product-img  transition-transform duration-500">
          <img src={img} alt="" className="rounded-lg w-full shadow-xl" />
          <div className="flex justify-center items-center w-full">
            <div
              onClick={count == 0 ? () => onAddToCart(id) : null}
              className={`relative text-[14px] bottom-[24px] w-[140px] rounded-full flex justify-center cursor-pointer
                ${
                  count == 0
                    ? "bg-white py-3 ring-1  ring-red-950"
                    : "bg-[#BE3C10] py-3 text-white ring-0"
                }`}
            >
              {count == 0 ? (
                <>
                  <img src={CartIcon} alt="Cart Icon" />
                  <p>Add to cart</p>
                </>
              ) : (
                <div className="flex w-full justify-between px-3 items-center">
                  <button
                    className="flex justify-center items-center ring-1 px-1 py-2 ring-white rounded-full"
                    onClick={() => onCountDec()}
                  >
                    <img src={DecrementQty} alt="decrement" />
                  </button>
                  <span>{count}</span>
                  <button
                    className="flex justify-center items-center ring-1 px-1 py-1 ring-white rounded-full"
                    onClick={() => onCountInc()}
                  >
                    <img src={IncrementQty} alt="increment" />
                  </button>
                </div>
              )}
            </div>
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

  const cartItems = products.filter((product) => product.count > 0);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handleAddToCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      )
    );
  };

  const handleIncOrderCount = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      )
    );
  };
  const handleDecOrderCount = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, count: product.count - 1 } : product
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, count: 0 } : product
      )
    );
  };

  useEffect(() => {
    console.clear();
    console.table(cartItems);
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
        <div className="contianer flex gap-[26px] sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:p-8">
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
                          onCountInc={() => handleIncOrderCount(product.id)}
                          onCountDec={() => handleDecOrderCount(product.id)}
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
                          onCountInc={() => handleIncOrderCount(product.id)}
                          onCountDec={() => handleDecOrderCount(product.id)}
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
                          onCountInc={() => handleIncOrderCount(product.id)}
                          onCountDec={() => handleDecOrderCount(product.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="cart-container sm:w-full md:w-full lg:w-3/12 xl:w-3/12">
            <div className="cart h-auto bg-white rounded-xl mt-[32px] p-[24px]">
              <p className="text-red-700 text-[24px] font-bold pb-4">
                Your Cart ({cartItems.length})
              </p>

              {cartItems.length == 0 ? (
                <>
                  <div className="flex flex-col items-center justify-center">
                    <img src={emptyCart} alt="" />
                    <p className="text-[#83635A] font-bold text-[14px]">
                      Your added items will appear here
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {cartItems.map((item) => {
                    return (
                      <div className="flex flex-col h-auto">
                        <div className="flex justify-between items-center">
                          <div className="py-2">
                            <span className="font-bold">
                              {item.description}
                            </span>
                            <div className="flex gap-2">
                              <span className="font-semibold text-red-800">
                                {item.count}x
                              </span>
                              <span>@</span>
                              <span>${item.price}</span>
                              <span className="font-semibold text-[#7B523C]">
                                ${item.price * item.count}
                              </span>
                            </div>
                          </div>
                          <button onClick={() => handleRemoveFromCart(item.id)}>
                            <img
                              src={RemoveItem}
                              alt="remove-item"
                              className="ring-1 p-1 ring-[#B97B5A] rounded-full"
                            />
                          </button>
                        </div>
                        <div className="divider bg-gray-300 w-12/12 h-[2px] my-4" />
                      </div>
                    );
                  })}
                  <div className="flex justify-between items-center">
                    <p>Order Total</p>
                    <p className="font-extrabold text-[26px]">${cartTotal}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
