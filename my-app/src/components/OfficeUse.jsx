import React, { useEffect, useState } from 'react';

const generateUniqueFileNumber = () => {
  // Check existing numbers in localStorage
  const existing = JSON.parse(localStorage.getItem("fileNumbers")) || [];
  let newNum;
  do {
    newNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
  } while (existing.includes(newNum));

  // Store it
  existing.push(newNum);
  localStorage.setItem("fileNumbers", JSON.stringify(existing));
  return `SS-${newNum}`;
};

const OfficeUse = () => {
  const [fileNumber, setFileNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    setIssueDate(new Date().toLocaleDateString('en-GB')); // Format: dd/mm/yyyy
    setFileNumber(generateUniqueFileNumber());
  }, []);

  return (
    <div style={{ fontFamily: 'Georgia, serif', margin: '30px', lineHeight: 1.6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', margin : '50px'}}>
        <div>
          <div>FOR OFFICE USE ONLY</div>
          <div>DATE OF ISSUE: {issueDate}</div>
        </div>
        <div>
          <div>FILE NUMBER: {fileNumber}</div>
          <div>DATE OF RECEIPT OF APPLICATION:</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '30px', fontWeight: 'bold' }}>
        <div style={{ fontSize: '18px' }}>APPLICATION FOR REGISTRATION OF STUDENT SOCIETY</div>
        <div style={{ fontSize: '18px' }}>FOR THE ACADEMIC YEAR - <b>2025/2026</b></div>
      </div>
    </div>
  );
};

export default OfficeUse;
