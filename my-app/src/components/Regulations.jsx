import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Regulations() {
  return (
    <div>
        <Card>
        <Card.Title>REGULATIONS FOR REGISTRATION AND RENEWAL OF STUDENT SOCIETIES (2024/2025)</Card.Title>
        <Card.Body>
            <h3>Establishment of a New Student Society</h3>
                    <ol type="i">
                        <li>Submit a request letter (via Faculty Dean or Deputy Vice-Chancellor for university-wide societies) to obtain Vice-Chancellor approval.</li>
                        <li>Senior Treasurer and Advisory Board must draft a constitution with aims/objectives aligned with the University's mission.</li>
                        <li>Membership requirements:
                            <ul>
                                <li>Subject-related societies: 25+ members</li>
                                <li>Non-subject societies: 40+ members</li>
                                <li>University-wide societies: 50+ members</li>
                            </ul>
                        </li>
                        <li>Secretary and Junior Treasurer cannot be final-year students</li>
                        <li>Membership restricted to internal students; no external affiliations</li>
                        <li>Submit approved constitution, SS-01 form, and AGM minutes to the Assistant Registrar by 31.12.2024</li>
                        <li>No late applications. Governing Council grants final approval</li>
                    </ol>
        </Card.Body>
        </Card>
    </div>
  );
}

export default Regulations;