
import { useSelector, useDispatch } from "react-redux";
import { addProduct, deleteProduct } from "../Redux/Slices/sellerReduser";
import { useState } from "react";
import { Card, Button, Form, Container, Row, Col } from "react-bootstrap";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.seller.products);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      dispatch(addProduct({ ...newProduct, id: Date.now() })); 
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id)); 
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

      {/* Display All Added Products */}
      <Row className="mt-5 justify-content-center">
        {products.length > 0 &&
          products.map((product) => (
            <Col md={6} key={product.id} className="mb-5" style={{width:"410px"}}>
              <Card className="shadow-lg">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: "400px", width:"380px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="fw-bold">Price: ₹{product.price}</Card.Text>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete Product
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default SellerDashboard;

