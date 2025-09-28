import React, { useEffect, useState } from 'react';
import PaymentForm from '../../Components/PaymentForm/PaymentForm';
import styles from './PaymentRequestPage.module.css';

const PaymentRequestPage: React.FC = () => {
    const [userData, setUserData] = useState({
        cpf: '',
        nome: '',
        celular: '',
        email: '',
    });

    useEffect(() => {
        const saved = localStorage.getItem('userData');
        if (saved) setUserData(JSON.parse(saved));
    }, []);

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Seu cartão foi aprovado!</h1>
            <p className={styles.subtitle}>
                Termine de preencher os dados para finalizar a solicitação.
            </p>
            <PaymentForm userData={userData} />
        </div>
    );
};

export default PaymentRequestPage;
