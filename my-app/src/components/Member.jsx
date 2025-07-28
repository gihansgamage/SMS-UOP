import { FieldArray } from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';

export default function Member({ values, handleChange, errors, touched }) {
  return (
    <div className="mb-5 mt-4">
      <h3>7. List of Registered Members</h3>

      <FieldArray name="member">
        {({ push, remove }) => (
          <>
            {values.member.map((member, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col md={1}>
                  <span>{index + 1}.</span>
                </Col>

                <Col md={5}>
                  <Form.Control
                    type="text"
                    name={`member[${index}].regNo`}
                    placeholder="Registration No"
                    value={member.regNo}
                    onChange={handleChange}
                    isInvalid={
                      touched.member?.[index]?.regNo &&
                      !!errors.member?.[index]?.regNo
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.member?.[index]?.regNo}
                  </Form.Control.Feedback>
                </Col>

                <Col md={5}>
                  <Form.Control
                    type="text"
                    name={`member[${index}].name`}
                    placeholder="Name"
                    value={member.name}
                    onChange={handleChange}
                    isInvalid={
                      touched.member?.[index]?.name &&
                      !!errors.member?.[index]?.name
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.member?.[index]?.name}
                  </Form.Control.Feedback>
                </Col>

                <Col md={1}>
                  <Button variant="danger" onClick={() => remove(index)}>
                    -
                  </Button>
                </Col>
              </Row>
            ))}

            <Button
              variant="secondary"
              onClick={() => push({ regNo: '', name: '' })}
            >
              + Add Member
            </Button>
          </>
        )}
      </FieldArray>
    </div>
  );
}
