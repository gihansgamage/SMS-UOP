import { Formik } from "formik";
import * as yup from "yup";
import { Form, Row, Col } from "react-bootstrap";

const schema = yup.object().shape({
  regNo: yup.string().required("Registration No is required"),
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
});

function Secretary({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.4 Secretary</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="secretaryRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="secretaryRegNo"
            value={values.secretaryRegNo}
            onChange={handleChange}
            isInvalid={touched.secretaryRegNo && !!errors.secretaryRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.secretaryRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="secretaryName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="secretaryName"
            value={values.secretaryName}
            onChange={handleChange}
            isInvalid={touched.secretaryName && !!errors.secretaryName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.secretaryName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="secretaryAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="secretaryAddress"
          value={values.secretaryAddress}
          onChange={handleChange}
          isInvalid={touched.secretaryAddress && !!errors.secretaryAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.secretaryAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="secretaryEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="secretaryEmail"
            value={values.secretaryEmail}
            onChange={handleChange}
            isInvalid={touched.secretaryEmail && !!errors.secretaryEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.secretaryEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="secretaryMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="secretaryMobile"
            value={values.secretaryMobile}
            onChange={handleChange}
            isInvalid={touched.secretaryMobile && !!errors.secretaryMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.secretaryMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default Secretary;
