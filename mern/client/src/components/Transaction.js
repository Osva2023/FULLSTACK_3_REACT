import React, { useEffect, useState } from "react";
import { Table, Form, Button, Container } from "react-bootstrap";
import { fetchAgents } from "./GetTransactions.js";

const TransactionPage = () => {
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions] = useState([]); // Placeholder for transaction data
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAgents();
        console.log("Data:", data);
        const sortedTransactions = data.data.transactions.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sortedTransactions);
        setAgents(data.data.agents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateSort = () => {
    // Implement your sorting logic here
  };

  return (
    <div className="content-box transaction-box flex-container">
      <Container
        style={{
          maxWidth: "800px",
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Button variant="link" onClick={handleDateSort}>
                  Date
                </Button>
              </th>
              <th>Amount</th>
              <th>Agent Full Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              console.log("transaction:", transaction);
              return (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{String(transaction["amount"])}</td>
                  <td>{String(transaction["agent_name"])}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Container
        style={{
          maxWidth: "800px",
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Transaction Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) setAmount(value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="agentSelect">
            <Form.Label>Agents</Form.Label>
            <Form.Control as="select">
              {transactions.map((transaction) => (
                <option key={transaction.agent_id} value={transaction.agent_id}>
                  {transaction.agent_name} ({transaction.agent_id})
                </option>
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
