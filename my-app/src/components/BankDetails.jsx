import { Form, Row, Col } from 'react-bootstrap';

export default function BankDetails({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>5. Bank Details (Optional)</h3>
      <Row>
        <Col md={6}>
          <Form.Group controlId="bankAccount">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              name="bankAccount"
              value={values.bankAccount}
              onChange={handleChange}
              isInvalid={touched.bankAccount && !!errors.bankAccount}
            />
            {touched.bankAccount && errors.bankAccount && (
              <Form.Control.Feedback type="invalid">
                {errors.bankAccount}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group controlId="bankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              name="bankName"
              value={values.bankName}
              onChange={handleChange}
              isInvalid={touched.bankName && !!errors.bankName}
            />
            {touched.bankName && errors.bankName && (
              <Form.Control.Feedback type="invalid">
                {errors.bankName}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
