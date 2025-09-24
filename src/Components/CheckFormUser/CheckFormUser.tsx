import React, { useState } from 'react';
import styles from './CheckFormUser.module.css';
import phoneCardImg from '../../Assets/Img/card-form-page.png';
import { useNavigate } from 'react-router-dom';

// Utils
import { formatCpf } from '../../utils/cpf';
import { formatTelefone } from '../../utils/telefone';
import { formatNome } from '../../utils/nome';
import { validateEmail } from '../../utils/email';

const CheckFormUser: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cpf: '',
        nome: '',
        celular: '',
        email: '',
        emailConfirm: '',
        consent: false,
    });

    const handleClose = () => {
        navigate(-1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;

        // Aplica formatações
        if (name === 'cpf') newValue = formatCpf(value);
        if (name === 'celular') newValue = formatTelefone(value);
        if (name === 'nome') newValue = formatNome(value);

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : newValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/Loading');
    };

    const isFormValid =
        formData.cpf &&
        formData.nome &&
        formData.celular &&
        formData.email &&
        formData.emailConfirm &&
        formData.consent &&
        validateEmail(formData.email) &&
        formData.email === formData.emailConfirm;

    return (
        <div className={styles.wrapper}>
            <button className={styles.closeButton} onClick={handleClose}>
                X
            </button>
            <div className={styles.left}>
                <h1>
                    Complete os campos ao lado<br />
                    para pedir sua Conta e Cartão<br />
                    de crédito
                </h1>
                <img src={phoneCardImg} alt="Phone e Cartão" className={styles.image} />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    className={styles.input}
                    value={formData.cpf}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome Completo"
                    className={styles.input}
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="celular"
                    placeholder="Celular"
                    className={styles.input}
                    value={formData.celular}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="emailConfirm"
                    placeholder="Confirmação de E-mail"
                    className={styles.input}
                    value={formData.emailConfirm}
                    onChange={handleChange}
                />

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                    />
                    <span>
                        Eu li, estou ciente das condições de tratamento dos meus dados pessoais e dou meu consentimento, quando aplicável, conforme descrito nesta{' '}
                        <a href="#">Política de Privacidade</a>.
                    </span>
                </label>

                <button
                    type="submit"
                    className={`${styles.button} ${isFormValid ? styles.active : ''}`}
                    disabled={!isFormValid}
                >
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default CheckFormUser;
