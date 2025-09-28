import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PaymentForm.module.css';
import { getUserData } from '../../utils/storage';

interface PaymentFormProps {
    userData?: {
        cpf?: string;
        nome?: string;
        celular?: string;
        email?: string;
    };
}

interface AddressData {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ userData }) => {
    const [formData, setFormData] = useState({
        cpf: '',
        nome: '',
        celular: '',
        email: '',
        cep: '',
        rua: '',
        bairro: '',
        cidade: '',
        uf: '',
        numero: '',
        complemento: '',
        consent: false,
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Carrega dados do localStorage e props
    useEffect(() => {
        const saved = getUserData();
        if (saved) {
            setFormData((prev) => ({
                ...prev,
                cpf: saved.cpf,
                nome: saved.nome,
                celular: saved.celular,
                email: saved.email,
            }));
        }

        if (userData) {
            setFormData((prev) => ({
                ...prev,
                cpf: userData.cpf || prev.cpf,
                nome: userData.nome || prev.nome,
                celular: userData.celular || prev.celular,
                email: userData.email || prev.email,
            }));
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (type === 'checkbox') setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleCepBlur = async () => {
        const cep = formData.cep.replace(/\D/g, '');
        if (cep.length !== 8) {
            setErrors((prev) => ({ ...prev, cep: 'CEP inválido' }));
            return;
        }

        try {
            const res = await axios.get<AddressData>(`https://viacep.com.br/ws/${cep}/json/`);
            if (res.data.erro) {
                setErrors((prev) => ({ ...prev, cep: 'CEP não encontrado' }));
                return;
            }

            setFormData((prev) => ({
                ...prev,
                rua: res.data.logradouro,
                bairro: res.data.bairro,
                cidade: res.data.localidade,
                uf: res.data.uf,
            }));

            setErrors((prev) => ({ ...prev, cep: '' }));
        } catch {
            setErrors((prev) => ({ ...prev, cep: 'Erro ao buscar o CEP' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.consent) {
            setErrors((prev) => ({ ...prev, consent: 'Você precisa aceitar os termos' }));
            setLoading(false);
            return;
        }

        try {
            const token = process.env.REACT_APP_PERFECTPAY_TOKEN;
            if (!token) throw new Error('Token não configurado');

            const payload = { ...formData };
            const response = await axios.post('https://api.perfectpay.com.br/payment', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Resposta PerfectPay:', response.data);
            alert('Solicitação enviada com sucesso!');

            // Salva os dados no localStorage
            localStorage.setItem('userData', JSON.stringify(formData));
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Erro ao enviar solicitação');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        formData.consent &&
        formData.cep &&
        formData.numero &&
        !Object.values(errors).some((err) => err);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} disabled className={styles.input} />
            <input type="text" name="nome" placeholder="Nome" value={formData.nome} disabled className={styles.input} />
            <input type="text" name="celular" placeholder="Celular" value={formData.celular} disabled className={styles.input} />
            <input type="email" name="email" placeholder="E-mail" value={formData.email} disabled className={styles.input} />

            <input
                type="text"
                name="cep"
                placeholder="CEP"
                value={formData.cep}
                onChange={handleChange}
                onBlur={handleCepBlur}
                className={`${styles.input} ${errors.cep ? styles.inputError : ''}`}
            />
            {errors.cep && <span className={styles.error}>{errors.cep}</span>}

            <input type="text" name="rua" placeholder="Rua" value={formData.rua} onChange={handleChange} className={styles.input} />
            <input type="text" name="bairro" placeholder="Bairro" value={formData.bairro} onChange={handleChange} className={styles.input} />
            <input type="text" name="cidade" placeholder="Cidade" value={formData.cidade} onChange={handleChange} className={styles.input} />
            <input type="text" name="uf" placeholder="UF" value={formData.uf} onChange={handleChange} className={styles.input} />
            <input type="text" name="numero" placeholder="Número" value={formData.numero} onChange={handleChange} className={styles.input} />
            <input type="text" name="complemento" placeholder="Complemento" value={formData.complemento} onChange={handleChange} className={styles.input} />

            <label className={styles.checkboxLabel}>
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
                Li e aceito a Política de Privacidade.
            </label>
            {errors.consent && <span className={styles.error}>{errors.consent}</span>}

            <button type="submit" className={styles.button} disabled={!isFormValid || loading}>
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
};

export default PaymentForm;
