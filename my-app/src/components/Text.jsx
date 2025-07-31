// StudentServices.jsx
import React, { useState } from 'react';
import { Container, Tab, Tabs, Accordion, Card } from 'react-bootstrap';

const Text = () => {
  const [key, setKey] = useState('about');

  const divs ={
            background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 50%, #f1b0b7 100%)',
            borderBottom: '4px solid #dc3545',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '3rem 0',
            position: 'relative',
            overflow: 'hidden'


  }

  return (
    <Container  style={divs}>

        <h2 className="text-center mb-4">Student Services Division</h2>

              <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
                <Tab eventKey="about" title="About Us">
                  <p>
                    The Mission of the Student Services Division is to provide timely,
                    accurate, and consistently accessible services to students through
                    the effective use of existing facilities and resources.
                  </p>
                </Tab>

                <Tab eventKey="services" title="Services">
                  <Accordion defaultActiveKey="0">
                    {[
                      'Mahapola',
                      'Bursary',
                      'Student Union & Societies',
                      'Staff Accommodation',
                      'Medals & Prizes',
                    ].map((service, idx) => (
                      <Accordion.Item eventKey={idx.toString()} key={idx}>
                        <Accordion.Header>{service}</Accordion.Header>
                        <Accordion.Body>
                          <p>More details about <strong>{service}</strong> will be provided here.</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Tab>

                <Tab eventKey="functions" title="Functions">
                  <ul>
                    <li>Providing assistance and services to undergraduate students.</li>
                    <li>Coordination of Mahapola and other scholarships.</li>
                    <li>Student welfare and accommodation.</li>
                    <li>Career guidance, drama festivals, and cultural activities.</li>
                  </ul>
                </Tab>

                <Tab eventKey="committees" title="Committees">
                  <ul>
                    {[
                      'Student Support System and Welfare Advisory Committee',
                      'Career Guidance Advisory Committee',
                      'Arts Council',
                      'Scholarships Sub-Committee',
                      'COVID-19 Management Committee',
                      'Rag Prevention Committee',
                      'Wardens and Sub-Wardens Committee',
                      'Proctor and Deputy Proctors Committee',
                      'Senior Student Counsellors Committee',
                      'Peradeniya University Student Union (PSU) Meetings',
                    ].map((committee, i) => (
                      <li key={i}>{committee}</li>
                    ))}
                  </ul>
                </Tab>

                <Tab eventKey="beneficiaries" title="Beneficiaries">
                  <p>
                    Services are mainly provided to the entire student community and academic staff of the University.
                  </p>
                </Tab>
              </Tabs>


    </Container>
  );
};

export default Text;
