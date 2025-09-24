import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SpinnerPageProps {
    duration?: number;
    messages?: string[];
    navigateTo?: string;
    onComplete?: () => void;
    showProgressBar?: boolean;
}

const SpinnerPage: React.FC<SpinnerPageProps> = ({
    duration = 3000,
    messages = [
        'Carregando sua proposta',
        'Aguarde mais um pouco',
        'Tenha N possibilidades na vida com o Nubank'
    ],
    navigateTo,
    onComplete,
    showProgressBar = true,
}) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const intervalTime = duration / messages.length;

        const messageInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, intervalTime);

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + (100 / (duration / 100));
            });
        }, 100);

        const timeout = setTimeout(() => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            if (navigateTo) {
                navigate(navigateTo);
            } else if (onComplete) {
                onComplete();
            }
        }, duration);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            clearTimeout(timeout);
        };
    }, [duration, messages.length, navigate, navigateTo, onComplete]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '0 16px',
                backgroundColor: '#ffffff',
            }}
        >
            <div
                style={{
                    width: '64px',
                    height: '64px',
                    border: '6px solid #e5e7eb',
                    borderTop: '6px solid #6f11b3',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                }}
            />
            <span style={{ marginTop: '24px', fontSize: '18px', fontWeight: 500, color: '#333' }}>
                {messages[messageIndex]}
            </span>
            {showProgressBar && (
                <div
                    style={{
                        width: '75%',
                        maxWidth: '400px',
                        height: '8px',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '4px',
                        marginTop: '24px',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            height: '100%',
                            width: `${progress}%`,
                            backgroundColor: '#6f11b3',
                            transition: 'width 0.1s linear',
                        }}
                    />
                </div>
            )}

            {/* Spinner animation keyframes */}
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default SpinnerPage;
