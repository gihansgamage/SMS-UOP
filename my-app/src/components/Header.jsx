import React from 'react';

const Header = () => {
    const headerStyle = {
        background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 50%, #f1b0b7 100%)',
        borderBottom: '4px solid #dc3545',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '3rem 0',
        position: 'relative',
        overflow: 'hidden'
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    };

    const titleStyle = {
        color: '#721c24',
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        letterSpacing: '2px',
        margin: '0 0 1rem 0'
    };

    const welcomeStyle = {
        color: '#842029',
        fontSize: '1.5rem',
        textAlign: 'center',
        fontWeight: '500',
        marginTop: '1rem',
        margin: '1rem 0 0 0'
    };

    const dividerStyle = {
        width: '100px',
        height: '4px',
        backgroundColor: '#dc3545',
        margin: '0 auto 2rem auto',
        borderRadius: '2px'
    };

    const dotsContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginTop: '2rem'
    };

    const dotStyle = {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        animation: 'bounce 1.5s infinite'
    };

    const waveStyle = {
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '30px',
        background: '#f8d7da',
        clipPath: 'polygon(0 20px, 100% 0, 100% 100%, 0 100%)'
    };

    return (
        <>
            <style>
                {`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          .dot-1 { 
            animation-delay: 0s; 
            background-color: #f8d7da; 
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: fadeInOut 2s infinite;
          }
          .dot-2 { 
            animation-delay: 0.5s; 
            background-color: #dc3545; 
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: fadeInOut 2s infinite;
          }
          .dot-3 { 
            animation-delay: 1s; 
            background-color: #721c24; 
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: fadeInOut 2s infinite;
          }
          
          @media (max-width: 768px) {
            .main-title {
              font-size: 2.5rem !important;
            }
            .welcome-text {
              font-size: 1.25rem !important;
            }
          }
        `}
            </style>

            <header style={headerStyle}>
                <div style={containerStyle}>
                    <h1 style={titleStyle} className="main-title">
                        Society Management System
                    </h1>
                    <div style={dividerStyle}></div>
                    <p style={welcomeStyle} className="welcome-text">
                        Welcome to the Society Management System - University of Peradeniya
                    </p>
                    <div style={dotsContainerStyle}>
                        <div className="dot-1"></div>
                        <div className="dot-2"></div>
                        <div className="dot-3"></div>
                    </div>
                </div>
                <div style={waveStyle}></div>
            </header>
        </>
    );
};

export default Header;