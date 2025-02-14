import { useSelector, useDispatch } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../Redux/Slices/AdminReduser";
import { useState } from "react";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.admin.products);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleAddOrUpdateProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      if (editingProduct) {
        dispatch(updateProduct({ ...newProduct, id: editingProduct.id }));
        setEditingProduct(null);
      } else {
        dispatch(addProduct({ ...newProduct, id: Date.now() }));
      }
      setNewProduct({ name: "", price: "", image: "" });
      setImagePreview(null);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setImagePreview(product.image);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <div className="my-4">
        <input type="text" placeholder="Product Name" value={newProduct.name} 
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" value={newProduct.price} 
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover mt-2" />}
        <button onClick={handleAddOrUpdateProduct}>{editingProduct ? "Update Product" : "Add Product"}</button>
      </div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover inline-block mr-2" />
            {product.name} - ${product.price} 
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
