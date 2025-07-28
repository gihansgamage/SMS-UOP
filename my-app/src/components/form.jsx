import React, { useState } from 'react';
// import './styles.css';

const Form = () => {
  const [accepted, setAccepted] = useState(false);

  const acceptRegulations = () => {
    alert('Accepted regulations.');
    // Additional logic
  };

  const declineRegulations = () => {
    alert('Declined regulations.');
    // Additional logic
  };

  const scrollToForm = () => {
    document.getElementById("main-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCheckbox = (e) => {
    setAccepted(e.target.checked);
  };

  return (
    <div>
      {/* Regulations Modal */}
      <div id="regulationsModal" className="modal">
        <div className="modal-content">
          <h2>REGULATIONS FOR REGISTRATION AND RENEWAL OF STUDENT SOCIETIES (2024/2025)</h2>

          <div className="regulations-text">
            <h3>1. Establishment of a New Student Society</h3>
            <ol type="i">
              <li>Submit a request letter...</li>
              <li>Senior Treasurer and Advisory Board...</li>
              <li>Membership requirements:
                <ul>
                  <li>Subject-related societies: 25+ members</li>
                  <li>Non-subject societies: 40+ members</li>
                  <li>University-wide societies: 50+ members</li>
                </ul>
              </li>
              <li>Secretary and Junior Treasurer cannot be final-year students</li>
              <li>Membership restricted to internal students...</li>
              <li>Submit approved constitution... by 31.12.2024</li>
              <li>No late applications...</li>
            </ol>
          </div>

          <div className="acceptance-section">
            <div className="acceptance-section2">
              <input
                type="checkbox"
                id="acceptCheckbox"
                onChange={handleCheckbox}
              />
            </div>
            <span style={{ color: 'rgb(13, 94, 175)' }}>
              <strong>I have read and agree to comply with all regulations.</strong>
            </span>
            <div className="modal-buttons">
              <button className="btn secondary1" onClick={declineRegulations}>Reject</button>
              <button className="btn primary1" onClick={acceptRegulations} disabled={!accepted}>Accept</button>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Section */}
      <div className="container">
        <div className="office-use">
          <h1>Welcome to the <span>Society Management System</span> 🎉</h1>
          <p className="welcome-text">We appreciate your initiative...</p>

          <div className="motivation-box">
            <p><strong>"Leadership begins with a vision. Inspire. Organize. Achieve."</strong></p>
          </div>

          <h2>Regulations & Guidelines</h2>
          <ul className="guidelines">
            <li>Fill in <strong>accurate details</strong>...</li>
            <li>Submit a <strong>hard copy</strong>...</li>
            <li>Do <strong>not alter</strong>...</li>
            <li>Ensure the form is submitted <strong>in one attempt</strong>...</li>
            <li>This process adheres to <strong>University Regulations</strong>...</li>
          </ul>

          <div className="buttons">
            <button className="home-btn">Home</button>
            <button onClick={scrollToForm} className="get-started-btn">Get Started</button>
          </div>
        </div>

        {/* Add your main form JSX here */}
        <div id="main-form">
          {/* Include form fields here, structured using controlled inputs or useRef */}
        </div>

        {/* Action Buttons */}
        <div className="action-btns">
          <button className="btn secondary" onClick={() => alert("Step 1 Submitted")}>Step 1: Send for Approval</button>
          <button className="btn primary" onClick={() => alert("Download triggered")}>Step 2: Download Application</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
