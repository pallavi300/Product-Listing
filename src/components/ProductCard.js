const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-40 object-contain"
      />
      <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500">{product.category}</p>
    </div>
  );
};

export default ProductCard;
