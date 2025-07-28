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

function JuniorTreasurer({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.3 Junior Treasurer</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="juniorTreasurerRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="juniorTreasurerRegNo"
            value={values.juniorTreasurerRegNo}
            onChange={handleChange}
            isInvalid={touched.juniorTreasurerRegNo && !!errors.juniorTreasurerRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.juniorTreasurerRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="juniorTreasurerName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="juniorTreasurerName"
            value={values.juniorTreasurerName}
            onChange={handleChange}
            isInvalid={touched.juniorTreasurerName && !!errors.juniorTreasurerName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.juniorTreasurerName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="juniorTreasurerAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="juniorTreasurerAddress"
          value={values.juniorTreasurerAddress}
          onChange={handleChange}
          isInvalid={touched.juniorTreasurerAddress && !!errors.juniorTreasurerAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.juniorTreasurerAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="juniorTreasurerEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="juniorTreasurerEmail"
            value={values.juniorTreasurerEmail}
            onChange={handleChange}
            isInvalid={touched.juniorTreasurerEmail && !!errors.juniorTreasurerEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.juniorTreasurerEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="juniorTreasurerMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="juniorTreasurerMobile"
            value={values.juniorTreasurerMobile}
            onChange={handleChange}
            isInvalid={touched.juniorTreasurerMobile && !!errors.juniorTreasurerMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.juniorTreasurerMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default JuniorTreasurer;
