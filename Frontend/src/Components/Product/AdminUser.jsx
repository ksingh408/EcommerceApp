import { useSelector } from "react-redux";
import { Card, Container, Row, Col, Table } from "react-bootstrap";

const AdminPanel = () => {
  const users = useSelector(state => state.admin.users); 
  const sellers = useSelector(state => state.admin.sellers); 

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
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
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
              <h4>Sellers</h4>
            </Card.Header>
            <Card.Body>
              {sellers.length > 0 ? (
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Products Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellers.map((seller, index) => (
                      <tr key={seller.id}>
                        <td>{index + 1}</td>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>{seller.productCount}</td>
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
