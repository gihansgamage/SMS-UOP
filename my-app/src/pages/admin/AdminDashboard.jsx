"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminNav from "../../components/admin/AdminNav"

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("adminToken")
            if (!token) {
                navigate("/adminlogin")
                return
            }

            const response = await fetch("http://localhost:8080/api/admin/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })

            if (response.status === 401) {
                localStorage.removeItem("adminToken")
                navigate("/adminlogin")
                return
            }

            if (!response.ok) {
                throw new Error("Failed to fetch dashboard data")
            }

            const data = await response.json()
            setDashboardData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <AdminNav />
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading dashboard...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <AdminNav />
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-600">Error: {error}</div>
                </div>
            </div>
        )
    }

    const getAdminTypeDisplay = (type) => {
        switch (type) {
            case "VICE_CHANCELLOR":
                return "Vice Chancellor"
            case "FACULTY_DEAN":
                return "Faculty Dean"
            case "ASSISTANT_REGISTRAR":
                return "Assistant Registrar"
            case "SSD_ADMIN":
                return "SSD Admin"
            case "SUPER_ADMIN":
                return "Super Admin"
            default:
                return type
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNav />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="bg-white shadow rounded-lg mb-6">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Hi, Welcome, {dashboardData.name}</p>
                            <p>Role: {getAdminTypeDisplay(dashboardData.type)}</p>
                            {dashboardData.faculty && <p>Faculty: {dashboardData.faculty}</p>}
                            {dashboardData.lastLogin && <p>Last Login: {new Date(dashboardData.lastLogin).toLocaleString()}</p>}
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    {/* Society Statistics */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">S</span>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Societies</dt>
                                        <dd className="text-lg font-medium text-gray-900">{dashboardData.pendingSocietyCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">✓</span>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Approved Societies</dt>
                                        <dd className="text-lg font-medium text-gray-900">{dashboardData.approvedSocietyCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Renewal Statistics */}
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">R</span>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Pending Renewals</dt>
                                        <dd className="text-lg font-medium text-gray-900">{dashboardData.pendingRenewalCount}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Permission Statistics (for Assistant Registrar and SSD Admin) */}
                    {(dashboardData.type === "ASSISTANT_REGISTRAR" || dashboardData.type === "SSD_ADMIN") && (
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">P</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Pending Permissions</dt>
                                            <dd className="text-lg font-medium text-gray-900">{dashboardData.pendingPermissionCount}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate("/admin/pending-societies")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Review Pending Societies
                            </button>

                            <button
                                onClick={() => navigate("/admin/pending-renewals")}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Review Pending Renewals
                            </button>

                            {(dashboardData.type === "ASSISTANT_REGISTRAR" || dashboardData.type === "SSD_ADMIN") && (
                                <button
                                    onClick={() => navigate("/admin/pending-permissions")}
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Review Event Permissions
                                </button>
                            )}

                            <button
                                onClick={() => navigate("/admin/activity-logs")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                View Activity Logs
                            </button>

                            <button
                                onClick={() => navigate("/admin/all-societies")}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                View All Societies
                            </button>

                            {(dashboardData.type === "ASSISTANT_REGISTRAR" || dashboardData.type === "SSD_ADMIN") && (
                                <button
                                    onClick={() => navigate("/admin/communication-center")}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Communication Center
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
