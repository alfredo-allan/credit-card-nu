import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ApprovedProposal.module.css";
import { getUserData, saveUserData } from "../../utils/storage";

const ApprovedProposal: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [approvedValue, setApprovedValue] = useState<number | null>(null);

    useEffect(() => {
        const saved = getUserData();

        if (saved?.nome) {
            setUserName(saved.nome.split(" ")[0]); // só primeiro nome
        }

        if (saved?.approvedValue) {
            // já tem valor salvo
            setApprovedValue(saved.approvedValue);
        } else {
            // gera uma vez entre 2000–3500
            const randomValue = Math.floor(Math.random() * (3500 - 2000 + 1)) + 2000;
            setApprovedValue(randomValue);

            // ✅ salva como número mesmo
            saveUserData("approvedValue", randomValue);
        }

    }, []);

    const handleClose = () => navigate(-1);
    const handleProceed = () => navigate("/PaymentRequestPage");

    return (
        <div className={styles.modalWrapper}>
            <button className={styles.closeButton} onClick={handleClose}>
                X
            </button>

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Parabéns <span className={styles.username}>{userName}</span> 🎉
                </h1>
                <p className={styles.subtitle}>
                    Temos uma oferta de crédito aprovada para você no valor de:
                </p>
                {approvedValue !== null && (
                    <p className={styles.value}>
                        R$ {approvedValue.toLocaleString("pt-BR")}
                    </p>
                )}

                <button className={styles.button} onClick={handleProceed}>
                    Seguir
                </button>
            </div>
        </div>
    );
};

export default ApprovedProposal;
