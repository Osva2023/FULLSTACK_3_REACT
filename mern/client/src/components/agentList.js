import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
const Agent = (props) => (
 <tr>
   <td>{props.agent.last_name}, {props.agent.first_name}</td>
   <td>{props.agent.region}</td>
   <td>{props.agent.rating}</td>
   <td>{props.agent.sales}</td>
   <td>{props.agent.fee}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.agent._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteAgent(props.agent._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function AgentList() {
 const [agents, setAgents] = useState([]);
  // This method fetches the agents from the database.
 useEffect(() => {
  console.log(' USE EFFECT: Fetching agents from the database...');      // debugging porpuses  
   async function getAgents() {
    console.log('Fetching agents from the database...');           // debugging porpuses
     const response = await fetch(`http://localhost:3001/agent`);
      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
      const agents = await response.json();
     console.log('Agents fetched from the database:', agents);   // debugging porpuses
     setAgents(agents);
   }
    getAgents();
    return;
 }, [agents.length]);
    console.log ('current state:', agents);       // debugging porpuses

  // This method will delete an agent
 async function deleteAgent(id) {
   await fetch(`http://localhost:3001/agent/${id}`, {
     method: "DELETE"
   });
    const newAgents = agents.filter((el) => el._id !== id);
   setAgents(newAgents);
 }
  // This method will map out the agents on the table
 function agentList() {
   return agents.map((agent) => {
     return (
       <Agent
         agent={agent}
         deleteAgent={() => deleteAgent(agent._id)}
         key={agent._id}
       />
     );
   });
 }
  // This following section will display the table with the agents of individuals.
 return (
  <div style={{ margin: '20px auto', maxWidth: '1400px' }}>
  <Navbar />
  <h3>Agent List</h3>
  <table className="table table-striped" style={{ marginTop: 20 }}>
    <thead>
      <tr>
        <th>Full_Name</th>
        <th>Region</th>
        <th>Rating</th>
        <th>Sales</th>
        <th>Fee</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>{agentList()}</tbody>
  </table>
</div>
);
}