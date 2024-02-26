// agent.model.js
import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  first_name: 
  { type: String, required: true
    }, 
  last_name: 
  { type: String, required: true
    },
  email: 
  { type: String, required: true
    },
  region: 
  { type: String, required: true
    },
  rating: 
  { type: Number, required: true
    },
  fee: 
  { type: Number, required: true
    },
  sales: 
  { type: Number, required: true
    }
});
  

const Agent = mongoose.model('Agent', agentSchema, 'agents');  // The third argument is the collection name

export default Agent;