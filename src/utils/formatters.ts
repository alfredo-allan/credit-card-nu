// CPF
export const formatCpf = (value: string): string => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
};

export const validateCpf = (value: string): boolean => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value); // ou usar lib cpf-cnpj-validator
};

// Nome
export const formatNome = (value: string): string => {
    return value
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

// Formata o telefone em 11 dígitos no padrão (XX) XXXXX-XXXX
export const formatTelefone = (value: string): string => {
    const digits = value.replace(/\D/g, ''); // só números

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

// Valida telefone com 11 dígitos
export const validateTelefone = (value: string): boolean => {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11;
};


// Email
export const validateEmail = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};
