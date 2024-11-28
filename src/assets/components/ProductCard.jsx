import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ id, img, title, desc, price }) => {
  return (
    <div className="product-card flex flex-col gap-0 w-full" key={id}>
      <div className="product-img  transition-transform duration-500 lg:hover:scale-105 xl:hover:scale-105">
        <img src={img} alt="" className="rounded-lg w-full shadow-xl " />
        <AddToCartButton />
      </div>
      <div className="product-details">
        <p className="text-[14px] text-gray-500">{title ? title : "Title"}</p>
        <p className="font-bold">{desc ? desc : "Description"}</p>
        <p className="font-bold text-red-600">
          {price ? "$ " + price : "$ 0.00"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
