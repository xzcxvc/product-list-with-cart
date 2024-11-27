import React from "react";
import CartIcon from "/images/icon-add-to-cart.svg";

const AddToCartButton = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <button className="relative font-redhatdisplay font-bold bottom-[20px] text-[14px] items-center rounded-full ring-1 ring-red-900 bg-white px-8 py-3 flex ">
        <img src={CartIcon} alt="Cart Icon" />
        <p>Add to cart</p>
      </button>
    </div>
  );
};

export default AddToCartButton;
