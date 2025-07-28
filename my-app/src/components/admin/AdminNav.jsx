import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function AdminNav() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/admin">
      <Nav.Item>
        <Nav.Link as={Link} to="/admin" eventKey="/admin">Dashboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/pending" eventKey="/admin/pending">Pending Societies</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/list" eventKey="/admin/list">Societies List</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/event" eventKey="/admin/event">Event Permissions</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/communication" eventKey="/admin/communication">Communication Center</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/leaderboard" eventKey="/admin/leaderboard">Leaderboard</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/usermanage" eventKey="/admin/usermanage">User Management</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/admin/activitylog" eventKey="/admin/activitylog">Activity Log</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default AdminNav;
