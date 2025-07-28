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

function Editor({ values, handleChange, touched, errors }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.6 Editor</h3>
      <Row>
        <Form.Group as={Col} md={4} controlId="editorRegNo">
          <Form.Label>Registration No</Form.Label>
          <Form.Control
            type="text"
            name="editorRegNo"
            value={values.editorRegNo}
            onChange={handleChange}
            isInvalid={touched.editorRegNo && !!errors.editorRegNo}
          />
          <Form.Control.Feedback type="invalid">
            {errors.editorRegNo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="editorName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="editorName"
            value={values.editorName}
            onChange={handleChange}
            isInvalid={touched.editorName && !!errors.editorName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.editorName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mt-3" controlId="editorAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="editorAddress"
          value={values.editorAddress}
          onChange={handleChange}
          isInvalid={touched.editorAddress && !!errors.editorAddress}
        />
        <Form.Control.Feedback type="invalid">
          {errors.editorAddress}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mt-3">
        <Form.Group as={Col} controlId="editorEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="editorEmail"
            value={values.editorEmail}
            onChange={handleChange}
            isInvalid={touched.editorEmail && !!errors.editorEmail}
          />
          <Form.Control.Feedback type="invalid">
            {errors.editorEmail}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="editorMobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            type="text"
            name="editorMobile"
            value={values.editorMobile}
            onChange={handleChange}
            isInvalid={touched.editorMobile && !!errors.editorMobile}
          />
          <Form.Control.Feedback type="invalid">
            {errors.editorMobile}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </div>
  );
}

export default Editor;
