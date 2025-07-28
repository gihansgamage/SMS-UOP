import { FieldArray } from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';

export default function AdvisoryBoard({ values, handleChange, errors, touched }) {
  return (
    <div>
      <h3>4. Advisory Board Members</h3>

      <FieldArray name="advisoryBoard">
        {({ push, remove }) => (
          <>
            {values.advisoryBoard.map((member, index) => (
              <Row key={index} className="mb-5 mt-4">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    name={`advisoryBoard[${index}].name`}
                    placeholder="Name"
                    value={member.name}
                    onChange={handleChange}
                    isInvalid={
                      touched.advisoryBoard?.[index]?.name &&
                      !!errors.advisoryBoard?.[index]?.name
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.advisoryBoard?.[index]?.name}
                  </Form.Control.Feedback>
                </Col>

                <Col md={4}>
                  <Form.Control
                    type="text"
                    name={`advisoryBoard[${index}].designation`}
                    placeholder="Designation"
                    value={member.designation}
                    onChange={handleChange}
                    isInvalid={
                      touched.advisoryBoard?.[index]?.designation &&
                      !!errors.advisoryBoard?.[index]?.designation
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.advisoryBoard?.[index]?.designation}
                  </Form.Control.Feedback>
                </Col>

                <Col md={3}>
                  <Form.Control
                    type="text"
                    name={`advisoryBoard[${index}].department`}
                    placeholder="Department"
                    value={member.department}
                    onChange={handleChange}
                    isInvalid={
                      touched.advisoryBoard?.[index]?.department &&
                      !!errors.advisoryBoard?.[index]?.department
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.advisoryBoard?.[index]?.department}
                  </Form.Control.Feedback>
                </Col>

                <Col md={1}>
                  <Button variant="danger" onClick={() => remove(index)}>-</Button>
                </Col>
              </Row>
            ))}
            <Button variant="secondary" onClick={() => push({ name: '', designation: '', department: '' })}>
              + Add Member
            </Button>
          </>
        )}
      </FieldArray>
    </div>
  );
}
