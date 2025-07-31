// ...imports remain unchanged
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
      const response = await axios.post('http://localhost:8080/api/auth/validate-token', { token });
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
    }
  };

  const loadAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/all-admins', getAuthHeaders());
      setAdmins(response.data.admins);
    } catch (error) {
      setError('Failed to load admins');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
    if (tab === 'logs') loadActivityLogs(0);
    else if (tab === 'admins') loadAdmins();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/adminlogin');
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      loadActivityLogs(newPage);
    }
  };

  const baseCardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2rem',
    color: 'white',
    boxShadow: '0 0 15px rgba(0,255,255,0.2)'
  };

  if (loading) {
    return (
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          height: '100vh', backgroundColor: '#0f111a', color: '#00fff7'
        }}>
          Loading futuristic interface...
        </div>
    );
  }

  return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)', color: 'white' }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#11141a',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1f2a38'
        }}>
          <h1 style={{ margin: 0, color: '#00fff7', letterSpacing: '1px' }}>⚡ Admin Console</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 'lighter', fontSize: '1rem' }}>Hello, {adminData?.name}</span>
            <button onClick={handleLogout} style={{
              padding: '0.5rem 1rem',
              background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Logout
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav style={{
          background: '#151b27',
          display: 'flex',
          gap: '2rem',
          padding: '1rem 2rem',
          borderBottom: '1px solid #2b3a50'
        }}>
          {['dashboard', 'logs', 'admins'].map(tab => (
              <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  style={{
                    background: activeTab === tab ? 'linear-gradient(to right, #00f260, #0575e6)' : 'transparent',
                    color: activeTab === tab ? 'white' : '#b0c4de',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: '0.3s'
                  }}
              >
                {tab === 'logs' ? 'Activity Logs' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ padding: '2rem' }}>
          {error && (
              <div style={{
                backgroundColor: '#ff4e50',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {error}
              </div>
          )}

          {activeTab === 'dashboard' && (
              <section>
                <h2 style={{ marginBottom: '1rem' }}>Dashboard Overview</h2>
                <div style={baseCardStyle}>
                  <p>🚀 Welcome to the futuristic admin dashboard.</p>
                  <p><strong>Email:</strong> {adminData?.email}</p>
                  <p><strong>Access:</strong> Administrator</p>
                  <p><strong>Last Login:</strong> {formatDate(new Date())}</p>
                </div>
              </section>
          )}

          {activeTab === 'logs' && (
              <section>
                <h2 style={{ marginBottom: '1rem' }}>Recent Activity Logs</h2>
                <div style={baseCardStyle}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                      <thead>
                      <tr style={{ backgroundColor: '#1c2636' }}>
                        <th style={tableHeadCell}>Admin</th>
                        <th style={tableHeadCell}>Activity</th>
                        <th style={tableHeadCell}>Details</th>
                        <th style={tableHeadCell}>Timestamp</th>
                        <th style={tableHeadCell}>IP</th>
                      </tr>
                      </thead>
                      <tbody>
                      {activityLogs.map((log, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #2a3b4d' }}>
                            <td style={tableBodyCell}>{log.adminEmail}</td>
                            <td style={tableBodyCell}>
                          <span style={{
                            background: getActivityColor(log.activity),
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: 'white'
                          }}>{log.activity}</span>
                            </td>
                            <td style={tableBodyCell}>{log.details}</td>
                            <td style={tableBodyCell}>{formatDate(log.timestamp)}</td>
                            <td style={tableBodyCell}>{log.ipAddress}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} style={paginationBtn}>
                      ◀ Prev
                    </button>
                    <span style={{ margin: '0 1rem' }}>Page {currentPage + 1} / {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} style={paginationBtn}>
                      Next ▶
                    </button>
                  </div>
                </div>
              </section>
          )}

          {activeTab === 'admins' && (
              <section>
                <h2 style={{ marginBottom: '1rem' }}>Admin Users</h2>
                <div style={baseCardStyle}>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                      <thead>
                      <tr style={{ backgroundColor: '#1c2636' }}>
                        <th style={tableHeadCell}>Name</th>
                        <th style={tableHeadCell}>Email</th>
                        <th style={tableHeadCell}>Status</th>
                        <th style={tableHeadCell}>Created</th>
                        <th style={tableHeadCell}>Last Login</th>
                      </tr>
                      </thead>
                      <tbody>
                      {admins.map((admin, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #2a3b4d' }}>
                            <td style={tableBodyCell}>{admin.name}</td>
                            <td style={tableBodyCell}>{admin.email}</td>
                            <td style={tableBodyCell}>
                          <span style={{
                            background: admin.isActive ? '#00c853' : '#d50000',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            color: 'white'
                          }}>{admin.isActive ? 'Active' : 'Inactive'}</span>
                            </td>
                            <td style={tableBodyCell}>{formatDate(admin.createdAt)}</td>
                            <td style={tableBodyCell}>{admin.lastLogin ? formatDate(admin.lastLogin) : 'Never'}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
          )}
        </main>
      </div>
  );
}

// Styles used inside the component
const tableHeadCell = {
  padding: '1rem',
  textAlign: 'left',
  color: '#00fff7',
  fontWeight: 'bold'
};

const tableBodyCell = {
  padding: '1rem',
  textAlign: 'left'
};

const paginationBtn = {
  background: 'linear-gradient(45deg, #00f2fe, #4facfe)',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '6px',
  color: 'white',
  cursor: 'pointer',
  margin: '0 0.5rem'
};

// Activity badge colors
function getActivityColor(activity) {
  switch (activity) {
    case 'LOGIN_SUCCESS': return '#00c853';
    case 'DASHBOARD_ACCESS': return '#039be5';
    case 'ACTIVITY_LOGS_ACCESS': return '#9c27b0';
    case 'ADMIN_LIST_ACCESS': return '#ff9100';
    case 'UNAUTHORIZED_LOGIN_ATTEMPT': return '#d50000';
    default: return '#757575';
  }
}
