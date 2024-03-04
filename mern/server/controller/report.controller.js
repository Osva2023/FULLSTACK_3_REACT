import TransactionSchema from "../db/schemas/transaction.Schema.js";

export const getReportData = async (req, res) => {
    console.log("getReport is called");
    try {
        const transactions = await TransactionSchema.find();

        // Calculate total amount for each agent
        const agentTotals = transactions.reduce((acc, transaction) => {
            const { agent_name, amount } = transaction;
            acc[agent_name] = (acc[agent_name] || 0) + amount;
            return acc;
        }, {});

        // Create an array of agent data
        const agentData = Object.entries(agentTotals).map(([agent_name, total_amount]) => [agent_name, total_amount]);

        // Calculate total amount for each date
        const dateTotals = transactions.reduce((acc, transaction) => {
            const { date, amount } = transaction;
            const formattedDate = new Date(date).toISOString().split('T')[0]; // Extracting the date part
            acc[formattedDate] = (acc[formattedDate] || 0) + amount;
            return acc;
        }, {});

        // Create an array of date data
        const dateData = Object.entries(dateTotals).map(([date, total_monto]) => [date, total_monto]);

        // Prepare the response
        const response = {
            status: 'ok',
            data: {
                agent_bar_data: agentData,
                transaction_line_data: dateData,
            },
            message: null,
        };

        console.log(response);
        res.json(response);
    } catch (err) {
        console.error(`Error occurred: ${err}`);
        res.status(500).json({ error: 'An error occurred while fetching the report.' });
    }
};
