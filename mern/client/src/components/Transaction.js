import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Container } from 'react-bootstrap';
import Navbar from './navbar';

const TransactionPage = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch agents from your backend
    // This is just a placeholder, replace it with your actual fetch call
    fetch('/api/agents')
      .then(response => response.json())
      .then(data => setAgents(data));
  }, []);

  return (
    <div>
      <Navbar />
      <Container style={{ maxWidth: '600px', margin: 'auto', marginTop: '2px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Agent Full Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2024-01-01</td>
              <td>10000</td>
              <td>Javier Balmaseda</td>
            </tr>
          </tbody>
        </Table>

      </Container>
      <Container style={{ maxWidth: '800px', margin: 'auto' }}>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Transaction Amount</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" />
          </Form.Group>

          <Form.Group controlId="agentSelect">
            <Form.Label>Agents</Form.Label>
            <Form.Control as="select">
              {agents.map(agent => (
                <option value={agent.id}>{agent.name}</option>
              ))}
            </Form.Control>
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