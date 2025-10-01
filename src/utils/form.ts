import { getUserData } from "./storage";

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
    approvedValue?: number; // ✅ novo campo opcional
}

export const defaultFormData: PaymentFormData = {
    cpf: "",
    nome: "",
    celular: "",
    email: "",
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: "",
    complemento: "",
    consent: false,
    approvedValue: undefined, // ✅ inicia vazio
};

// ---------- Persistência ----------
export const loadFormData = (): PaymentFormData => {
    const saved = getUserData();
    return { ...defaultFormData, ...saved };
};

export const saveFormData = (data: PaymentFormData) => {
    localStorage.setItem("userData", JSON.stringify(data));
};

// ---------- Validações ----------
export const validateCPF = (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, "");
    return cleanCpf.length === 11; // aqui pode implementar a regra completa de CPF
};

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePhone = (celular: string): boolean => {
    const cleanPhone = celular.replace(/\D/g, "");
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

export const validateCEP = (cep: string): boolean => {
    return /^\d{5}-?\d{3}$/.test(cep);
};
