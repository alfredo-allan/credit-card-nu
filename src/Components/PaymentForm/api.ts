import axios from "axios";

export interface AddressData {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}

export interface PaymentFormData {
    cpf: string;
    nome: string;
    celular: string;
    email: string;
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    uf: string;
    numero: string;
    complemento: string;
    consent: boolean;
    approvedValue?: number; // novo campo
}

export const getAddressByCep = async (cep: string): Promise<AddressData> => {
    const res = await axios.get<AddressData>(`https://viacep.com.br/ws/${cep}/json/`);
    return res.data;
};

// ✅ SOLUÇÃO REAL: Redirecionar para checkout da PerfectPay
export const redirectToPerfectPayCheckout = (formData: PaymentFormData): string => {
    // 1. Salva os dados do cliente para uso posterior (webhook, etc.)
    localStorage.setItem('perfectpay_customer_data', JSON.stringify(formData));

    // 2. Monta a URL do produto na PerfectPay
    // VOCÊ PRECISA CRIAR UM PRODUTO NO PAINEL DA PERFECTPAY E PEGAR A URL
    const baseUrl = 'https://checkout.perfectpay.com.br';
    const productCode = 'PPU38CQ1CJA'; // Obtido no painel da PerfectPay

    // 3. Parâmetros UTM opcionais para rastreamento
    const utmParams = new URLSearchParams({
        'utm_source': 'website',
        'utm_medium': 'formulario',
        'utm_campaign': 'pagamento-direto'
    });

    // 4. URL completa para redirect
    const checkoutUrl = `${baseUrl}/${productCode}?${utmParams.toString()}`;

    return checkoutUrl;
};

// ✅ Para consultar vendas (funciona com a API)
export const getSales = async (filters?: {
    start_date_sale?: string;
    end_date_sale?: string;
    transaction_token?: string;
}) => {
    const token = process.env.REACT_APP_PERFECTPAY_TOKEN;

    if (!token) {
        throw new Error("Token PerfectPay não configurado");
    }

    try {
        const response = await axios.post(
            "https://app.perfectpay.com.br/api/v1/sales/get",
            filters || {},
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Erro ao buscar vendas:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Webhook handler (para receber notificações de pagamento)
export const handlePerfectPayWebhook = (webhookData: any) => {
    // Esta função será chamada quando a PerfectPay notificar sobre um pagamento
    // Você implementará isso no seu backend
    console.log('Webhook PerfectPay recebido:', webhookData);

    // Aqui você pode:
    // 1. Validar o pagamento
    // 2. Ativar o produto para o cliente
    // 3. Enviar email de confirmação
    // 4. Etc.

    return { status: 'success' };
};

// ✅ Buscar dados do cliente salvos
export const getStoredCustomerData = (): PaymentFormData | null => {
    try {
        const data = localStorage.getItem('perfectpay_customer_data');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Erro ao recuperar dados do cliente:', error);
        return null;
    }
};

// ✅ Limpar dados do cliente
export const clearStoredCustomerData = (): void => {
    localStorage.removeItem('perfectpay_customer_data');
};