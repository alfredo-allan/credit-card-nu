const STORAGE_KEYS = {
    cpf: 'userCpf',
    nome: 'userNome',
    celular: 'userCelular',
    email: 'userEmail',
};

export const saveUserData = (key: keyof typeof STORAGE_KEYS, value: string) => {
    localStorage.setItem(STORAGE_KEYS[key], value);
};

export const getUserData = () => ({
    cpf: localStorage.getItem(STORAGE_KEYS.cpf) || '',
    nome: localStorage.getItem(STORAGE_KEYS.nome) || '',
    celular: localStorage.getItem(STORAGE_KEYS.celular) || '',
    email: localStorage.getItem(STORAGE_KEYS.email) || '',
});
