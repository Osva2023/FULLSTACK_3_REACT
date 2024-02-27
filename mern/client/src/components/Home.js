// src/components/HomePage.js

import React from "react";
import Navbar from "./navbar";
import AgentList from "./agentList";
import {AgentListCard, BasicCard} from "./Cards";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Home Page!</h2>
      <div className="card-container">
      <AgentListCard AgentListCard/>
      <BasicCard BasicCard/>
      
    </div>
      <Link to="/agent-list">Go to Agent List</Link>
    </div>
  );
};

export default HomeComponent;
