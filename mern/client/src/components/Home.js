// src/components/HomePage.js

import React from "react";

import {AgentListCard, TransactionCard} from "./Cards";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      
      
      <div className="card-container" style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-around' }}>
        <AgentListCard />
        <TransactionCard />
      </div>

      
    </div>
  );
};

export default HomeComponent;
