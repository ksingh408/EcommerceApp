import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart ,syncAddToCart} from "../Redux/Slices/addtoCart";
import { addToWishlist, removeFromWishlist } from "../Redux/Slices/wishlistSlice";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Carousel from "./Carousal";
// import userData from"../JsonData/config.json";
import { useMemo } from 'react';
import { fetchProducts } from "../Redux/Slices/productSlice";

const CardImg = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const allproducts = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  
  // const allproduct = useSelector((state) => state.seller.products);
  // console.log(userData)
  // const allproducts=useMemo(()=>userData.products.concat(allproduct),[allproduct]);
  // console.log(allproducts)
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(allproducts);

  // Debounce Search Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = allproducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(allproducts);
      }
    }, 500); 

    return () => clearTimeout(timer);
  }, [searchTerm, allproducts]);

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <>
    <Carousel />
  
    <div className="px-2 py-3 px-md-5 bg-red-400 shadow-lg min-vh-100 w-100">
      <div className="d-flex justify-content-start mb-3">
        <select
          className="form-select"
          style={{ width: "100%", maxWidth: "200px" }}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>
  
      <div className="row g-4 mt-2 p-3 bg-light shadow-lg ">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
  
            return (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch "
              >
                <Card
                  className="position-relative w-100"
                  style={{
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div
                    className="position-absolute top-0 end-0 p-2"
                    style={{ cursor: "pointer", zIndex: "10" }}
                    onClick={() =>
                      isWishlisted
                        ? dispatch(removeFromWishlist(product.id))
                        : dispatch(addToWishlist(product))
                    }
                  >
                    {isWishlisted ? (
                      <FaHeart size={20} className="text-danger" />
                    ) : (
                      <FaRegHeart size={20} className="text-secondary" />
                    )}
                  </div>
  
                  <Card.Img
                    className="card-img-top"
                    style={{ height: "300px", objectFit: "cover" }}
                    src={product.image}
                    alt={product.name}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>Price: ₹{product.price}</Card.Text>
                    </div>
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={() =>{ 
                        dispatch(addToCart(product)); // Update UI immediately
                        dispatch(syncAddToCart(product)); // Sync with backend
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <p className="text-center w-100 mt-3">No products found.</p>
        )}
      </div>
    </div>
  </>
  );  
};

export default CardImg;









{/* Sorting Dropdown */}
     
      {/* <div className="d-flex justify-content-between align-items-center bg-light p-3">
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            Sort by: {sortOrder === "default" ? "Default" : sortOrder === "lowToHigh" ? "Price: Low to High" : "Price: High to Low"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortOrder("default")}>Default</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOrder("lowToHigh")}>Price: Low to High</Dropdown.Item>
            <Dropdown.Item onClick={() => setSortOrder("highToLow")}>Price: High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div> */}