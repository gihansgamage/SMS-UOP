import React, { createContext, useState } from 'react';

export const ApplicantContext = createContext();

export const ApplicantProvider = ({ children }) => {
  const [applicant, setApplicant] = useState({});

  return (
    <ApplicantContext.Provider value={{ applicant, setApplicant }}>
      {children}
    </ApplicantContext.Provider>
  );
};
