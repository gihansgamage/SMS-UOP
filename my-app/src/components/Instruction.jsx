function Instruction() {
    return (
        <div
            style={{
                backgroundColor: '#d1edcc', // Light green success alert color
                border: '1px solid #badbcc',
                borderRadius: '0.375rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden'
            }}
        >
            {/* Card Header */}
            <div
                style={{
                    backgroundColor: '#198754', // Bootstrap success green
                    color: 'white',
                    padding: '1rem 1.25rem',
                    borderBottom: '1px solid #badbcc',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span style={{ fontSize: '1.2rem' }}>📋</span>
                <h5
                    style={{
                        margin: '0',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                >
                    Instructions
                </h5>
            </div>

            {/* Card Body */}
            <div
                style={{
                    padding: '1.5rem 1.25rem',
                    color: '#0f5132', // Dark green text for better contrast
                }}
            >
                <ul
                    style={{
                        margin: '0',
                        paddingLeft: '20px',
                        listStyle: 'none'
                    }}
                >
                    <li style={{ marginBottom: '0.75rem', fontSize: '1rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#198754', fontSize: '1.1rem', marginTop: '2px' }}>•</span>
                        <span>Fill in <strong style={{ color: '#0a3622' }}>accurate details</strong> to avoid delays.</span>
                    </li>

                    <li style={{ marginBottom: '0.75rem', fontSize: '1rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#198754', fontSize: '1.1rem', marginTop: '2px' }}>•</span>
                        <span>Submit a <strong style={{ color: '#0a3622' }}>hard copy</strong> with required signatures before the deadline.</span>
                    </li>

                    <li style={{ marginBottom: '0.75rem', fontSize: '1rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#198754', fontSize: '1.1rem', marginTop: '2px' }}>•</span>
                        <span>Do <strong style={{ color: '#0a3622' }}>not alter</strong> any details in the hard copy.</span>
                    </li>

                    <li style={{ marginBottom: '0.75rem', fontSize: '1rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#198754', fontSize: '1.1rem', marginTop: '2px' }}>•</span>
                        <span>Ensure the form is submitted <strong style={{ color: '#0a3622' }}>in one attempt</strong>—review all details carefully.</span>
                    </li>

                    <li style={{ marginBottom: '0', fontSize: '1rem', lineHeight: '1.6', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#198754', fontSize: '1.1rem', marginTop: '2px' }}>•</span>
                        <span>This process adheres to <strong style={{ color: '#0a3622' }}>University Regulations</strong> and policies.</span>
                    </li>
                </ul>
            </div>

            {/* Bottom accent */}
            <div
                style={{
                    height: '4px',
                    background: 'linear-gradient(90deg, #198754 0%, #20c997 50%, #198754 100%)',
                }}
            />
        </div>
    );
}

export default Instruction;