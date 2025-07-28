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

function President({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.1 President</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="presidentRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="presidentRegNo"
            value={values.presidentRegNo}
            onChange={handleChange}
            isInvalid={touched.presidentRegNo && !!errors.presidentRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.presidentRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="presidentName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="presidentName"
            value={values.presidentName}
            onChange={handleChange}
            isInvalid={touched.presidentName && !!errors.presidentName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.presidentName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="presidentAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="presidentAddress"
          value={values.presidentAddress}
          onChange={handleChange}
          isInvalid={touched.presidentAddress && !!errors.presidentAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.presidentAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="presidentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="presidentEmail"
            value={values.presidentEmail}
            onChange={handleChange}
            isInvalid={touched.presidentEmail && !!errors.presidentEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.presidentEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="presidentMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="presidentMobile"
            value={values.presidentMobile}
            onChange={handleChange}
            isInvalid={touched.presidentMobile && !!errors.presidentMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.presidentMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default President;
