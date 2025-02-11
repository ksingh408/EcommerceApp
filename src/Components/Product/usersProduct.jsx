import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Store/Slices/addtoCart";
import { addToWishlist, removeFromWishlist } from "../Store/Slices/wishlistSlice";
import { Button, Card } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import config from "../config.json"; // Assuming mock data

const CardImg = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between g-2 mt-4 p-4 bg-light shadow-lg">
        {config.map((product, index) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);

          return (
            <Card key={index} className="mt-4 position-relative" style={{ width: "24%" }}>
              {/* Wishlist Icon (Heart) */}
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
                  <FaHeart size={25} className="text-danger" />
                ) : (
                  <FaRegHeart size={25} className="text-secondary" />
                )}
              </div>

              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ₹{product.price}</Card.Text>
                <div className="d-flex justify-content-between"><Button variant="primary" onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </Button>
      
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default CardImg;
