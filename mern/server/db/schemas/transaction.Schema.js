// transaction.Schema.js

import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  agent_name: {
    type: String,
    required: true
  },
  agent_id: {
    type: String,
    required: true
  },

  amount: {
    type: Number,
    required: true
  },
  
});

export default mongoose.model('Transaction', TransactionSchema);