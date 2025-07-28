import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID = '362122343533-efnqdlu71jv3eulrmv9acuv1o0ctncnj.apps.googleusercontent.com'; // ✅ Replace with actual client ID

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) validateToken(token);
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/validate-token', { token });
      if (response.data.valid) navigate('/admin');
      else localStorage.removeItem('token');
    } catch (error) {
      localStorage.removeItem('token');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/auth/google-login', {
        token: credentialResponse.credential,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
      } else {
        setError(response.data.message || 'Login failed. Not an admin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div style={styles.wrapper}>
        <div style={styles.container}>
          <h2 style={styles.title}>Admin Login</h2>
          <p style={styles.subtitle}>Please sign in with your authorized Google account</p>

          {error && <div style={styles.error}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap={false}
              theme="outline"
              size="large"
              width="100%"
            />
          </div>

          {loading && <div style={styles.loading}>Authenticating...</div>}

          <div style={styles.note}>
            <strong>Note:</strong> Only authorized administrators can access this panel. If you don't have access,
            please contact your system administrator.
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  container: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#666',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    border: '1px solid #ffcdd2',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem',
  },
  note: {
    marginTop: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#666',
  },
};
