import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Cards() {
  return (
    <>
      {/* ✅✅✅ NEW: Add custom style for maroon button */}
      <style>
        {`
          .btn-maroon {
            background-color: #800000 !important;
            border-color: #800000 !important;
            color: white;
          }
          .btn-maroon:hover {
            background-color: #660000 !important;
            border-color: #660000 !important;
          }
        `}
      </style>

      <CardGroup className="custom-card-group">
        <Card className="custom-card">
          <Card.Body>
            <Card.Title>Register Your Society</Card.Title>
            <Card.Text>
              Submit your society details and get officially registered.
            </Card.Text>
          </Card.Body>
          <Link to="/registrationlogin">
            {/* ✅ Button updated */}
            <Button className="btn-maroon">Register Now</Button>
          </Link>
        </Card>

        <Card className="custom-card">
          <Card.Body>
            <Card.Title>Renewal Society</Card.Title>
            <Card.Text>
              Renew your existing society's registration for continued recognition.
            </Card.Text>
          </Card.Body>
          <Link to="/registrationlogin">
            <Button className="btn-maroon">Renewal Now</Button>
          </Link>
        </Card>

        <Card className="custom-card">
          <Card.Body>
            <Card.Title>Explore Societies</Card.Title>
            <Card.Text>
              Discover and connect with various university societies.
            </Card.Text>
          </Card.Body>
          <Link to="/registrationlogin">
            <Button className="btn-maroon">Explore Now</Button>
          </Link>
        </Card>

        <Card className="custom-card">
          <Card.Body>
            <Card.Title>Permission Request</Card.Title>
            <Card.Text>
              Secure approval to organize events or functions quickly, smoothly and responsibly.
            </Card.Text>
          </Card.Body>
          <Link to="/registrationlogin">
            <Button className="btn-maroon">Get Permission</Button>
          </Link>
        </Card>
      </CardGroup>
    </>
  );
}

export default Cards;
