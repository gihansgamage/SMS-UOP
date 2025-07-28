import { FieldArray } from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';

export default function CommitteeMember({ values, handleChange, errors, touched }) {
  return (
    <div className="mb-5 mt-4">
      <h3>6.7 Committee Members as per constitution of the society</h3>

      <FieldArray name="committeeMember">
        {({ push, remove }) => (
          <>
            {values.committeeMember.map((committeeMember, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col md={1}>
                  <span>{index + 1}.</span>
                </Col>

                <Col md={5}>
                  <Form.Control
                    type="text"
                    name={`committeeMember[${index}].regNo`}
                    placeholder="Registration No"
                    value={committeeMember.regNo}
                    onChange={handleChange}
                    isInvalid={
                      touched.committeeMember?.[index]?.regNo &&
                      !!errors.committeeMember?.[index]?.regNo
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.committeeMember?.[index]?.regNo}
                  </Form.Control.Feedback>
                </Col>

                <Col md={5}>
                  <Form.Control
                    type="text"
                    name={`committeeMember[${index}].name`}
                    placeholder="Name"
                    value={committeeMember.name}
                    onChange={handleChange}
                    isInvalid={
                      touched.committeeMember?.[index]?.name &&
                      !!errors.committeeMember?.[index]?.name
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.committeeMember?.[index]?.name}
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
