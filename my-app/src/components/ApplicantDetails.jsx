import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useContext } from 'react';
import { ApplicantContext } from '../context/ApplicantContext';


function ApplicantDetails() {
  const { Formik } = formik;
  const navigate = useNavigate(); // ✅ step 1
  const { setApplicant } = useContext(ApplicantContext);


  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    registration_no: yup
      .string()
      .required('Registration number is required')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, 'Must include letters and numbers'),
    mobile: yup
      .string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
    email: yup.string().email('Invalid email').required('Email is required'),
    terms: yup.bool().oneOf([true], 'Terms must be accepted').required(),
  });

  return (
    <div>
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: '',
        lastName: '',
        registration_no: '',
        mobile: '',
        email: '',
        terms: false,
      }}
      onSubmit={(values) => {
        console.log(values);
        navigate('/registration'); // ✅ step 2
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        
        <Form noValidate onSubmit={handleSubmit} className="p-4">
            <h3>Applicant Details</h3><br></br>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isInvalid={touched.firstName && !!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isInvalid={touched.lastName && !!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationFormik03">
              <Form.Label>Registration No</Form.Label>
              <Form.Control
                type="text"
                name="registration_no"
                value={values.registration_no}
                onChange={handleChange}
                isInvalid={touched.registration_no && !!errors.registration_no}
              />
              <Form.Control.Feedback type="invalid">
                {errors.registration_no}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik04">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                isInvalid={touched.mobile && !!errors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {errors.mobile}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationFormik05">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                isInvalid={touched.email && !!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <Form.Group controlId="validationFormik06">
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={touched.terms && !!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                />
              </Form.Group>
            </Col>

            <Col md={6} className="d-flex justify-content-end">
              <Button type="submit" className="mt-2">
                Next
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
    </div>
  );
}

export default ApplicantDetails;
