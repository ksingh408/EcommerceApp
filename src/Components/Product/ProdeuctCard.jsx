import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//import  Img from '../image/img2.jpg';
import config  from '../config.json';
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function CardImg() {
  let CardArr=config;

  if("/"){
  let CardArrs=CardArr.slice(0,12)

  return (
  <div className="d-flex flex-wrap  justify-content-between g-4 mt-4 p-5 bg-red-400 shadow-lg">
      {CardArrs.map((eachCard,index)=>(
        <Card className='mt-4' style={{ width: '24%' }}>
       <Card.Img variant="top" src={eachCard.image} />
       <Card.Body>
        <Card.Title>{eachCard.name}</Card.Title>
        {/* <Card.Price>{eachCard.brand}</Card.Price> */}
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>

        
        <Button variant="primary">Go to Cart</Button> 
       </Card.Body>
    </Card>))}
    </div>
  
  );}}
 
