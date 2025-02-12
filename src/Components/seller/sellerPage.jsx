import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../Redux/Slices/sellerReduser";
import Button from "react-bootstrap/Button";

const SellerPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    if (product.name && product.price) {
      dispatch(addProduct(product));
      setProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Product Price"
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded w-full mb-2"
        />
        <Button onClick={handleAddProduct} className="w-full">
          Add Product
        </Button>
      </div>

      <h3 className="text-lg font-bold mb-2">Your Products</h3>
      <ul>
        {products.map((item, index) => (
          <li key={index} className="flex justify-between p-2 border mb-2 rounded">
            <span>{item.name} - ${item.price}</span>
            <Button variant="destructive" onClick={() => dispatch(removeProduct(item))}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPage;
