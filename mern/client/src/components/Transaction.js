import React, { useEffect, useState } from "react";
import { Table, Form, Button, Container } from "react-bootstrap";
import { fetchAgents } from "./GetTransactions.js";
import {
  BootstrapConfirmToast,
  BootstrapErrorToast,
  BootstrapSuccessToast,
} from "./Alerts";
import "./style.css";

// TRANSACTION PAGE COMPONENT
const TransactionPage = () => {
  const [agents, setAgents] = useState([]);
  const [transactions, setTransactions] = useState([]); // Placeholder for transaction data
  const [amount, setAmount] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [showConfirmToast, setShowConfirmToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmToast(true);
  };
  // RENDER THE TRANSACTION PAGE
  return (
    <div className="content-box transaction-box flex-container">
      <Container
        style={{
          display: "inline-block",
          maxWidth: "700px",
          maxHeight: "600px",
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
          border: "1px solid #ced4da",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <h2 style={{ color: "#a52a52" }}>Recent Transactions</h2>
        <Table id="MyTable" striped bordered hover>
          <thead className="table-header">
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Agent Full Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
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
          display: "inline-block",
          maxWidth: "600px",
          maxHeight: "500px",
          margin: "auto",
          paddingTop: "20px",
          paddingBottom: "20px",
          border: "1px solid #ced4da",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <h2 style={{ color: "#a52a52" }}>Insert a Transaction</h2>
        <Form onSubmit={handleSubmit}>
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
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#ced4da",
                borderRadius: "5px",
              }}
            />
          </Form.Group>

          <Form.Group controlId="agentSelect">
            <Form.Label>Agents</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedAgent(e.target.value)}
              style={{
                backgroundColor: "#f8f9fa",
                borderColor: "#ced4da",
                borderRadius: "5px",
              }}
            >
              <option value="" disabled selected>
                Select an agent
              </option>
              {[...new Set(transactions.map((item) => item.agent_id))].map(
                (id, index) => {
                  const transaction = transactions.find(
                    (item) => item.agent_id === id
                  );
                  return (
                    <option key={`${id}-${index}`} value={id}>
                      {transaction.agent_name} ({id})
                    </option>
                  );
                }
              )}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {showConfirmToast && (
          <BootstrapConfirmToast
            message="Are you sure you want to submit this transaction?"
            onConfirm={() => {
              console.log("Submitting form with the following data:"); // debugin pruposes
              console.log("Agent ID:", selectedAgent); // debugin pruposes
              console.log("Amount:", amount); // debugin pruposes
              fetch("http://localhost:3001/api/transaction", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  agent_id: selectedAgent,
                  amount: amount,
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log("Success:", data);
                  setShowConfirmToast(false);
                  console.log("about to show success toast");
                  setShowSuccessToast(true);
                  setTimeout(() => {
                    setShowSuccessToast(false);
                    window.location.reload();
                  }, 3000);
                })
                .catch((error) => {
                  console.error("Error:", error);
                  setShowErrorToast(true);
                  setTimeout(() => {
                    setShowErrorToast(false);
                    window.location.reload();
                  }, 3000);
                });

              setShowConfirmToast(false);
            }}
            onCancel={() => {
              setShowConfirmToast(false);
            }}
          />
        )}
        {showSuccessToast && (
          <BootstrapSuccessToast
            message="Transaction submitted successfully!"
            onClose={() => setShowSuccessToast(false)}
          />
        )}
        {showErrorToast && (
          <BootstrapErrorToast
            message="Error submitting transaction"
            onClose={() => setShowErrorToast(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default TransactionPage;
