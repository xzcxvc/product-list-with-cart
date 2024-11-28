import React from "react";
import CartIcon from "/images/icon-add-to-cart.svg";

const AddToCartButton = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <button
        className="relative font-redhatdisplay font-bold 
      bottom-[20px] 
      lg:text-[14px] 
      xs:text-[9px]
      sm:text-[14px] 
      md:text-[14px] items-center rounded-full ring-1 ring-red-900 bg-white 
      lg:px-8 lg:py-3
      md:px-7 md:py-2 
      sm:px-6 sm:py-2
      xs:px-6 xs:py-2 flex"
      >
        <img src={CartIcon} alt="Cart Icon" />
        <p>Add to cart</p>
      </button>
    </div>
  );
};

export default AddToCartButton;
