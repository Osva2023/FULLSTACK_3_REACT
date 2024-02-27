import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function AgentListCard() {
    const navigate = useNavigate();
  
    const handleAgentListClick = () => {
      navigate('/agent-list');
    };
    const handleCreateAgentClick = () => {
      navigate('/create');
    };
   
    return (
      <Card style={{ width: '25%' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/sales-recruitment.jpg'} style={{ height: '280px' }}/>
        <Card.Body>
          <Card.Title>Agent Management</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="primary" onClick={handleAgentListClick} style={{ margin: '10px', minWidth: '120px' }}>
              to Agent List
            </Button>
            <Button variant="primary" onClick={handleCreateAgentClick} style={{ margin: '10px', minWidth: '120px' }}>
              to Create Agent
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
function TransactionCard() {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/agent-list');
    };
  
    return (
      <Card style={{ width: '25%' }}>
        <Card.Img variant="top" src={process.env.PUBLIC_URL + '/8552832.png'} style={{ height: '300px' }}/>
        <Card.Body>
          <Card.Title>Transactions</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={handleButtonClick}>
            to Transaction Page
          </Button>
        </Card.Body>
      </Card>
    );
  }

  export {AgentListCard, TransactionCard}
   