import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../Redux/Slices/sellerReduser';

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.seller);
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProduct({ id: editingId, data: form }));
      setEditingId(null);
    } else {
      dispatch(createProduct(form));
    }
    setForm({ name: '', price: '', description: '', image: '' });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      <form onSubmit={handleSubmit} className="grid gap-2 max-w-md mb-6">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Product</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded">
            <img src={p.image} alt={p.name} className="h-24 w-full object-cover mb-2" />
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p>₹{p.price}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(p)} className="bg-yellow-400 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
