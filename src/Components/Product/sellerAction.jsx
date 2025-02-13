import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../Redux/Slices/sellerReduser";
import { useState } from "react";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.seller.products);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      dispatch(addProduct({ ...newProduct, id: Date.now() }));
      setNewProduct({ name: "", price: "" });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Seller Dashboard</h2>
      <div className="my-4">
        <input type="text" placeholder="Product Name" value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price} 
            <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerDashboard;
