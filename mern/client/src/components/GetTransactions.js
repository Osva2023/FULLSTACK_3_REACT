// GetTransactions.js

export const fetchAgents = async () => {
    const response = await fetch('http://localhost:3001/api/transaction-data');
    const data = await response.json();
    return data;
  };