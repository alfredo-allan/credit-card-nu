import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirectToPerfectPayCheckout } from '../../Components/PaymentForm/api';
import { PaymentFormData } from '../../utils/form';
import styles from './PaymentCheckoutPage.module.css';

const PaymentCheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<PaymentFormData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Recupera os dados da página anterior
        const savedData = sessionStorage.getItem('payment_form_data');

        if (savedData) {
            setFormData(JSON.parse(savedData));
        } else {
            // Se não tem dados, volta para o formulário
            navigate('/PaymentRequestPage');
        }
    }, [navigate]);

    const handleBack = () => {
        navigate('/PaymentRequestPage');
    };

    const handlePayment = () => {
        if (!formData) return;

        setLoading(true);

        // Redireciona para o checkout da PerfectPay
        const checkoutUrl = redirectToPerfectPayCheckout(formData);

        // Salva onde estava para o retorno
        sessionStorage.setItem('return_url', window.location.href);

        // Abre em nova aba
        window.open(checkoutUrl, '_blank');
        // ou para redirecionar na mesma aba:
        // window.location.href = checkoutUrl;

        setLoading(false);
    };

    if (!formData) {
        return <div>Carregando...</div>;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={handleBack}>
                        ← Voltar
                    </button>
                    <h2 className={styles.title}>Finalizar Pagamento</h2>
                </div>

                <div className={styles.orderSummary}>
                    <h3>Resumo do Pedido</h3>
                    <div className={styles.summaryItem}>
                        <span>Produto</span>
                        <span>R$ 30,00</span>
                    </div>
                    <div className={styles.summaryTotal}>
                        <span><strong>Total</strong></span>
                        <span><strong>R$ 30,00</strong></span>
                    </div>
                </div>

                <div className={styles.customerInfo}>
                    <h3>Dados do Cliente</h3>
                    <div className={styles.infoGrid}>
                        <div><strong>Nome:</strong> {formData.nome}</div>
                        <div><strong>Email:</strong> {formData.email}</div>
                        <div><strong>CPF:</strong> {formData.cpf}</div>
                        <div><strong>Telefone:</strong> {formData.celular}</div>
                        <div><strong>Endereço:</strong> {formData.rua}, {formData.numero}</div>
                        <div><strong>Cidade:</strong> {formData.cidade} - {formData.uf}</div>
                        <div><strong>CEP:</strong> {formData.cep}</div>
                    </div>
                </div>

                <div className={styles.paymentInfo}>
                    <h3>🔒 Pagamento Seguro</h3>
                    <p>Você será redirecionado para a <strong>PerfectPay</strong> para finalizar o pagamento de forma segura.</p>
                    <p>Na PerfectPay você poderá escolher entre:</p>
                    <ul>
                        <li>💳 <strong>Cartão de Crédito</strong> - Aprovação imediata</li>
                        <li>🔲 <strong>PIX</strong> - Aprovação em até 2 horas</li>
                        <li>🧾 <strong>Boleto</strong> - Aprovação em até 3 dias úteis</li>
                    </ul>
                </div>

                <button
                    className={styles.paymentButton}
                    onClick={handlePayment}
                    disabled={loading}
                >
                    {loading ? "Redirecionando..." : "Ir para Pagamento"}
                </button>

                <div className={styles.securityInfo}>
                    <p>🔒 Seus dados estão protegidos com criptografia SSL</p>
                    <p>Processado pela PerfectPay - Plataforma Certificada</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCheckoutPage;