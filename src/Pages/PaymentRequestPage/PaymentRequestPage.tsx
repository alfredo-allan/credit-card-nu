import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../../Components/PaymentForm/PaymentForm';
import { PaymentFormData } from '../../utils/form';
import styles from './PaymentRequestPage.module.css';

const PaymentRequestPage: React.FC = () => {
    const navigate = useNavigate();

    const handleFormComplete = (formData: PaymentFormData) => {
        // Salva os dados para a próxima página
        sessionStorage.setItem('payment_form_data', JSON.stringify(formData));

        // Navega para a página de checkout
        navigate('/PaymentCheckout');
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Seu cartão foi aprovado!</h1>
            <p className={styles.subtitle}>
                Termine de preencher os dados para finalizar a solicitação.
            </p>
            <PaymentForm onFormComplete={handleFormComplete} />
        </div>
    );
};

export default PaymentRequestPage;