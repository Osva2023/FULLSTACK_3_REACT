import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function AgentListCard() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/agent-list');
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Agent Management</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" onClick={handleButtonClick}>
           to Agent List
        </Button>
        <Button variant="primary" onClick={handleButtonClick}>
           to Create Agent
        </Button>

      </Card.Body>
    </Card>
  );
}
function BasicCard() {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/agent-list');
    };
  
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={handleButtonClick}>
            Transaction Page
          </Button>
        </Card.Body>
      </Card>
    );
  }

  export {AgentListCard, BasicCard}
   