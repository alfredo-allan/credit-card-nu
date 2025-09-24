export const formatTelefone = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return digits.replace(/(\d{2})(\d+)/, '$1 $2');
    return digits.replace(/(\d{2})(\d{5})(\d+)/, '$1 $2-$3').slice(0, 13);
};
