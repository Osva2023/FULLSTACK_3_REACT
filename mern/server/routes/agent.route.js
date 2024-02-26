import express from "express";
import { updateAgentById, deleteAgentById, createAgent, getAgentById, getAllAgents } from "../controller/agent.controller.js";

const agentRoutes = express.Router();

agentRoutes.route("/agent").get(getAllAgents); // get all agents
agentRoutes.route("/agent/:id").get(getAgentById); // get agent by id
agentRoutes.route("/agent/create").post(createAgent); // create new agent
agentRoutes.route("/agent/update/:id").post(updateAgentById); // update agent by id
agentRoutes.route("/agent/:id").delete(deleteAgentById); // delete agent by id

export default agentRoutes;