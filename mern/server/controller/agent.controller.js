// agent.controller.js
import Agent from '../db/schemas/agent.Schema.js';

// This section will help you get a list of all the agents.
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({});
    res.json(agents);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred while fetching the agents.' });
  }
};

// This section will help you get a single agent by id
export const getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    res.json(agent);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred while fetching the agent.' });
  }
};

// This section will help you create a new agent.
export const createAgent = async (req, res) => {
  try {
    const agent = new Agent(req.body);
    
    const result = await agent.save();
    res.json(result);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred while creating the agent.' });
  }
};

// This section will help you update an agent by id.
export const updateAgentById = async (req, res) => {
  try {
    const result = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(result);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred while updating the agent.' });
  }
};

// This section will help you delete an agent
export const deleteAgentById = async (req, res) => {
  try {
    const result = await Agent.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(`Error occurred: ${err}`);
    res.status(500).json({ error: 'An error occurred while deleting the agent.' });
  }
};