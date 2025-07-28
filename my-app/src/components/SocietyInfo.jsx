import { Form } from "react-bootstrap";

function SocietyInfo({ values, handleChange, touched, errors }) {
  return (
    
    <div>
      <h3>1. Name of the Society</h3>
      <Form.Group className="mb-5 mt-4 mt-4 w-96" controlId="societyName">
        <Form.Control
          type="text"
          name="societyName"
          value={values.societyName}
          onChange={handleChange}
          placeholder="Name of the Society"
          isInvalid={touched.societyName && !!errors.societyName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.societyName}
        </Form.Control.Feedback>
      </Form.Group>

      <h3>2. Aims and Objectives</h3>
      <Form.Group className="mb-5 mt-4" controlId="aims">
        <Form.Control
          as="textarea"
          rows={4}
          name="aims"
          value={values.aims}
          onChange={handleChange}
          isInvalid={touched.aims && !!errors.aims}
        />
        <Form.Control.Feedback type="invalid">
          {errors.aims}
        </Form.Control.Feedback>
      </Form.Group>
    </div>

  );
}

export default SocietyInfo;
