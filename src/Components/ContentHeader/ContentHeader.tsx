import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageMobile from '../../Assets/Img/image-mobile-.png';
import imageDesktop from '../../Assets/Img/image-desktop.png';
import styles from './ContentHeader.module.css';

// importa as funções utilitárias
import { formatCpf, validateCpf } from '../../utils/cpf';

const ContentHeader: React.FC = () => {
    const isMobile = window.innerWidth < 768;
    const navigate = useNavigate();

    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCpf(e.target.value);
        setCpf(formatted);
        setError('');
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
        <div className="my-5 d-flex flex-column align-items-center">
            <img
                src={isMobile ? imageMobile : imageDesktop}
                alt="Imagem do Content Header"
                className={styles['content-image']}
            />
            <h1 className={styles['title']}>
                Tenha N possibilidades na vida com Nubank
            </h1>
            <div className={styles['content-form']}>
                <form className={styles['form']} onSubmit={handleSubmit}>
                    <h1 className={styles['title-form']}>
                        Com o Nubank, a resposta vem em menos de 1 minuto
                    </h1>
                    <input
                        type="text"
                        placeholder="Digite seu CPF"
                        className={`${styles['cpf-input-form']} ${error ? styles['input-error'] : ''
                            }`}
                        value={cpf}
                        onChange={handleChange}
                    />
                    {error && <p className={styles['error-message']}>{error}</p>}
                    <button type="submit" className={styles['btn-continue']}>
                        Continuar{' '}
                        <span className={styles['arrow-form']} aria-hidden="true">
                            &gt;
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContentHeader;
