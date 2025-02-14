import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
//import config from "../config.json";

export default function CardImg() {
  const [sortOrder, setSortOrder] = useState("default");
  const searchTerm = useSelector((state) => state.search.searchTerm); 
  
  const allproducts=useSelector((state)=>state.seller.products)

  
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
    <div className="p-5 bg-red-400 shadow-lg">
     
      {/* Sorting Dropdown */}
     {/* <div className="d-flex justify-content-start mb-3"> */}
        <select
          className="form-select " style={{width:"200px"}}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      {/* </div> */}

  
      <div className="d-flex flex-wrap justify-content-between g-4">
        {displayedCards.length > 0 ? (
          displayedCards.map((eachCard, index) => (
            <Card key={index} className="mt-4 icon-link-hover" style={{ width: "24%" }}>
              <Card.Img  className="card-img-top"
                              style={{ height: "450px", objectFit: "cover" }}
                               src={eachCard.image} />
              <Card.Body>
                <Card.Title>{eachCard.name}</Card.Title>
                <Card.Text>Price: ₹{eachCard.price}</Card.Text>
                <Button variant="primary">Go to Cart</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center w-100 mt-3">No products found.</p>
        )}
      </div>
    </div>
  );
}
