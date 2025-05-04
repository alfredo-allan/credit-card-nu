import React from 'react';
import styles from './CheckFormUser.module.css';
import phoneCardImg from '../../Assets/Img/card-form-page.png';
import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router

const CheckFormUser: React.FC = () => {
    const navigate = useNavigate(); // Se estiver usando React Router

    const handleClose = () => {
        // Lógica para fechar a página e voltar à anterior
        // Se estiver usando React Router:
        navigate(-1);
        // Se não estiver usando React Router, você pode usar:
        // window.history.back();
        // Ou outra lógica de gerenciamento de estado para fechar o modal/componente
    };

    return (
        <div className={styles.wrapper}>
            <button className={styles.closeButton} onClick={handleClose}>
                X
            </button>
            <div className={styles.left}>
                <h1>Complete os campos ao lado<br />para pedir sua Conta e Cartão<br />de crédito</h1>
                <img src={phoneCardImg} alt="Phone e Cartão" className={styles.image} />
            </div>
            <form className={styles.form}>
                <input type="text" placeholder="CPF" className={styles.input} />
                <input type="text" placeholder="Nome Completo" className={styles.input} />
                <input type="text" placeholder="Celular" className={styles.input} />
                <input type="email" placeholder="E-mail" className={styles.input} />
                <input type="email" placeholder="Confirmação de E-mail" className={styles.input} />

                <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>
                        Eu li, estou ciente das condições de tratamento dos meus dados pessoais e dou meu consentimento, quando aplicável, conforme descrito nesta <a href="#">Política de Privacidade</a>.
                    </span>
                </label>

                <button type="submit" className={styles.button} disabled>Enviar</button>
            </form>
        </div>
    );
};

export default CheckFormUser;