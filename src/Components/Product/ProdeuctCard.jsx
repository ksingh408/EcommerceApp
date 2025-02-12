import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import config from "../config.json";

export default function CardImg() {
  const [sortOrder, setSortOrder] = useState("default");

  let sortedCards = [...config];

  if (sortOrder === "lowToHigh") {
    sortedCards.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedCards.sort((a, b) => b.price - a.price);
  }

  const displayedCards = sortedCards.slice(0, 12); // Show only 12 items

  return (
    <div className="p-5 bg-red-400 shadow-lg">
      {/* Sorting Dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-25"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product Cards */}
      <div className="d-flex flex-wrap justify-content-between g-4">
        {displayedCards.map((eachCard, index) => (
          <Card key={index} className="mt-4" style={{ width: "24%" }}>
            <Card.Img variant="top" src={eachCard.image} />
            <Card.Body>
              <Card.Title>{eachCard.name}</Card.Title>
              <Card.Text>Price: ₹{eachCard.price}</Card.Text>
              <Button variant="primary">Go to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
