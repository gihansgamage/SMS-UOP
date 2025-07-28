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

function VicePresident({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.2 Vice President</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="VicePresidentRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="VicePresidentRegNo"
            value={values.VicePresidentRegNo}
            onChange={handleChange}
            isInvalid={touched.VicePresidentRegNo && !!errors.VicePresidentRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.VicePresidentRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="VicePresidentName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="VicePresidentName"
            value={values.VicePresidentName}
            onChange={handleChange}
            isInvalid={touched.VicePresidentName && !!errors.VicePresidentName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.VicePresidentName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="VicePresidentAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="VicePresidentAddress"
          value={values.VicePresidentAddress}
          onChange={handleChange}
          isInvalid={touched.VicePresidentAddress && !!errors.VicePresidentAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.VicePresidentAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="VicePresidentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="VicePresidentEmail"
            value={values.VicePresidentEmail}
            onChange={handleChange}
            isInvalid={touched.VicePresidentEmail && !!errors.VicePresidentEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.VicePresidentEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="VicePresidentMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="VicePresidentMobile"
            value={values.VicePresidentMobile}
            onChange={handleChange}
            isInvalid={touched.VicePresidentMobile && !!errors.VicePresidentMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.VicePresidentMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default VicePresident;
