// Definindo todas as chaves usadas no localStorage
const STORAGE_KEYS = {
    cpf: "userCpf",
    nome: "userNome",
    celular: "userCelular",
    email: "userEmail",
    approvedValue: "userApprovedValue", // 🚀 novo campo
} as const;

// Tipo dos dados do usuário
export type UserData = {
    cpf: string;
    nome: string;
    celular: string;
    email: string;
    approvedValue?: number; // opcional
};

// Salva string ou número no localStorage
export const saveUserData = (
    key: keyof typeof STORAGE_KEYS,
    value: string | number
) => {
    localStorage.setItem(STORAGE_KEYS[key], String(value));
};

// Recupera todos os dados
export const getUserData = (): UserData => ({
    cpf: localStorage.getItem(STORAGE_KEYS.cpf) || "",
    nome: localStorage.getItem(STORAGE_KEYS.nome) || "",
    celular: localStorage.getItem(STORAGE_KEYS.celular) || "",
    email: localStorage.getItem(STORAGE_KEYS.email) || "",
    approvedValue: localStorage.getItem(STORAGE_KEYS.approvedValue)
        ? Number(localStorage.getItem(STORAGE_KEYS.approvedValue))
        : undefined,
});
