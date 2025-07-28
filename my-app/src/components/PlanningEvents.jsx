import { FieldArray } from 'formik';
import { Button, Form, Row, Col } from 'react-bootstrap';

export default function PlanningEvents({ values, handleChange, errors, touched }) {
    return (
        <div className="mb-5 mt-4">
            <h3>8. Planning Events</h3>

            <FieldArray name="planningEvents">
                {({ push, remove }) => (
                    <>
                        {values.planningEvents.map((event, index) => (
                            <Row key={index} className="mb-3 align-items-center">
                                <Col md={1}>
                                    <span>{index + 1}.</span>
                                </Col>

                                <Col md={4}>
                                    <Form.Control
                                        type="month" // <-- Only year and month
                                        name={`planningEvents[${index}].date`}
                                        value={event.date}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.planningEvents?.[index]?.date &&
                                            !!errors.planningEvents?.[index]?.date
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.planningEvents?.[index]?.date}
                                    </Form.Control.Feedback>
                                </Col>

                                <Col md={6}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Planned Activity"
                                        name={`planningEvents[${index}].activity`}
                                        value={event.activity}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.planningEvents?.[index]?.activity &&
                                            !!errors.planningEvents?.[index]?.activity
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.planningEvents?.[index]?.activity}
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
                            onClick={() => push({ date: '', activity: '' })}
                        >
                            + Add Event
                        </Button>
                    </>
                )}
            </FieldArray>
        </div>
    );
}
