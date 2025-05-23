import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FinalRequest.module.css'; // Importe o CSS Module
import image1 from '../../Assets/Img/cartao-nu-quadrada-conteudo-dinamico-desktop.jpg'
const FinalRequest: React.FC = () => {
    const navigate = useNavigate();

    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');

    const formatCpf = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
            .slice(0, 14);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCpf(e.target.value);
        setCpf(formatted);
        setError('');
    };

    const validateCpf = (value: string) => {
        return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateCpf(cpf)) {
            navigate('/CheckFormUserPage');
        } else {
            setError('Digite um CPF válido no formato 000.000.000-00.');
        }
    };

    return (
        <div className={styles['container-form']}>

            <h1 className={styles['title']}>Tenha N possibilidades na sua vida. Peça seu Nubank.</h1>
            <div className={styles['content-form']}>
                <form className={styles['form']} onSubmit={handleSubmit}>
                    <h1 className={styles['title-form']} >Peça seu Cartão e abra já sua Conta</h1>
                    <input
                        type="text"
                        placeholder="Digite seu CPF"
                        className={`${styles['cpf-input-form']} ${error ? styles['input-error'] : ''}`}
                        value={cpf}
                        onChange={handleChange}
                    />
                    {error && <p className={styles['error-message']}>{error}</p>}
                    <button type="submit" className={styles['btn-continue']} >
                        Continuar <span className={styles['arrow-form']} aria-hidden="true">&gt;</span>
                    </button>
                </form>
                <div className={styles['content-image']}>
                    <img className={styles['image']} src={image1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FinalRequest;