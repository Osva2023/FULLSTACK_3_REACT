import React, { useEffect, useState } from 'react';
import { Table, Form, Button, Container } from 'react-bootstrap';
import Navbar from './navbar';

const TransactionPage = () => {
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions] = useState([]); // Placeholder for transaction data

  useEffect(() => {
    // Fetch agents from your backend
    // This is just a placeholder, replace it with your actual fetch call
    fetch('/api/agents')
      .then(response => response.json())
      .then(data => setAgents(data));
  }, []);

  const handleDateSort = () => {
    // Implement your sorting logic here
  };

  return (
    <div>
      <Navbar />
      <Container style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', paddingBottom: '20px' }}>
        <Table striped bordered hover>
        <thead>
            <tr>
              <th><Button variant="link" onClick={handleDateSort}>Date</Button></th>
              <th>Amount</th>
              <th>Agent Full Name</th>
            </tr>
          </thead>
        </Table>
      </Container>
      <Container style={{ maxWidth: '800px', margin: 'auto', paddingTop: '20px', paddingBottom: '20px' }}>
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