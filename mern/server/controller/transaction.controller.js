

import Transaction from '../db/schemas/transaction.Schema.js'; // Import your Transaction model


export const findTransactionList = async (req, res) => {
    try {
      const transactions = await Transaction.find()
        .sort({ date: -1 }) // Sort the transactions in descending order by date
        .limit(10); // Limit the results to the last 10 transactions
  
      const formattedTransactions = transactions.map(transaction => {
        const date = new Date(transaction.date);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0-based in JavaScript
        const day = ('0' + date.getDate()).slice(-2);
        return { ...transaction._doc, date: `${year}/${month}/${day}` };
      });
  
      console.log('Formatted transactions:', formattedTransactions); // Print the formatted transactions
  
      // Extract unique agents from the transactions
      const agents = [...new Set(formattedTransactions.map(transaction => ({
        agent_name: transaction.agent_name,
        amount: transaction.amount // Include the amount
      })))];
  
      console.dir({ status: 'ok', data: { transactions: formattedTransactions, agents: agents }, message: null }, { depth: null });
  
      res.status(200).json({
        status: 'ok',
        data: {
          transactions: formattedTransactions,
          agents: agents
        },
        message: null
      }); // Send the response in the specified format
    } catch (error) {
      res.status(500).json({
        status: 'error',
        data: null,
        message: error.message
      }); // Send an error message if something goes wrong
    }
  };