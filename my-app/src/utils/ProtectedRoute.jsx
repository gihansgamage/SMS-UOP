"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { ApplicantContext } from "../context/ApplicantContext"

function ProtectedRoute({ children }) {
    const { applicant } = useContext(ApplicantContext)

    // Check if applicant data exists (user has gone through registration login)
    const hasApplicantData = applicant && (applicant.email || applicant.firstName)

    if (!hasApplicantData) {
        // Redirect to registration login if no applicant data
        return <Navigate to="/registrationlogin" replace />
    }

    return children
}

export default ProtectedRoute
