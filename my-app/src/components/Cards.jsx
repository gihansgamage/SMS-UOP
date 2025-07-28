import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';


function Cards() {
  return (
    <CardGroup className="custom-card-group">
      <Card className="custom-card">
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>Register Your Society</Card.Title>
          <Card.Text>
            Submit your society details and get officially registered.
          </Card.Text>
        </Card.Body>
        <Link to="/registrationlogin">
            <Button variant="primary">Register Now</Button>
        </Link>
      </Card>
      
        <Card className="custom-card">
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>Renewal Society</Card.Title>
          <Card.Text>
            Renew your existing society's registration for continued recognition.
          </Card.Text>
        </Card.Body>
        <Link to="/registrationlogin">
            <Button variant="primary">Renewal Now</Button>
        </Link>
      </Card>

        <Card className="custom-card">
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>Explore Socities</Card.Title>
          <Card.Text>
            Discover and connect with various university socities.
          </Card.Text>
        </Card.Body>
        <Link to="/registrationlogin">
            <Button variant="primary">Explore Now</Button>
        </Link>
      </Card>

        <Card className="custom-card">
        {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
        <Card.Body>
          <Card.Title>Permission Request</Card.Title>
          <Card.Text>
            Secure approval to organize events or functions quickly, smoothly and responsibly.
          </Card.Text>
        </Card.Body>
        <Link to="/registrationlogin">
            <Button variant="primary">Get Permission</Button>
        </Link>
      </Card>

    </CardGroup>
  );
}

export default Cards;