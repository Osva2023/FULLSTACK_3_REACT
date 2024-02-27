import React from 'react';
import { Table, Form, Button, Container } from 'react-bootstrap';
import Navbar from './navbar';

const TransactionPage = () => {
  return (
    <div>
      <Navbar />
      <Container style={{ maxWidth: '600px', margin: 'auto', marginTop: '2px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John</td>
              <td>Doe</td>
              <td>@johndoe</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container style={{ maxWidth: '600px', margin: 'auto', marginTop: '2px' }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default TransactionPage;