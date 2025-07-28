function PageHeader() {



    return (
        <div
            className="border-0 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                minHeight: '300px',
                position: 'relative',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                margin : '1rem',
            }}
        >
            <div className="d-flex align-items-center p-4 h-100">
                <div style={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                    {/* Text Content - Left Side */}
                    <div style={{ flex: '0 0 58.333333%', color: 'white', textAlign: 'left', paddingRight: '2rem' }}>
                        <h1
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                marginBottom: '1.5rem',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                                lineHeight: '1.2'
                            }}
                        >
                            Welcome to the Society Management  🎉
                        </h1>
                        <p
                            style={{
                                fontSize: '1.1rem',
                                marginBottom: '2rem',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                                lineHeight: '1.6',
                                opacity: '0.95'
                            }}
                        >
                            Streamline your community management with our comprehensive platform
                            designed to enhance communication and organization.
                        </p>

                    </div>

                    {/* Image - Right Side */}
                    <div style={{ flex: '0 0 41.666667%', textAlign: 'right' }}>
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block'
                            }}
                        >
                            <img
                                src="./public/cover.png"
                                alt="Modern Building Community"
                                style={{
                                    maxHeight: '250px',
                                    maxWidth: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                    border: '3px solid rgba(255,255,255,0.2)',
                                    animation: 'float 6s ease-in-out infinite'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        width: '100px',
                        height: '100px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '50%',
                        animation: 'pulse 4s ease-in-out infinite'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        left: '30px',
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '50%',
                        animation: 'pulse 3s ease-in-out infinite reverse'
                    }}
                />
            </div>

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        
        @media (max-width: 768px) {
          .responsive-title {
            font-size: 1.8rem !important;
          }
          .responsive-text {
            font-size: 1rem !important;
          }
          .responsive-layout {
            flex-direction: column !important;
            text-align: center !important;
          }
          .responsive-content {
            padding-right: 0 !important;
            margin-bottom: 2rem;
          }
        }
      `}</style>
        </div>
    );
}

export default PageHeader;