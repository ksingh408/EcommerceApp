import React, { useState, useEffect } from "react"; // Added useEffect
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchSellerProducts, deleteProduct,updateProduct} from "../Redux/Slices/sellerReduser";

const AddProduct = () => {
  const sellerproducts = useSelector((state) => state.seller?.products || []).flat(); // Flatten the array
  const productloading = useSelector((state) => state.seller?.loading || false); // Added fallback
  const productsError = useSelector((state) => state.seller?.error || null); // Added fallback
  console.log("Seller Products:", sellerproducts); // Logs the flattened array
  console.log("Product Loading:", productloading);
  console.log("Products Error:", productsError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showDeleteId, setShowDeleteId] = useState(null);
  const [editMode, setEditMode] = useState(false); // Track if editing
  const [editProductId, setEditProductId] = useState(null); // Track product being edited

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const handleEdit = (product) => {
    //setEditMode(true);
    setEditProductId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProductId) {
      // Assuming createProduct handles both add and update
    dispatch(updateProduct({ ...form, _id: editProductId })); 
    alert("Product updated successfully!");
    } else {
      dispatch(createProduct(form)); // Create new produc
    }
    setForm({ name: "", price: "", description: "", image: "", category: "" });
    setEditMode(false);
    setEditProductId(null);
  };

  const confirmDelete = (product_id) => {
    console.log("Delete product with ID:", product_id);
    dispatch(deleteProduct(product_id));
    setShowDeleteId(null);
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center mt-5 min-vh-100">
        <div className="card p-4 shadow w-100" style={{ maxWidth: "600px" }}>
          <h3 className="text-center mb-4">🛍️ Add New Product</h3>

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-12">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Product Name*"
                required
              />
            </div>

            <div className="col-12">
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                placeholder="Price (e.g., 499)*"
                required
              />
            </div>

            <div className="col-12">
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="form-control"
                placeholder="Image URL*"
                required
              />
            </div>

            <div className="col-12">
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
                placeholder="Category (optional)"
              />
            </div>

            <div className="col-12">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="form-control"
                placeholder="Description*"
                required
              />
            </div>

            <div className="col-12 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {editProductId ? "Update Product" : "Add Product"}
              </button>
              
            </div>
          </form>
        </div>
      </div>

    
      {loading && <p className="text-center text-muted">Loading products...</p>}
{productsError && <p className="text-danger text-center">{productsError}</p>}

<div className="px-2 py-3 px-md-5 bg-danger bg-opacity-10 shadow-lg min-vh-10 w-100">
  <div className="row g-4">
    {(sellerproducts || []).map((product) => (
      <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="bg-white border shadow-sm rounded p-3 h-200 position-relative">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded mb-3"
            style={{ height: "400px", objectFit: "cover", width: "100%" }}
          />
          <h5 className="fw-bold">{product.name}</h5>
          <p className="text-muted mb-1">₹{product.price}</p>
          <p className="text-secondary small">{product.category}</p>
          <p className="small">{product.description}</p>

          <div className="d-flex gap-2 mt-3">
            <button
              onClick={() => handleEdit(product)}
              className="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteId(product._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </div>

          {showDeleteId === product._id && (
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center rounded">
              <div className="bg-white p-3 rounded shadow text-center">
                <p className="mb-3 fw-semibold">Confirm deletion?</p>
                <div className="d-flex justify-content-center gap-3">
                  <button
                    onClick={() => confirmDelete(product._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDeleteId(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
</>
  );
}
export default AddProduct;