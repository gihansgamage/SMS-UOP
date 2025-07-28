import { Formik, FieldArray } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SocietyInfo from '../components/SocietyInfo';
import SeniorTreasurer from '../components/seniorTreasurer';
import AdvisoryBoard from '../components/Advisoryboard';
import BankDetails from '../components/BankDetails';
import President from '../components/President';
import VicePresident from '../components/VicePresident';
import Secretary from '../components/Secretary';
import JuniorTreasurer from '../components/JuniorTreasurer';
import JointSecretary from '../components/JointSecretary';
import Editor from '../components/Editor';
import Member from '../components/Member';
import CommitteeMember from '../components/CommitteeMember';
import AGMDate from '../components/AGMDate';
import PlanningEvents from '../components/PlanningEvents';
import PageHeader from '../components/pageHeader';
import Instruction from '../components/Instruction';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../components/MyNavbar';
import Image from 'react-bootstrap/Image';
import { useContext, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { ApplicantContext } from '../context/ApplicantContext';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OfficeUse from '../components/OfficeUse';
import SecretaryCertification from '../components/SecretaryCertification';
import PresidentAndSecretarySign from '../components/PresidendAndSecretarySign';
import SeniorTreasurerRecommendation from '../components/SeniorTreasurerRecommendation';
import AdvisoryBoardRecommendation from '../components/AdvisoryBoardRecommendation';
import DeanCertification from '../components/DeanCertification';
import DeputyRegistrarApproval from '../components/DeputyRegistrarApproval';
import ViceChancellorApproval from '../components/ViceChancellorApproval';
import SecretarySignature from '../components/SecretarySignature';
import DeadlineDisplay from "../components/DeadlineDisplay.jsx";

// FormToPDF Component with forwardRef
const FormToPDF = forwardRef(({ values }, ref) => {
    const previewRef = useRef();

    const handleDownload = async () => {
        const input = previewRef.current;

        const canvas = await html2canvas(input, {
            scale: 1,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('application_form.pdf');
    };

    // Expose handleDownload method to parent component
    useImperativeHandle(ref, () => ({
        handleDownload
    }));

    const renderOfficer = (title, valuesMap) => (
        <>
            <p><strong>{title}</strong></p>
            <div style={{ display: 'table', marginBottom: '20px' }}>
                {Object.entries(valuesMap).map(([label, value]) => (
                    <div style={{ display: 'table-row' }} key={label}>
                        <div style={{ display: 'table-cell', paddingRight: '20px', minWidth: '160px' }}>{label}</div>
                        <div style={{ display: 'table-cell' }}>: {value}</div>
                    </div>
                ))}
            </div>
        </>
    );

    return (
        <div>

            <div
                ref={previewRef}
                style={{
                    padding: 50,
                    background: '#ffffff',
                    color: '#000',
                }}
            >
                <OfficeUse />
                <div style={{ margin: '80px', lineHeight: 1.6, fontSize: '16px' }}>
                    <p><strong>1. Name of the Society :</strong> {values.societyName}</p><br />
                    <p><strong>2. Aims and objective of the society :</strong> {values.aims}</p><br />

                    <p><strong>3. Senior Treasurer</strong></p>
                    <div style={{ display: 'table', marginBottom: '20px' }}>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell', paddingRight: '20px', minWidth: '160px' }}>Full Name</div>
                            <div style={{ display: 'table-cell' }}>: {values.seniorTreasurerTitle} {values.seniorTreasurerFullName}</div>
                        </div>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell' }}>Designation</div>
                            <div style={{ display: 'table-cell' }}>: {values.seniorTreasurerDesignation}</div>
                        </div>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell' }}>Department</div>
                            <div style={{ display: 'table-cell' }}>: {values.seniorTreasurerDepartment}</div>
                        </div>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell' }}>Email</div>
                            <div style={{ display: 'table-cell' }}>: {values.seniorTreasurerEmail}</div>
                        </div>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell' }}>Tel No</div>
                            <div style={{ display: 'table-cell' }}>: {values.seniorTreasurerMobile}</div>
                        </div>
                    </div>

                    <p><strong>4. Member of Advisory Board</strong></p>
                    <table className="table table-bordered table-sm mt-2">
                        <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Department</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.advisoryBoard?.map((member, i) => (
                            <tr key={i}>
                                <td>{member.name}</td>
                                <td>{member.designation}</td>
                                <td>{member.department}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <br />
                    <p><strong>5. Bank Account Details</strong></p>
                    <div style={{ display: 'table', marginBottom: '20px' }}>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell', paddingRight: '20px', minWidth: '160px' }}>Name of Bank</div>
                            <div style={{ display: 'table-cell' }}>: {values.bankAccount}</div>
                        </div>
                        <div style={{ display: 'table-row' }}>
                            <div style={{ display: 'table-cell' }}>Account No</div>
                            <div style={{ display: 'table-cell' }}>: {values.bankName}</div>
                        </div>
                    </div>

                    <p><strong>6.1 Office Bearers</strong></p><br />
                    {renderOfficer('President', {
                        'Student Reg No': values.presidentRegNo,
                        'Name': values.presidentName,
                        'Permanent Address': values.presidentAddress,
                        'Email': values.presidentEmail,
                        'Tel No': values.presidentMobile,
                        'Signature': ''
                    })}

                    {renderOfficer('Vice President', {
                        'Student Reg No': values.VicePresidentRegNo,
                        'Name': values.VicePresidentName,
                        'Permanent Address': values.VicePresidentAddress,
                        'Email': values.VicePresidentEmail,
                        'Tel No': values.VicePresidentMobile,
                        'Signature': ''
                    })}

                    {renderOfficer('Junior Treasurer', {
                        'Student Reg No': values.juniorTreasurerRegNo,
                        'Name': values.juniorTreasurerName,
                        'Permanent Address': values.juniorTreasurerAddress,
                        'Email': values.juniorTreasurerEmail,
                        'Tel No': values.juniorTreasurerMobile,
                        'Signature': ''
                    })}

                    {renderOfficer('Secretary', {
                        'Student Reg No': values.secretaryRegNo,
                        'Name': values.secretaryName,
                        'Permanent Address': values.secretaryAddress,
                        'Email': values.secretaryEmail,
                        'Tel No': values.secretaryMobile,
                        'Signature': ''
                    })}

                    {renderOfficer('Joint Secretary', {
                        'Student Reg No': values.jointSecretaryRegNo,
                        'Name': values.jointSecretaryName,
                        'Permanent Address': values.jointSecretaryAddress,
                        'Email': values.jointSecretaryEmail,
                        'Tel No': values.jointSecretaryMobile,
                        'Signature': ''
                    })}

                    {renderOfficer('Editor', {
                        'Student Reg No': values.editorRegNo,
                        'Name': values.editorName,
                        'Permanent Address': values.editorAddress,
                        'Email': values.editorEmail,
                        'Tel No': values.editorMobile,
                        'Signature': ''
                    })}

                    <br />
                    <p><strong>6.2 Committee Members as per constitution of the society</strong></p>
                    <table className="table table-bordered table-sm mt-2" style={{ width: '100%' }}>
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: '30%' }}>Student Reg No</th>
                            <th style={{ width: '40%' }}>Name</th>
                            <th style={{ width: '30%' }}>Signature</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.committeeMember?.map((member, i) => (
                            <tr key={i}>
                                <td>{member.regNo}</td>
                                <td>{member.name}</td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <p><strong>6.3 Date of the Annual General Meeting held:</strong> {values.agmDate}</p>
                    <br />
                    <p><strong>7. Number of Members:</strong> {values.member?.length || 0}</p>
                    <br />
                    <p><strong>8. Please indicate the proposed programmes earmarked by the Society for the next year.</strong></p>
                    <br />
                    <table className="table table-bordered table-sm mt-2" style={{ width: '100%' }}>
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '30%' }}>Month</th>
                            <th style={{ width: '65%' }}>Activity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.planningEvents?.map((event, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{event.date}</td>
                                <td>{event.activity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <br />
                    <p><strong>List of Registered Members</strong></p>
                    <table className="table table-bordered table-sm mt-2" style={{ width: '100%' }}>
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '25%' }}>Student Reg No</th>
                            <th style={{ width: '45%' }}>Name</th>
                            <th style={{ width: '25%' }}>Signature</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.member?.map((m, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{m.regNo}</td>
                                <td>{m.name}</td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <PresidentAndSecretarySign />
                    <SecretaryCertification />
                    <SeniorTreasurerRecommendation />
                    <AdvisoryBoardRecommendation />
                    <DeanCertification />
                    <DeputyRegistrarApproval />
                    <ViceChancellorApproval />

                    <br />
                    <br />

                    <p><strong>List of Registered Members</strong></p>
                    <table className="table table-bordered table-sm mt-2" style={{ width: '100%' }}>
                        <thead className="table-light">
                        <tr>
                            <th style={{ width: '5%' }}>#</th>
                            <th style={{ width: '25%' }}>Student Reg No</th>
                            <th style={{ width: '45%' }}>Name</th>
                            <th style={{ width: '25%' }}>Signature</th>
                        </tr>
                        </thead>
                        <tbody>
                        {values.member?.map((m, i) => (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{m.regNo}</td>
                                <td>{m.name}</td>
                                <td></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <SecretarySignature />
                </div>
            </div>
        </div>
    );
});

FormToPDF.displayName = 'FormToPDF';

// Validation Schema
const schema = yup.object().shape({
    // SocietyInfo validations
    societyName: yup.string().required('Society name is required'),
    aims: yup.string().required('Aims and objectives are required'),

    // seniorTreasurerForm validations
    seniorTreasurerTitle: yup.string().required('Title is required'),
    seniorTreasurerFullName: yup.string().required('Full name is required'),
    seniorTreasurerDesignation: yup.string().required('Designation is required'),
    seniorTreasurerDepartment: yup.string().required('Department is required'),
    seniorTreasurerEmail: yup.string().email('Invalid email').required('Email is required'),
    seniorTreasurerAddress: yup.string().required('Address is required'),
    seniorTreasurerMobile: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),

    // Advisory Board validations
    advisoryBoard: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Name is required'),
            designation: yup.string().required('Designation is required'),
            department: yup.string().required('Department is required'),
        })
    ),

    // BankDetails validations (optional)
    bankAccount: yup.string(),
    bankName: yup.string(),

    //President
    presidentRegNo: yup.string().required('Registration No is required'),
    presidentName: yup.string().required('Name is required'),
    presidentAddress: yup.string().required('Address is required'),
    presidentEmail: yup.string().email('Invalid email').required('Email is required'),
    presidentMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //VicePresident
    VicePresidentRegNo: yup.string().required('Registration No is required'),
    ViceVicePresidentName: yup.string().required('Name is required'),
    VicePresidentAddress: yup.string().required('Address is required'),
    VicePresidentEmail: yup.string().email('Invalid email').required('Email is required'),
    VicePresidentMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //juniorTreasurer
    juniorTreasurerRegNo: yup.string().required('Registration No is required'),
    juniorTreasurerName: yup.string().required('Name is required'),
    juniorTreasurerAddress: yup.string().required('Address is required'),
    juniorTreasurerEmail: yup.string().email('Invalid email').required('Email is required'),
    juniorTreasurerMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //Secretary
    secretaryRegNo: yup.string().required('Registration No is required'),
    secretaryName: yup.string().required('Name is required'),
    secretaryAddress: yup.string().required('Address is required'),
    secretaryEmail: yup.string().email('Invalid email').required('Email is required'),
    secretaryMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //JointSecretary
    jointSecretaryRegNo: yup.string().required('Registration No is required'),
    jointSecretaryName: yup.string().required('Name is required'),
    jointSecretaryAddress: yup.string().required('Address is required'),
    jointSecretaryEmail: yup.string().email('Invalid email').required('Email is required'),
    jointSecretaryMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //Editor
    editorRegNo: yup.string().required('Registration No is required'),
    editorName: yup.string().required('Name is required'),
    editorAddress: yup.string().required('Address is required'),
    editorEmail: yup.string().email('Invalid email').required('Email is required'),
    editorMobile: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),

    //CommitteeMembers
    committeeMember: yup.array().of(
        yup.object().shape({
            regNo: yup.string().required('Registration No is required'),
            name: yup.string().required('Name is required'),
        })
    ),

    //Members
    member: yup.array().of(
        yup.object().shape({
            regNo: yup.string().required('Registration No is required'),
            name: yup.string().required('Name is required'),
        })
    ),

    //AGM
    agmDate: yup.string().required('AGM date is required'),

    //Planning events
    planningEvents: yup.array().of(
        yup.object().shape({
            date: yup.string().required('Date is required'),
            activity: yup.string().required('Planned activity is required'),
        })
    ),
});

// Main Registration Form Component
export default function RegistrationForm() {
    const { applicant } = useContext(ApplicantContext);
    const applicantEmail = applicant?.email;

    // State for modal
    const [showModal, setShowModal] = useState(false);
    const [currentFormValues, setCurrentFormValues] = useState(null);

    // Reference to the FormToPDF component for PDF download
    const formToPDFRef = useRef(null);

    const handleShowModal = (values) => {
        setCurrentFormValues(values);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentFormValues(null);
    };

    const handleSendForApproval = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/api/approvals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const result = await response.text();
            alert(result);

            // ✅ Send email to applicant
            if (applicantEmail) {
                await fetch('http://localhost:8080/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: applicantEmail,
                        subject: 'Application Received',
                        message: `Dear ${applicant.firstName},\n\nYour application has been sent for approval.\n\nThank you.`,
                    }),
                });
            }
        } catch (err) {
            console.error('Error:', err);
            alert('Failed to send for approval or send email.');
        }
    };

    return (
        <div>
            <MyNavbar />
            <div className='center-content'>


                <Instruction />
                <div className='center-content'>
                    <h2>APPLICATION FOR REGISTRATION OF STUDENT SOCIETY</h2>
                    <hr />
                </div>

                <Formik
                    validationSchema={schema}
                    initialValues={{
                        // SocietyInfo values
                        societyName: '',
                        aims: '',

                        // seniorTreasurerForm values
                        seniorTreasurerTitle: '',
                        seniorTreasurerFullName: '',
                        seniorTreasurerDesignation: '',
                        seniorTreasurerDepartment: '',
                        seniorTreasurerEmail: '',
                        seniorTreasurerAddress: '',
                        seniorTreasurerMobile: '',

                        // Advisory board initial value (one member)
                        advisoryBoard: [{ name: '', designation: '', department: '' }],

                        // Bank details (optional)
                        bankAccount: '',
                        bankName: '',

                        //President
                        presidentRegNo: '',
                        presidentName: '',
                        presidentAddress: '',
                        presidentEmail: '',
                        presidentMobile: '',

                        //VicePresident
                        VicePresidentRegNo: '',
                        VicePresidentName: '',
                        VicePresidentAddress: '',
                        VicePresidentEmail: '',
                        VicePresidentMobile: '',

                        //Junior Treasurer
                        juniorTreasurerRegNo: '',
                        juniorTreasurerName: '',
                        juniorTreasurerAddress: '',
                        juniorTreasurerEmail: '',
                        juniorTreasurerMobile: '',

                        //Secretary
                        secretaryRegNo: '',
                        secretaryName: '',
                        secretaryAddress: '',
                        secretaryEmail: '',
                        secretaryMobile: '',

                        //Joint Secretary
                        jointSecretaryRegNo: '',
                        jointSecretaryName: '',
                        jointSecretaryAddress: '',
                        jointSecretaryEmail: '',
                        jointSecretaryMobile: '',

                        //Editor
                        editorRegNo: '',
                        editorName: '',
                        editorAddress: '',
                        editorEmail: '',
                        editorMobile: '',

                        //CommitteeMembers
                        committeeMember: [{ regNo: '', name: '' }],

                        // AGM Date
                        agmDate: '',

                        //Members
                        member: [{ regNo: '', name: '' }],

                        //Planning Events
                        planningEvents: [{ date: '', activity: '' }],
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit} className="p-4">
                            <SocietyInfo
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <SeniorTreasurer
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <AdvisoryBoard
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <BankDetails
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <President
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <VicePresident
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <JuniorTreasurer
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <Secretary
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <JointSecretary
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <Editor
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <CommitteeMember
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <AGMDate
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <Member
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />

                            <PlanningEvents
                                values={values}
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                            />

                            <hr />
                            <DeadlineDisplay />
                            {/* Action Buttons - Only Preview Application Button */}
                            <div className="mt-5 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-info btn-lg"
                                    onClick={() => handleShowModal(values)}
                                >
                                    Next
                                </button>
                            </div>

                            <br />
                        </Form>
                    )}
                </Formik>

                {/* Hidden FormToPDF component for PDF generation */}
                <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                    {currentFormValues && <FormToPDF ref={formToPDFRef} values={currentFormValues} />}
                </div>

                {/* Modal for FormToPDF */}
                <Modal
                    show={showModal}
                    onHide={handleCloseModal}
                    size="xl"
                    centered
                    scrollable
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Society Registration Application Preview</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {currentFormValues && <FormToPDF values={currentFormValues} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        {currentFormValues && (
                            <>
                                <Button
                                    variant="primary"
                                    onClick={async () => {
                                        try {
                                            const response = await fetch('http://localhost:8080/api/approvals', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify(currentFormValues),
                                            });

                                            const result = await response.text();
                                            alert(result);

                                            // Send email to applicant
                                            if (applicantEmail) {
                                                await fetch('http://localhost:8080/api/send-email', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify({
                                                        to: applicantEmail,
                                                        subject: 'Application Received',
                                                        message: `Dear ${applicant.firstName},\n\nYour application has been sent for approval.\n\nThank you.`,
                                                    }),
                                                });
                                            }
                                            // Modal closes automatically after successful operation
                                        } catch (err) {
                                            console.error('Error:', err);
                                            alert('Failed to send for approval or send email.');
                                        }
                                    }}
                                >
                                    Step 1: Send for Approval
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={async () => {
                                        try {
                                            // Set current form values and wait for component to render
                                            setCurrentFormValues(currentFormValues);

                                            // Wait a bit for the component to render
                                            await new Promise(resolve => setTimeout(resolve, 200));

                                            if (formToPDFRef.current) {
                                                await formToPDFRef.current.handleDownload();
                                            }

                                            // Modal closes automatically after successful operation
                                        } catch (err) {
                                            console.error('Error generating PDF:', err);
                                            alert('Failed to generate PDF.');
                                        }
                                    }}
                                >
                                    Step 2: Download Application
                                </Button>
                            </>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}