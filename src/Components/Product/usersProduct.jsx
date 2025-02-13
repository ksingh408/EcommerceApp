import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Slices/addtoCart";
import { addToWishlist, removeFromWishlist } from "../Redux/Slices/wishlistSlice";
import { Button, Card, Dropdown } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../config.json"; // Mock data
import Carousel from "./Carousal";

const CardImg = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const searchTerm = useSelector((state) =>  state.search.searchTerm);

  const [sortOrder, setSortOrder] = useState("default");
  const [filteredProducts, setFilteredProducts] = useState(config);

  // Debounce Logic in useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const filtered = config.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(config);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Sort Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <Carousel />

      {/* Sorting Dropdown */}
      <div className="d-flex justify-content-between align-items-center bg-light p-3">
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
      </div>

     
      <div className="d-flex flex-wrap justify-content-between g-2 mt-4 p-4 bg-light shadow-lg">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product, index) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);

            return (
              <Card key={index} className="mt-4 position-relative" style={{ width: "24%" }}>
                {/* Wishlist Icon */}
                <div
                  className="position-absolute top-0 end-0 p-2"
                  style={{ cursor: "pointer", zIndex: "10" }}
                  onClick={() =>
                    isWishlisted
                      ? dispatch(removeFromWishlist(product.id))
                      : dispatch(addToWishlist(product))
                  }
                >
                  {isWishlisted ? <FaHeart size={25} className="text-danger" /> : <FaRegHeart size={25} className="text-secondary" />}
                </div>


                <Card.Img
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  src={product.image}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ₹{product.price}</Card.Text>
                  <Button variant="primary" onClick={() => dispatch(addToCart(product))}>
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            );
          })
        ) : (
          <p className="text-center w-100 mt-3">No products found.</p>
        )}
      </div>
    </>
  );
};

export default CardImg;


