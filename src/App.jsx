import React, { useState, useEffect } from "react";
import emptyCart from "/images/illustration-empty-cart.svg";
import axios from "axios";
import CartIcon from "/images/icon-add-to-cart.svg";
import IncrementQty from "/images/icon-increment-quantity.svg";
import DecrementQty from "/images/icon-decrement-quantity.svg";
import RemoveItem from "/images/icon-remove-item.svg";
import OrderConfirmed from "/images/icon-order-confirmed.svg";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isCartEmpty, setIsCartEmpty] = useState(true);

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

  const cartItems = products.filter((product) => product.count > 0);
  const cartItemCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  useEffect(() => {
    console.clear();
    console.table({ cartItemCount, isCartEmpty, cartItems });
    cartItemCount == 0 ? setIsCartEmpty(true) : setIsCartEmpty(false);
  }, [cartItems]);

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

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const handleNewOrder = () => {
    console.clear();
    setIsOrderConfirmed(false);
    setIsCartEmpty(true);
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({ ...product, count: 0 }))
    );
  };

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

  const Modal = () => {
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
        <div
          className={`fixed inset-0 w-full z-50 bg-black/80 backdrop-blur-sm xl:p-12 sm:p-5
            `}
        >
          <div className="flex relative lg:top-[5%] npitems-center justify-center transition-all duration-500">
            <div className="xl:w-4/12 lg:w-6/12 md:w-9/12 sm:w-12/12 p-5 rounded-xl bg-white h-auto">
              <img className="py-5" src={OrderConfirmed} alt="" />
              <div className="pb-6">
                <h1 className="font-bold text-[40px]">Order Confirmed</h1>
                <p className="text-[#B97B5A]">We hope you enjoy your food!</p>
              </div>
              <div className="bg-[#FCF8F6] w-full h-auto rounded-lg">
                <div className="max-h-72 overflow-y-auto">
                  {cartItems.map((item) => {
                    return (
                      <div className="px-3" key={item.id}>
                        <div className="flex justify-between items-center">
                          <div className="py-2 flex gap-2">
                            <img
                              className="w-14"
                              src={item.thmb_img}
                              alt="item-thubmnail"
                            />
                            <div className="flex flex-col">
                              <span className="font-bold">
                                {item.description}
                              </span>
                              <div className="flex gap-2">
                                <span className="font-semibold text-red-800">
                                  {item.count}x
                                </span>
                                <span>@</span>
                                <span>${item.price}</span>
                              </div>
                            </div>
                          </div>
                          <span className="font-bold text-[#7B523C]">
                            ${item.price * item.count}
                          </span>
                        </div>
                        <div className="divider bg-gray-200 w-12/12 h-[2px]" />
                      </div>
                    );
                  })}
                </div>
                <div className="w-full px-3 py-3">
                  <div className="flex justify-between items-center flex-row font-bold">
                    <p>Order Total</p>
                    <p className="font-extrabold text-[26px]">${cartTotal}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleNewOrder()}
                className="w-full my-5 bg-[#BE3C10] rounded-full text-white p-4 font-semibold"
              >
                Start New Order
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isOrderConfirmed && !isCartEmpty && <Modal />}
      <div className="sm:hidden xs:flex items-center justify-center min-h-screen">
        <div className="cart h-[250px] bg-white rounded-xl mt-[32px] p-[24px] text-red-700">
          <p className="text-[22px] font-bold">Oops!</p>
          <p className="text-[16px] font-semibold">
            Your screen is too small :'(
          </p>
          <div className="flex flex-col items-center justify-center"></div>
        </div>
      </div>

      <div className="bg-[#FCF8F6] min-h-screen min-w-screen sm:px-[55px] sm:py-[52px]  xs:hidden sm:block md:block lg:block xl:block">
        <div className="contianer flex gap-[26px] sm:flex-col md:flex-col lg:flex-row xl:flex-row lg:p-8">
          <div className="list-container sm:w-full md:w-full lg:w-8/12 xl:w-9/12">
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
          <div className="cart-container sm:w-full md:w-full lg:w-4/12 xl:w-3/12">
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
                <div className="w-full h-auto rounded-lg">
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.map((item) => {
                      return (
                        <div className="px-3" key={item.id}>
                          <div className="flex justify-between items-center">
                            <div className="py-2 flex gap-2">
                              <div className="flex flex-col">
                                <span className="font-bold">
                                  {item.description}
                                </span>
                                <div className="flex gap-2">
                                  <span className="font-semibold text-red-800">
                                    {item.count}x
                                  </span>
                                  <span>@</span>
                                  <span>${item.price}</span>
                                  <span className="font-bold text-[#7B523C]">
                                    ${item.price * item.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <img
                                src={RemoveItem}
                                alt="remove-item"
                                className="ring-1 p-1 ring-[#B97B5A] rounded-full"
                              />
                            </button>
                          </div>
                          <div className="divider bg-gray-200 w-12/12 h-[2px]" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full px-3 py-3">
                    <div className="flex justify-between items-center flex-row font-bold">
                      <p>Order Total</p>
                      <p className="font-extrabold text-[26px]">${cartTotal}</p>
                    </div>

                    <div className="bg-[#FCF8F6] px-6 py-4 my-8 flex justify-center items-center gap-1 rounded-lg">
                      <img src="./images/icon-carbon-neutral.svg"></img>
                      <span>
                        This is a <b>carbon-neutral </b>
                        delivery
                      </span>
                    </div>
                    <button
                      onClick={() => handleConfirmOrder()}
                      className="w-full bg-[#BE3C10] rounded-full text-white p-4 font-semibold"
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
