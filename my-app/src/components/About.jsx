import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';

function About() {
  return (

    <Container className="my-5">
    <h1 className="text-center">About Us</h1>
      <Accordion defaultActiveKey="0">
        {/* About Us */}
        <Accordion.Item eventKey="0">
          <Accordion.Header><h5>Mission</h5></Accordion.Header>
          <Accordion.Body>

            <p className="text-center">
              The Mission of the Student Services Division is to provide timely,
              accurate, and consistently accessible services to students through
              the effective use of existing facilities and resources.
            </p>
          </Accordion.Body>
        </Accordion.Item>

        {/* Services */}
        <Accordion.Item eventKey="1">
          <Accordion.Header><h5>Services</h5></Accordion.Header>
          <Accordion.Body>
            <ul className=" list-dot">
              <li>Bursary</li>
              <li>Mahapola</li>
              <li>Student Union & Societies</li>
              <li>Staff Accommodation</li>
              <li>Medals & Prizes</li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Overview */}
        <Accordion.Item eventKey="2">
          <Accordion.Header><h5>Overview</h5></Accordion.Header>
          <Accordion.Body>


             <h3 className="text-center mb-3">The Services Provided</h3>
                        <p >
                          <li>Coordination of Mahapola Scholarship payments.</li>
                          <li> Processing and payment of Bursaries to the Students.</li>
                          <li>Coordination and processing of scholarships and studentships for needy students.</li>
                          <li>Coordination of awarding Gold Medals, Prizes, and Scholarships for students at the Convocation.</li>
                          <li>Coordination of awarding scholarships, prizes, and medals for meritorious performance.</li>
                          <li>Annual registration and renewal of Student Societies.</li>
                          <li>Issuing concessional season tickets for buses and trains.</li>
                          <li> Providing accommodation for temporary academic staff members.</li>
                          <li>Assist in the appointment of wardens and student welfare officers.</li>
                          <li>Coordination of academic and cultural activities with student participation.</li>
                          <li>Assist in the process of appointing Proctors and Student Counsellors.</li>
                          <li>Coordination for the appointment of the Arts Council.</li>
                          <li>Organization of the Annual Drama Festival.</li>
                          <li>Coordination of Career Guidance Advisory Committee meetings.</li>
                          <li>Coordination work for the Student Support Services and Welfare Systems.</li>
                          <li>Coordination and processing of student union elections.</li>
                          <li>Assisting Needy Student Programs.</li>
                        </p>

              <h3 className="text-center mb-3">Committees & Coordination</h3>
                         <p>
                         <li>Student Support System and Welfare Advisory Committee</li>
                         <li>Career Guidance Advisory Committee</li>
                         <li>Arts Council</li>
                         <li>Scholarships Sub-Committee</li>
                         <li>COVID-19 Management Committee</li>
                         <li>Rag Prevention Committee</li>
                         <li>Wardens and Sub-Wardens Committee</li>
                         <li>Proctor and Deputy Proctors Committee</li>
                         <li>Senior Student Counsellors Committee</li>
                         <li>Peradeniya University Student Union (PSU) Meetings</li>

                         </p>
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </Container>
  );
}

export default About;
