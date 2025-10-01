import React, { useEffect, useState } from "react";
import styles from "./PaymentForm.module.css";
import { getAddressByCep } from "./api";
import {
    loadFormData,
    saveFormData,
    PaymentFormData,
    defaultFormData,
    validateCPF,
    validateEmail,
    validatePhone,
    validateCEP,
} from "../../utils/form";

interface PaymentFormProps {
    userData?: Partial<Pick<PaymentFormData, "cpf" | "nome" | "celular" | "email" | "approvedValue">>;
    onFormComplete?: (formData: PaymentFormData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ userData, onFormComplete }) => {
    const [formData, setFormData] = useState<PaymentFormData>(defaultFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    // Inicializa com dados salvos ou props
    useEffect(() => {
        const saved = loadFormData();
        setFormData({
            ...defaultFormData,
            ...saved,
            ...userData,
            approvedValue: saved.approvedValue ?? userData?.approvedValue ?? undefined,
        });
    }, [userData]);

    // ---------- Validação ----------
    const validateField = (name: string, value: string | boolean) => {
        switch (name) {
            case "cpf":
                return !value || !validateCPF(value as string) ? "CPF inválido" : "";
            case "email":
                return !value || !validateEmail(value as string) ? "E-mail inválido" : "";
            case "celular":
                return !value || !validatePhone(value as string) ? "Celular inválido" : "";
            case "cep":
                return !value || !validateCEP(value as string) ? "CEP inválido" : "";
            case "nome":
            case "rua":
            case "numero":
            case "bairro":
            case "cidade":
            case "uf":
                return !value ? "Campo obrigatório" : "";
            case "consent":
                return value ? "" : "Você precisa aceitar os termos";
            default:
                return "";
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            const value = formData[key as keyof PaymentFormData];
            if (typeof value === "string" || typeof value === "boolean") {
                const error = validateField(key, value);
                if (error) newErrors[key] = error;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ---------- Handlers ----------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        let fieldValue: string | boolean = type === "checkbox" ? checked : value;

        // Máscaras automáticas
        if (name === "cpf" && typeof fieldValue === "string") {
            fieldValue = fieldValue
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }

        if (name === "celular" && typeof fieldValue === "string") {
            fieldValue = fieldValue
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "($1) $2")
                .replace(/(\d{5})(\d)/, "$1-$2");
        }

        if (name === "cep" && typeof fieldValue === "string") {
            fieldValue = fieldValue.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
        }

        setFormData((prev) => ({ ...prev, [name]: fieldValue }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, fieldValue) }));
    };

    const handleCepBlur = async () => {
        const cep = formData.cep.replace(/\D/g, "");
        if (!validateCEP(cep)) {
            setErrors((prev) => ({ ...prev, cep: "CEP inválido" }));
            return;
        }

        try {
            setLoading(true);
            const data = await getAddressByCep(cep);
            if (data.erro) {
                setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }));
                return;
            }

            setFormData((prev) => ({
                ...prev,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                uf: data.uf,
            }));
            setErrors((prev) => ({ ...prev, cep: "" }));
        } catch {
            setErrors((prev) => ({ ...prev, cep: "Erro ao buscar o CEP" }));
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        saveFormData(formData);
        if (onFormComplete) onFormComplete(formData);
    };

    const isFormValid =
        Object.values(errors).every((err) => !err) &&
        formData.consent &&
        !loading;

    // ---------- Render ----------
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {[
                { name: "cpf", type: "text", placeholder: "CPF" },
                { name: "nome", type: "text", placeholder: "Nome completo" },
                { name: "celular", type: "text", placeholder: "Celular" },
                { name: "email", type: "email", placeholder: "E-mail" },
                { name: "cep", type: "text", placeholder: "CEP", onBlur: handleCepBlur },
                { name: "rua", type: "text", placeholder: "Rua" },
                { name: "numero", type: "text", placeholder: "Número" },
                { name: "complemento", type: "text", placeholder: "Complemento (opcional)" },
                { name: "bairro", type: "text", placeholder: "Bairro" },
                { name: "cidade", type: "text", placeholder: "Cidade" },
                { name: "uf", type: "text", placeholder: "UF", maxLength: 2 },
            ].map((field) => {
                const isCheckbox = field.name === "consent";
                const value =
                    typeof formData[field.name as keyof PaymentFormData] === "string"
                        ? (formData[field.name as keyof PaymentFormData] as string)
                        : undefined;
                const checked =
                    typeof formData[field.name as keyof PaymentFormData] === "boolean"
                        ? (formData[field.name as keyof PaymentFormData] as boolean)
                        : undefined;

                return (
                    <React.Fragment key={field.name}>
                        <input
                            {...field}
                            value={isCheckbox ? undefined : value}
                            checked={isCheckbox ? checked : undefined}
                            onChange={handleChange}
                            disabled={!!(
                                userData &&
                                userData[field.name as keyof typeof userData]
                            )}
                            className={`${styles.input} ${errors[field.name] ? styles.inputError : ""
                                }`}
                        />
                        {errors[field.name] && (
                            <span className={styles.error}>{errors[field.name]}</span>
                        )}
                    </React.Fragment>
                );
            })}

            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                />
                Li e aceito a Política de Privacidade.
            </label>
            {errors.consent && <span className={styles.error}>{errors.consent}</span>}

            <button type="submit" className={styles.button} disabled={!isFormValid}>
                {loading
                    ? "Verificando..."
                    : onFormComplete
                        ? "Continuar para Pagamento"
                        : "Salvar"}
            </button>
        </form>
    );
};

export default PaymentForm;
