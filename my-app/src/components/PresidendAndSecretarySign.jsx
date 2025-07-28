import React from 'react';

const PresidentAndSecretarySign = () => {
  return (
    <div style={{ marginTop: '50px',  textAlign: 'justify' , fontSize: '16px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '60px', padding: '0 80px' }}>
        <div style={{ textAlign: 'center' }}>
          <p>....................................................</p>
          <p>Signature of President</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p>....................................................</p>
          <p>Signature of Secretary</p>
        </div>
      </div>
    </div>
  );
};

export default PresidentAndSecretarySign;
