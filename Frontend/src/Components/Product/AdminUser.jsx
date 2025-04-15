import { useSelector,useDispatch } from "react-redux";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import {fetchAllUsers,fetchAllProducts,deleteUserById,deleteProductById } from "../Redux/Slices/AdminReduser"
import { useEffect } from "react";

const AdminPanel = () => {
  const dispatch=useDispatch();
  const users = useSelector(state => state.admin.users); 
  const products=useSelector(state=>state.admin.products);
  // const sellers = useSelector(state => state.admin.sellers); 

  useEffect(()=>{
    dispatch(fetchAllUsers());
    dispatch(fetchAllProducts());
  },[dispatch])
  
  const handleDeleteuser =  (id) => {
   dispatch(deleteUserById(id));
   alert("User deleted successfully");
  }

  const handleDeleteproduct = (id) => {
    dispatch(deleteProductById(id));
    alert("Product deleted successfully");
  }

  return (
    <Container className="mt-5 min-vh-100">
      <h2 className="text-center mb-4">Admin Panel - User & Seller Details</h2>

      <Row className="mb-4">
        <Col>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <h4>Users</h4>
            </Card.Header>
            <Card.Body>
              {users.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                       
              <td>
                 <button onClick={() => handleDeleteuser(user._id)} className="bg-gray-500 text-white px-4 py-2 rounded">Delete</button>
              </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">No users found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="shadow-lg">
            <Card.Header className="bg-success text-white text-center">
              <h4>Products</h4>
            </Card.Header>
            <Card.Body>
              {products.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Products seller</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((products, index) => (
                      <tr key={products.id}>
                        <td>{index + 1}</td>
                        <td>{products.name}</td>
                        <td>{products.price}</td>
                        <td>{products.seller}</td>
                      
                        <td>     <button onClick={() => handleDeleteproduct(products._id)} className="bg-gray-500 text-white px-4 py-2 rounded">Delete</button>
               </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">No sellers found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
