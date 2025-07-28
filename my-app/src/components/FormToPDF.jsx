import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OfficeUse from './OfficeUse';
import SecretaryCertification from './SecretaryCertification';
import PresidentAndSecretarySign from './PresidendAndSecretarySign';
import SeniorTreasurerRecommendation from './SeniorTreasurerRecommendation';
import AdvisoryBoardRecommendation from './AdvisoryBoardRecommendation';
import DeanCertification from './DeanCertification';
import DeputyRegistrarApproval from './DeputyRegistrarApproval';
import ViceChancellorApproval from './ViceChancellorApproval';
import SecretarySignature from './SecretarySignature';

const FormToPDF = ({ values }) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    const input = previewRef.current;

    const canvas = await html2canvas(input, {
      scale: 1.5,
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
        <h2>Society Registration Application Preview</h2>
        <hr></hr>
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
                <div style={{ display: 'table-cell' }}>: {values.seniorTreaurerTitle} {values.seniorTreasurerFullName}</div>
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
            <br></br>
            <p><strong>7. Number of Members:</strong> {values.member?.length || 0}</p>
            <br></br>
            <p><strong>8. Please indicate the proposed programmes earmarked by the Society for the next year.</strong></p>
            <br></br>
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

            <br></br>
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

            <br></br>
            <br></br>

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

        <button className="btn btn-success mt-3" onClick={handleDownload}>
          Step 2 : Download Application
        </button>
      </div>
  );
};

export default FormToPDF;