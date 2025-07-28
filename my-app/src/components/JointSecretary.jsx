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

function JointSecretary({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.5 Joint Secretary</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="jointSecretaryRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="jointSecretaryRegNo"
            value={values.jointSecretaryRegNo}
            onChange={handleChange}
            isInvalid={touched.jointSecretaryRegNo && !!errors.jointSecretaryRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.jointSecretaryRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="jointSecretaryName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="jointSecretaryName"
            value={values.jointSecretaryName}
            onChange={handleChange}
            isInvalid={touched.jointSecretaryName && !!errors.jointSecretaryName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.jointSecretaryName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="jointSecretaryAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="jointSecretaryAddress"
          value={values.jointSecretaryAddress}
          onChange={handleChange}
          isInvalid={touched.jointSecretaryAddress && !!errors.jointSecretaryAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.jointSecretaryAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="jointSecretaryEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="jointSecretaryEmail"
            value={values.jointSecretaryEmail}
            onChange={handleChange}
            isInvalid={touched.jointSecretaryEmail && !!errors.jointSecretaryEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.jointSecretaryEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="jointSecretaryMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="jointSecretaryMobile"
            value={values.jointSecretaryMobile}
            onChange={handleChange}
            isInvalid={touched.jointSecretaryMobile && !!errors.jointSecretaryMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.jointSecretaryMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default JointSecretary;
