import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { BootstrapErrorToast, BootstrapSuccessToast, BootstrapConfirmToast } from './Alerts';

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
          props.confirmDelete(props.agent._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isConfirmToastVisible, setIsConfirmToastVisible] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);

  useEffect(() => {
    async function getAgents() {
      console.log('Fetching agents from the database...'); // debugging purposes
      const response = await fetch(`http://localhost:3001/agent`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const agents = await response.json();
      console.log('Agents fetched from the database:', agents); // debugging purposes
      setAgents(agents);
    }
    getAgents();
    return;
  }, []); // Empty dependency array // debugging purposes

  // This method will delete an agent
  async function deleteAgent(id) {
    try {
      await fetch(`http://localhost:3001/agent/${id}`, {
        method: "DELETE"
      });
      setShowErrorToast(false); // Hide the error toast
      setShowSuccessToast(true); // Show the success toast
      const newAgents = agents.filter((el) => el._id !== id);
      setAgents(newAgents);
    } catch (error) {
      setShowSuccessToast(false); // Hide the success toast
      setShowErrorToast(true); // Show the error toast
      console.log(error);
    }
  }

  // This method will handle the confirmation before deleting an agent
  function confirmDelete(id) {
    setIsConfirmToastVisible(true);
    setAgentToDelete(id);
  }

  // This method will be called when the user confirms the delete
  function handleDeleteConfirmation() {
    setIsConfirmToastVisible(false);
    setIsDeleteConfirmed(true);
    deleteAgent(agentToDelete);
  }

  // This method will be called when the user cancels the delete
  function handleDeleteCancel() {
    setIsConfirmToastVisible(false);
    setAgentToDelete(null);
  }

  // This method will map out the agents on the table
  function agentList() {
    return agents.map((agent) => {
      return (
        <Agent
          agent={agent}
          confirmDelete={confirmDelete}
          key={agent._id}
        />
      );
    });
  }

  // This following section will display the table with the agents of individuals.
  return (
    <>
      {isConfirmToastVisible &&
        <BootstrapConfirmToast
          message="Are you sure you want to delete this agent?"
          onConfirm={handleDeleteConfirmation}
          onCancel={handleDeleteCancel}
        />
      }
      {showSuccessToast &&
        <BootstrapSuccessToast
          message="Agent deleted successfully!"
          onClose={() => { console.log('Closing toast'); setShowSuccessToast(false); }}
        />
      }
      {showErrorToast &&
        <BootstrapErrorToast
          message="Error deleting agent. Please try again."
          onClose={() => { console.log('Closing toast'); setShowErrorToast(false); }}
        />
      }
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
    </>
  );
}
