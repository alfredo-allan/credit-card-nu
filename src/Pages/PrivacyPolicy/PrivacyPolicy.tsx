// src/pages/PrivacyPolicy/PrivacyPolicy.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
    const [consent, setConsent] = useState(false);

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConsent(e.target.checked);
    };

    const handleProceed = () => {
        if (consent) {
            navigate('/CheckFormUserPage'); // próxima página
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>
                Política de Privacidade
            </h1>
            <div className={styles.policyContent}>
                <p>
                    Esta é a política de privacidade padrão. Nós coletamos informações para melhorar a experiência do usuário, manter seus dados seguros e cumprir com obrigações legais.
                </p>
                <p>
                    Ao marcar a caixa abaixo, você confirma que leu e concorda com os termos da nossa política de privacidade.
                </p>
            </div>

            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={consent}
                    onChange={handleCheckbox}
                />
                <span>Eu li e concordo com a Política de Privacidade</span>
            </label>

            <button
                type="button"
                className={`${styles.btnProceed} ${consent ? styles.active : ''}`}
                onClick={handleProceed}
                disabled={!consent}
            >
                Proceed
            </button>
        </div>
    );
};

export default PrivacyPolicy;
