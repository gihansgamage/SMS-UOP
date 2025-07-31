import React, { useEffect, useState } from 'react';

const Header = () => {

    const backgroundImages = [
        'url("/p1.jpg")',
        'url("/p4.png")',
        'url("/p6.jpg")'
    ];
    const [bgIndex, setBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 4000); // every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const headerStyle = {
        backgroundImage: backgroundImages[bgIndex],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
        borderBottom: '4px solid #dc3545',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '3rem 0',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '12px',

    };

    // [No changes needed in styles below unless needed]

    const titleStyle = {
        color: '#FEF2F2',
        fontSize: '3.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '1rem',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        letterSpacing: '2px',
        margin: '0 0 1rem 0',
        opacity:5
    };

    const welcomeStyle = {
        color: '#FEF2F2',
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
        marginTop: '2rem',

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
