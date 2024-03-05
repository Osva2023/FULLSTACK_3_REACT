import React from "react";

import { AgentListCard, TransactionCard, ReportCard } from "./Cards";
import { Link } from "react-router-dom";
//COMPONENTS FOR THE HOME PAGE
const HomeComponent = () => {
  return (
    <div>
      <div
        className="card-container"
        style={{
          marginTop: "80px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <AgentListCard />
        <TransactionCard />
        <ReportCard />
      </div>
    </div>
  );
};

export default HomeComponent;
