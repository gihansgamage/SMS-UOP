import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminData, setAdminData] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/adminlogin');
      return;
    }

    validateAndLoadData(token);
  }, [navigate]);

  const validateAndLoadData = async (token) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/validate-token', {
        token: token
      });

      if (!response.data.valid) {
        localStorage.removeItem('token');
        navigate('/adminlogin');
        return;
      }

      await loadDashboard();
      setLoading(false);
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      navigate('/adminlogin');
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  };

  const loadDashboard = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/dashboard', getAuthHeaders());
      setAdminData(response.data);
    } catch (error) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    }
  };

  const loadActivityLogs = async (page = 0) => {
    try {
      const response = await axios.get(
          `http://localhost:8080/api/admin/activity-logs?page=${page}&size=20`,
          getAuthHeaders()
      );
      setActivityLogs(response.data.logs);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to load activity logs');
      console.error('Activity logs error:', error);
    }
  };

  const loadAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/all-admins', getAuthHeaders());
      setAdmins(response.data.admins);
    } catch (error) {
      setError('Failed to load admins');
      console.error('Admins error:', error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');

    if (tab === 'logs') {
      loadActivityLogs(0);
    } else if (tab === 'admins') {
      loadAdmins();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/adminlogin');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      loadActivityLogs(newPage);
    }
  };

  if (loading) {
    return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          Loading...
        </div>
    );
  }

  return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0 }}>Admin Panel</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Welcome, {adminData?.name}</span>
            <button
                onClick={handleLogout}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav style={{
          backgroundColor: '#34495e',
          padding: '0 2rem',
          display: 'flex',
          gap: '1rem'
        }}>
          {['dashboard', 'logs', 'admins'].map(tab => (
              <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: activeTab === tab ? '#3498db' : 'transparent',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
              >
                {tab === 'logs' ? 'Activity Logs' : tab}
              </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ padding: '2rem' }}>
          {error && (
              <div style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1rem',
                border: '1px solid #ffcdd2'
              }}>
                {error}
              </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
              <div>
                <h2>Dashboard</h2>
                <div style={{
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
                    Welcome to the Admin Panel!
                  </p>
                  <p><strong>Logged in as:</strong> {adminData?.email}</p>
                  <p><strong>Access Level:</strong> Administrator</p>
                  <p><strong>Last Login:</strong> {formatDate(new Date())}</p>
                </div>
              </div>
          )}

          {/* Activity Logs Tab */}
          {activeTab === 'logs' && (
              <div>
                <h2>Activity Logs</h2>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Admin</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Activity</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Details</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Timestamp</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>IP Address</th>
                      </tr>
                      </thead>
                      <tbody>
                      {activityLogs.map((log, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                            <td style={{ padding: '1rem' }}>{log.adminEmail}</td>
                            <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: getActivityColor(log.activity),
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}>
                            {log.activity}
                          </span>
                            </td>
                            <td style={{ padding: '1rem' }}>{log.details}</td>
                            <td style={{ padding: '1rem' }}>{formatDate(log.timestamp)}</td>
                            <td style={{ padding: '1rem' }}>{log.ipAddress}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div style={{
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderTop: '1px solid #dee2e6'
                  }}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: currentPage === 0 ? '#ccc' : '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: currentPage === 0 ? 'not-allowed' : 'pointer'
                        }}
                    >
                      Previous
                    </button>
                    <span style={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                  Page {currentPage + 1} of {totalPages}
                </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: currentPage >= totalPages - 1 ? '#ccc' : '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer'
                        }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
          )}

          {/* Admins Tab */}
          {activeTab === 'admins' && (
              <div>
                <h2>Admin Management</h2>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                      <tr style={{ backgroundColor: '#f8f9fa' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Created</th>
                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Last Login</th>
                      </tr>
                      </thead>
                      <tbody>
                      {admins.map((admin, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                            <td style={{ padding: '1rem' }}>{admin.name}</td>
                            <td style={{ padding: '1rem' }}>{admin.email}</td>
                            <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            backgroundColor: admin.isActive ? '#27ae60' : '#e74c3c',
                            color: 'white',
                            borderRadius: '4px',
                            fontSize: '0.8rem'
                          }}>
                            {admin.isActive ? 'Active' : 'Inactive'}
                          </span>
                            </td>
                            <td style={{ padding: '1rem' }}>{formatDate(admin.createdAt)}</td>
                            <td style={{ padding: '1rem' }}>
                              {admin.lastLogin ? formatDate(admin.lastLogin) : 'Never'}
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          )}
        </main>
      </div>
  );
}

function getActivityColor(activity) {
  switch (activity) {
    case 'LOGIN_SUCCESS':
      return '#27ae60';
    case 'DASHBOARD_ACCESS':
      return '#3498db';
    case 'ACTIVITY_LOGS_ACCESS':
      return '#9b59b6';
    case 'ADMIN_LIST_ACCESS':
      return '#f39c12';
    case 'UNAUTHORIZED_LOGIN_ATTEMPT':
      return '#e74c3c';
    default:
      return '#95a5a6';
  }
}