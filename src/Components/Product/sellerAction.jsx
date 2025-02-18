
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../Redux/Slices/sellerReduser";
import { useState } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.seller.products);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      dispatch(addProduct(newProduct));
      setLastAddedProduct(newProduct);
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  const handleDeleteProduct = () => {
    if (lastAddedProduct) {
      dispatch(deleteProduct(lastAddedProduct.id)); 
      setLastAddedProduct(null);
    }
  };

  return (
    <Container className="mt-5 min-vh-100">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Seller Dashboard</h2>


              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </Form.Group>

                <Button variant="primary" className="w-100" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      

      {/* Display Only Last Added Product */}
      <Row className="mt-5 justify-content-center">
        {lastAddedProduct && (
          <Col md={6}>
            <Card className="shadow-lg">
              <Card.Img variant="top" src={lastAddedProduct.image} style={{ height: "300px", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{lastAddedProduct.name}</Card.Title>
                <Card.Text className="fw-bold">Price: ₹{lastAddedProduct.price}</Card.Text>
                <Button variant="danger" className="w-100" onClick={handleDeleteProduct}>
                  Delete Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SellerDashboard;


// import { useSelector, useDispatch } from "react-redux";
// import { addProduct } from "../Redux/Slices/sellerReduser";
// import { useState } from "react";
// import Card from "react-bootstrap/Card";

// const SellerDashboard = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.seller.products);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
//   const [lastAddedProduct, setLastAddedProduct] = useState(null);

//   const handleAddProduct = () => {
//     if (newProduct.name && newProduct.price && newProduct.image) {
//       dispatch(addProduct(newProduct));
//       setLastAddedProduct(newProduct); // Update last added product
//       setNewProduct({ name: "", price: "", image: "" });
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-between mt-5 vh-100"
//     style={{width:"30%"}}>
//       {/* <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2> */}

//       {/* Input Fields Centered */}
//       <div className="d-flex flex-column items-center g-4 border p-4 rounded-lg shadow-lg mt-5"  style={{height:"35%"}} >
//       <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
//         <input
//           className="border p-2 rounded w-full"
//           type="url"
//           placeholder="Image URL"
//           value={newProduct.image}
//           onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//         />
//         <br />
//         <input
//           className="border p-2 rounded w-full"
//           type="text"
//           placeholder="Product Name"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//         />
//         <br />
//         <input
//           className="border p-2 rounded w-full"
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//         />
//         <br />
//         <button
//           onClick={handleAddProduct}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           Add Product
//         </button>
//       </div>

//       {/* Display Only the Last Added Product */}
//       <div className="d-flex justify-content-start">
//       {lastAddedProduct && (
//         <Card key={id} className="mt-4 icon-link-hover" style={{ width: "60%" }}>
//           <Card.Img
//             className="card-img-top"
//             style={{ height: "400px", objectFit: "cover" }}
//             src={lastAddedProduct.image}
//           />
//           <Card.Body>
//             <Card.Title>{lastAddedProduct.name}</Card.Title>
//             <Card.Text>Price: ₹{lastAddedProduct.price}</Card.Text>
//           </Card.Body>
//         </Card>
//       )}
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;



// import { useSelector, useDispatch } from "react-redux";
// import { addProduct, updateProduct, deleteProduct } from "../Redux/Slices/sellerReduser";
// import { useState } from "react";
// import Card from "react-bootstrap/Card";

// const SellerDashboard = () => {
//   const dispatch = useDispatch();
//   const products = useSelector(state => state.seller.products);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "",image:"" });

//   const handleAddProduct = () => {
//     if (newProduct.name && newProduct.price) {
//       dispatch(addProduct(newProduct));
//       setNewProduct({ name: "", price: "",image:""});
//     }
//   };
// console.log(products);
//   return (
//     <div className="p-4 ">
//       <h2 className="text-xl font-bold">Seller Dashboard</h2>
//       <div className="my-4">
    
//         <input type="url" placeholder="Image" value={newProduct.image} 
//         onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
//         <br />
//         <input type="text" placeholder="Product Name" value={newProduct.name} 
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
//           <br />
//         <input type="number" placeholder="Price" value={newProduct.price} 
//           onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
//           <br />
//           <button onClick={handleAddProduct}>Add Product</button>
//       </div>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
             
//             <Card className="mt-4 icon-link-hover" style={{ width: "24%" }}>
//               <Card.Img  className="card-img-top"
//                               style={{ height: "450px", objectFit: "cover" }}
//                                src={product.image} />
//               <Card.Body>
//                 <Card.Title>{product.name}</Card.Title>
//                 <Card.Text>Price: ₹{product.price}</Card.Text>
                
//               </Card.Body>
//             </Card>
          
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SellerDashboard;



