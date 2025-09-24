// src/utils/cpf.ts

// Formata o CPF no padrão 000.000.000-00
export const formatCpf = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
};

// Valida se está no formato correto
export const validateCpf = (value: string): boolean => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
};
