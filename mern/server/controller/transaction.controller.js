import Transaction from "../db/schemas/transaction.Schema.js"; // Import your Transaction model

// CONTROLLER WITH THE LOGIC TO FIND ALL THE TRANSACTIONS AND SEND TEN TO THE CLIENT
export const findTransactionList = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }).limit(10);

    const formattedTransactions = transactions.map((transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return { ...transaction._doc, date: `${year}/${month}/${day}` };
    });

    const agents = [
      ...new Set(
        formattedTransactions.map((transaction) => ({
          agent_name: transaction.agent_name,
          amount: transaction.amount,
        }))
      ),
    ];

    console.dir(
      {
        status: "ok",
        data: { transactions: formattedTransactions, agents: agents },
        message: null,
      },
      { depth: null }
    );

    res.status(200).json({
      status: "ok",
      data: {
        transactions: formattedTransactions,
        agents: agents,
      },
      message: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      data: null,
      message: error.message,
    });
  }
};

// CONTROLLER WITH THE LOGIC TO CREATE A TRANSACTION
export const createTransaction = async (req, res) => {
  const { agent_id, amount } = req.body;

  try {
    // Look up the agent name
    const transaction = await Transaction.findOne({ agent_id: agent_id });
    const agent_name = transaction ? transaction.agent_name : null;

    // Create the transaction
    const newTransaction = new Transaction({
      agent_id,
      agent_name,
      amount,
    });

    const savedTransaction = await newTransaction.save();

    res
      .status(201)
      .json({ status: "ok", data: savedTransaction, message: null });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", data: null, message: error.message });
  }
};
