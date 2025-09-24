// src/utils/cpf.ts
import { cpf } from 'cpf-cnpj-validator';

// Formata o CPF no padrão 000.000.000-00
export const formatCpf = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
};

// Valida se o CPF é válido usando a lib
export const validateCpf = (value: string): boolean => {
    return cpf.isValid(value);
};
