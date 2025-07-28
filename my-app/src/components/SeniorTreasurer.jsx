import { Form, Row, Col } from "react-bootstrap";

function SeniorTreasurer({ values, handleChange, touched, errors }) {
  return (
    <div>
    <div className="mb-5 mt-4">
      <h3>3. Senior Treasurer</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="seniorTreasurerTitle">
          <Form.Label>Title</Form.Label>
          <Form.Select
            name="seniorTreasurerTitle"
            value={values.seniorTreasurerTitle}
            onChange={handleChange}
            isInvalid={touched.seniorTreasurerTitle && !!errors.seniorTreasurerTitle}
          >
            <option value="">Select</option>
            <option value="Prof.">Prof.</option>
            <option value="Dr.">Dr.</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Miss">Miss</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.seniorTreasurerTitle}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="seniorTreasurerFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="seniorTreasurerFullName"
            value={values.seniorTreasurerFullName}
            onChange={handleChange}
            isInvalid={touched.seniorTreasurerFullName && !!errors.seniorTreasurerFullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.seniorTreasurerFullName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mt-3">
        <Form.Group as={Col} md={4} controlId="seniorTreasurerDesignation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            name="seniorTreasurerDesignation"
            value={values.seniorTreasurerDesignation}
            onChange={handleChange}
            isInvalid={touched.seniorTreasurerDesignation && !!errors.seniorTreasurerDesignation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.seniorTreasurerDesignation}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="seniorTreasurerDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            name="seniorTreasurerDepartment"
            value={values.seniorTreasurerDepartment}
            onChange={handleChange}
            isInvalid={touched.seniorTreasurerDepartment && !!errors.seniorTreasurerDepartment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.seniorTreasurerDepartment}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="seniorTreasurerEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="seniorTreasurerEmail"
          value={values.seniorTreasurerEmail}
          onChange={handleChange}
          isInvalid={touched.seniorTreasurerEmail && !!errors.seniorTreasurerEmail}
        />
        <Form.Control.Feedback type="invalid">
          {errors.seniorTreasurerEmail}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mt-3" controlId="seniorTreasurerAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="seniorTreasurerAddress"
          value={values.seniorTreasurerAddress}
          onChange={handleChange}
          isInvalid={touched.seniorTreasurerAddress && !!errors.seniorTreasurerAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.seniorTreasurerAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mt-3" controlId="seniorTreasurerMobile">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control
          type="text"
          name="seniorTreasurerMobile"
          value={values.seniorTreasurerMobile}
          onChange={handleChange}
          isInvalid={touched.seniorTreasurerMobile && !!errors.seniorTreasurerMobile}
        />
        <Form.Control.Feedback type="invalid">
          {errors.seniorTreasurerMobile}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
    </div>
  );
}

export default SeniorTreasurer;
