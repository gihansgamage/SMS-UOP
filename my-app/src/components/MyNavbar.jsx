import React, { useState, useEffect } from "react";

function MyNavbar() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    // Update date and time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <nav
            style={{
                background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B22222 100%)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                position: 'sticky',
                top: '0',
                zIndex: '1000'
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        minHeight: '70px',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* Logo and Brand */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '1.3rem',
                            fontWeight: '600'
                        }}
                    >
                        <img
                            src="./pera_logo.png"
                            alt="Logo"
                            style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                border: '2px solid rgba(255,255,255,0.3)',
                                objectFit: 'cover'
                            }}
                        />
                        <span style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              Society Management System
            </span>
                    </div>

                    {/* Navigation Links */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2rem',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                gap: '2rem',
                                alignItems: 'center'
                            }}
                        >
                            <a
                                href="/"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                    position: 'relative',
                                    overflow: 'hidden'
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
                                🏠 Home
                            </a>

                            <a
                                href="#about"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
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
                                ℹ️ About Us
                            </a>

                            <a
                                href="#contact"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    transition: 'all 0.3s ease',
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
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
                                📞 Contact Us
                            </a>
                        </div>

                        {/* Date and Time Display */}
                        <div
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                padding: '8px 16px',
                                borderRadius: '25px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                minWidth: '280px',
                                textAlign: 'center',
                                fontFamily: 'monospace'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <span>🕒</span>
                                <span>{formatDateTime(currentDateTime)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Responsive styles */}
            <style>{`
        @media (max-width: 768px) {
          .navbar-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
          .nav-links {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
            text-align: center;
          }
          .datetime-display {
            min-width: auto !important;
            font-size: 0.8rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .brand-text {
            font-size: 1.1rem !important;
          }
          .nav-links a {
            font-size: 0.9rem !important;
            padding: 6px 12px !important;
          }
        }
      `}</style>
        </nav>
    );
}

export default MyNavbar;