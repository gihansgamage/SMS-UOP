import { Form, Row, Col } from 'react-bootstrap';

export default function AGMDate({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.8 Annual General Meeting</h3>
      <Row>
        <Form.Group as={Col} md={6} controlId="agmDate">
          <Form.Label>Date AGM was Held</Form.Label>
          <Form.Control
            type="date"
            name="agmDate"
            value={values.agmDate}
            onChange={handleChange}
            isInvalid={touched.agmDate && !!errors.agmDate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.agmDate}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}
