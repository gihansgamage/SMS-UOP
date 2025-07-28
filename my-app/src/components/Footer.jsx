import React from 'react';

const Footer = () => {
  return (
      <footer
          style={{
            background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B22222 100%)',
            color: 'white',
            marginTop: 'auto',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.15)'
          }}
      >
        {/* Main Footer Content */}
        <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '3rem 20px 1rem'
            }}
        >
          <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
              }}
          >
            {/* University Information */}
            <div style={{ textAlign: 'left' }}>
              <h5
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
              >
                🏛️ Student Services Division
              </h5>
              <p
                  style={{
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                    opacity: '0.95'
                  }}
              >
                <strong>University of Peradeniya</strong><br />
                PO. Box 20400, Peradeniya, Sri Lanka
              </p>
            </div>

            {/* Contact Information */}
            <div style={{ textAlign: 'left' }}>
              <h6
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
              >
                📞 Contact Information
              </h6>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.8', opacity: '0.95' }}>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📱</span>
                  <span><strong>Phone:</strong> +94 81 239 2431 | +94 81 239 2322</span>
                </p>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📞</span>
                  <span><strong>Ext.:</strong> 2431 / 2322</span>
                </p>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✉️</span>
                  <span><strong>Email:</strong> chandukanr@gmail.com</span>
                </p>
                <p style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🏢</span>
                  <span>drsspdn@gmail.com (Office)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '1.5rem',
                marginBottom: '1.5rem'
              }}
          >
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem'
                }}
            >
              <a
                  href="/privacy"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
              >
                🔒 Privacy Policy
              </a>

              <a
                  href="/terms"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
              >
                📜 Terms of Service
              </a>

              <a
                  href="/contact"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    fontWeight: '500',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    transition: 'all 0.3s ease',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.transform = 'translateY(0)';
                  }}
              >
                📧 Contact Us
              </a>
            </div>
          </div>

          {/* Copyright Section */}
          <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.2)',
                paddingTop: '1.5rem',
                textAlign: 'center'
              }}
          >
            <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
            >
              <p
                  style={{
                    margin: '0',
                    fontSize: '0.95rem',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    opacity: '0.9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
              >
                <span>©️</span>
                <span>{new Date().getFullYear()} Society Management System. All rights reserved.</span>
              </p>

              <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.9rem',
                    opacity: '0.8'
                  }}
              >
                <span>🚀</span>
                <span>Developed with ❤️ for University Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              width: '80px',
              height: '80px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              animation: 'pulse 4s ease-in-out infinite',
              pointerEvents: 'none'
            }}
        />

        <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center !important;
          }
          .footer-links {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            text-align: center !important;
          }
        }
        
        @media (max-width: 480px) {
          .footer-content {
            padding: 2rem 15px 1rem !important;
          }
          .footer-title {
            font-size: 1.2rem !important;
          }
          .footer-links a {
            font-size: 0.9rem !important;
            padding: 6px 12px !important;
          }
        }
      `}</style>
      </footer>
  );
};

export default Footer;