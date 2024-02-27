// src/components/HomePage.js

import React from "react";
import Navbar from "./navbar";
import AgentList from "./agentList";
import {AgentListCard, TransactionCard} from "./Cards";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      <Navbar />
      
      <div className="card-container" style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-around' }}>
        <AgentListCard />
        <TransactionCard />
      </div>

      <div style={{ textAlign: 'center', marginTop: '80px' }}>
        <Link to="/agent-list" className="btn btn-primary" style={{ backgroundColor: '#ff4136' }} >Log out</Link>
      </div>
    </div>
  );
};

export default HomeComponent;
