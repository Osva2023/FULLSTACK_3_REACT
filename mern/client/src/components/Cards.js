import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

// FUNCTION TO CREATE THE AGENT LIST CARD
function AgentListCard() {
  const navigate = useNavigate();

  const handleAgentListClick = () => {
    navigate("/agent-list");
  };
  const handleCreateAgentClick = () => {
    navigate("/create");
  };

  return (
    <Card style={{ width: "25%" }}>
      <Card.Img
        variant="top"
        src={process.env.PUBLIC_URL + "/sales-recruitment.jpg"}
        style={{ height: "280px" }}
      />
      <Card.Body>
        <Card.Title>Agent Management</Card.Title>
        <Card.Text>Use for add, edit or delet information of agents</Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="primary"
            onClick={handleAgentListClick}
            style={{ margin: "10px", minWidth: "120px" }}
          >
            to Agent List
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateAgentClick}
            style={{ margin: "10px", minWidth: "120px" }}
          >
            to Create Agent
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
// FUNCTION TO CREATE THE TRANSACTION CARD
function TransactionCard() {
  const navigate = useNavigate();
  const handleTransactionClick = () => {
    navigate("/transaction");
  };
  return (
    <Card style={{ width: "25%" }}>
      <Card.Img
        variant="top"
        src={process.env.PUBLIC_URL + "/8552832.png"}
        style={{ height: "300px" }}
      />
      <Card.Body>
        <Card.Title>Transactions</Card.Title>
        <Card.Text>
          Use for manage the Transaction of the Company's Agents
        </Card.Text>
        <Button variant="primary" onClick={handleTransactionClick}>
          to Transaction Page
        </Button>
      </Card.Body>
    </Card>
  );
}
function ReportCard() {
  const navigate = useNavigate();
  const handleReportClick = () => {
    navigate("/report");
  };
  return (
    <Card style={{ width: "25%" }}>
      <Card.Img
        variant="top"
        src={process.env.PUBLIC_URL + "/reportgraphic.jpg"}
        style={{ height: "300px" }}
      />
      <Card.Body>
        <Card.Title>Reports</Card.Title>
        <Card.Text>
          Use for manage the Transaction of the Company's Agents
        </Card.Text>
        <Button variant="primary" onClick={handleReportClick}>
          to Report Page
        </Button>
      </Card.Body>
    </Card>
  );
}
  

// EXPORTING THE COMPONENTS
export { AgentListCard, TransactionCard, ReportCard };
