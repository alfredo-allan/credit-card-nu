// src/pages/PaymentCheckoutPage/api.ts
import axios from 'axios';
import { PaymentFormData } from '../../utils/form';

// Ajuste aqui a URL do seu backend Flask
const API_URL = 'http://10.0.0.107:8000/checkout';

export const submitCheckoutData = async (data: PaymentFormData) => {
    try {
        // console.log("📦 Payload enviado ao backend:", data);

        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Retorna os dados recebidos do backend
        return response.data;
    } catch (error: any) {
        console.error('❌ Erro ao submeter checkout:', error?.response?.data || error.message);
        throw error;
    }
};
