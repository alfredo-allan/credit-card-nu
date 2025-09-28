import React from "react";
import styles from "./PaymentSuccess.module.css";

interface PaymentSuccessProps {
    orderData: any;
    onNewOrder: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderData, onNewOrder }) => {
    return (
        <div className={styles.container}>
            <div className={styles.successIcon}>✅</div>

            <h1 className={styles.title}>Pedido Realizado com Sucesso!</h1>

            <p className={styles.subtitle}>
                Seu pedido foi processado e você receberá as informações de pagamento em breve.
            </p>

            {orderData?.transaction_token && (
                <div className={styles.orderInfo}>
                    <h3>Informações do Pedido</h3>
                    <div className={styles.infoItem}>
                        <span>Código da Transação:</span>
                        <span><strong>{orderData.transaction_token}</strong></span>
                    </div>
                    {orderData.value && (
                        <div className={styles.infoItem}>
                            <span>Valor:</span>
                            <span><strong>R$ {orderData.value}</strong></span>
                        </div>
                    )}
                    <div className={styles.infoItem}>
                        <span>Status:</span>
                        <span className={styles.statusPending}>Pendente</span>
                    </div>
                </div>
            )}

            <div className={styles.nextSteps}>
                <h3>Próximos Passos:</h3>
                <ul>
                    <li>Você receberá um email com os detalhes do pagamento</li>
                    <li>Para PIX, o código será enviado por email</li>
                    <li>Para boleto, o link será enviado por email</li>
                    <li>Para cartão de crédito, o processamento é automático</li>
                </ul>
            </div>

            <div className={styles.support}>
                <p><strong>Precisa de ajuda?</strong></p>
                <p>Entre em contato conosco pelo email: suporte@empresa.com</p>
            </div>

            <button className={styles.newOrderButton} onClick={onNewOrder}>
                Fazer Novo Pedido
            </button>
        </div>
    );
};

export default PaymentSuccess;