import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import userData from"../JsonData/config.json";
import { useMemo } from 'react';
import Carousal from "./Carousal";


export default function CardImg() {
  const [sortOrder, setSortOrder] = useState("default");
  const searchTerm = useSelector((state) => state.search.searchTerm); 
  
  const allproduct=useSelector((state)=>state.seller.products)
  const allproducts=useMemo(()=>userData.products.concat(allproduct),[allproduct]);
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = allproducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
    }, 500); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  
  const [filteredCards, setFilteredCards] = useState(allproducts);
  let sortedCards = [...filteredCards];

  if (sortOrder === "lowToHigh") {
    sortedCards.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedCards.sort((a, b) => b.price - a.price);
  }

  const displayedCards = sortedCards.slice(0, 12); 

  return (
    <>
    <Carousal className="mb-4" />
  
    <div className="px-2 py-3 px-md-5 bg-red-400 shadow-lg min-vh-100">
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
  
      <div className="row g-3 mt-2">
        {displayedCards.length > 0 ? (
          displayedCards.map((eachCard, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <Card className="h-100">
                <Card.Img
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                  src={eachCard.image}
                  alt={eachCard.name}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{eachCard.name}</Card.Title>
                    <Card.Text>Price: ₹{eachCard.price}</Card.Text>
                  </div>
                  <Button variant="primary" className="mt-2">Go to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center w-100 mt-3">No products found.</p>
        )}
      </div>
    </div>
  </>
  
  );
}
