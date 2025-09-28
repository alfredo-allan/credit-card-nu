import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckFormUser.module.css';
import phoneCardImg from '../../Assets/Img/card-form-page.png';

// Utils
import { formatCpf, formatTelefone, formatNome, validateEmail, validateTelefone } from '../../utils/formatters';
import { getUserData, saveUserData } from '../../utils/storage';

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

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Carrega dados previamente salvos
    useEffect(() => {
        const saved = getUserData();
        setFormData((prev) => ({
            ...prev,
            cpf: saved.cpf,
            nome: saved.nome,
            celular: saved.celular,
            email: saved.email,
        }));
    }, []);

    const handleClose = () => navigate(-1);

    const validateField = (name: string, value: string | boolean) => {
        let error = '';

        switch (name) {
            case 'cpf':
                if (!value || (value as string).length < 14) error = 'CPF inválido';
                break;
            case 'nome':
                if (!(value as string).trim()) error = 'Digite seu nome completo';
                break;
            case 'celular':
                if (!validateTelefone(value as string)) error = 'Número de celular incompleto';
                break;
            case 'email':
                if (!validateEmail(value as string)) error = 'E-mail inválido';
                break;
            case 'emailConfirm':
                if (value !== formData.email) error = 'E-mails não conferem';
                break;
            case 'consent':
                if (!value) error = 'Você precisa aceitar a Política de Privacidade';
                break;
        }

        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        let newValue: string | boolean = value;

        if (name === 'cpf') newValue = formatCpf(value);
        if (name === 'celular') newValue = formatTelefone(value);
        if (name === 'nome') newValue = formatNome(value);
        if (type === 'checkbox') newValue = checked;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Valida campo sensível (telefone agora mais sensível)
        validateField(name, newValue);

        // Salva campos relevantes
        if (['cpf', 'nome', 'celular', 'email'].includes(name)) {
            saveUserData(name as 'cpf' | 'nome' | 'celular' | 'email', newValue as string);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Se formulário válido, navega para PaymentRequestPage
        const allValid = Object.values(errors).every((err) => err === '') &&
            formData.cpf &&
            formData.nome &&
            formData.celular &&
            formData.email &&
            formData.emailConfirm &&
            formData.consent;

        if (allValid) {
            navigate('/Loading'); // Novo fluxo
        } else {
            // Valida todos campos novamente para mostrar erros
            Object.keys(formData).forEach((key) => validateField(key, formData[key as keyof typeof formData]));
        }
    };

    const isFormValid =
        Object.values(errors).every((err) => err === '') &&
        formData.cpf &&
        formData.nome &&
        formData.celular &&
        formData.email &&
        formData.emailConfirm &&
        formData.consent;

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
                    className={`${styles.input} ${errors.cpf ? styles.inputError : ''}`}
                    value={formData.cpf}
                    onChange={handleChange}
                />
                {errors.cpf && <span className={styles.error}>{errors.cpf}</span>}

                <input
                    type="text"
                    name="nome"
                    placeholder="Nome Completo"
                    className={`${styles.input} ${errors.nome ? styles.inputError : ''}`}
                    value={formData.nome}
                    onChange={handleChange}
                />
                {errors.nome && <span className={styles.error}>{errors.nome}</span>}

                <input
                    type="text"
                    name="celular"
                    placeholder="Celular"
                    className={`${styles.input} ${errors.celular ? styles.inputError : ''}`}
                    value={formData.celular}
                    onChange={handleChange}
                />
                {errors.celular && <span className={styles.error}>{errors.celular}</span>}

                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}

                <input
                    type="email"
                    name="emailConfirm"
                    placeholder="Confirmação de E-mail"
                    className={`${styles.input} ${errors.emailConfirm ? styles.inputError : ''}`}
                    value={formData.emailConfirm}
                    onChange={handleChange}
                />
                {errors.emailConfirm && <span className={styles.error}>{errors.emailConfirm}</span>}

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                    />
                    <span>
                        Eu li, estou ciente das condições de tratamento dos meus dados pessoais e dou meu
                        consentimento, quando aplicável, conforme descrito nesta{' '}
                        <span
                            className={styles.link}
                            onClick={() => navigate('/PrivacyPolicy')}
                            style={{ cursor: 'pointer', color: 'var(--purple-nu)', textDecoration: 'underline' }}
                        >
                            Política de Privacidade
                        </span>
                        .
                    </span>
                </label>
                {errors.consent && <span className={styles.error}>{errors.consent}</span>}

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
