import React from 'react';

const SecretaryCertification = () => {
  return (
    <div style={{ marginTop: '50px', textAlign: 'justify' , fontSize: '16px' }}>
      <p>
        I do hereby certify that the particulars given above are true and accurate and pleased
        to submit the statements of Income and Expenditure for the kind perusal.
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', padding: '0 80px' }}>
        <div style={{ textAlign: 'center' }}>
          <p>....................................................</p>
          <p>Date</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>....................................................</p>
          <p>Signature of Secretary</p>
        </div>
      </div>
    </div>
  );
};

export default SecretaryCertification;
