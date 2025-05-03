// BoxBenefits.tsx
import React from 'react';
import styles from './BoxBenefits.module.css';

interface Benefit {
    icon: string;
    title: string;
    description: string;
}

const benefitsData: Benefit[] = [
    {
        icon: '$',
        title: 'Dentro do app Nubank',
        description: 'Empréstimos, seguros e investimentos que combinam com cada momento da sua vida.',
    },
    {
        icon: '∞',
        title: 'Cashback na sua conta',
        description: 'Opções de investimentos a partir de R$ 1.',
    },
    {
        icon: '%',
        title: 'Descontos e ofertas especiais',
        description: 'Shopping com as melhores ofertas e 200 lojas no app do Nubank.',
    },
];

const BoxBenefits: React.FC = () => {
    return (
        <div className={styles.boxBenefits}>
            {benefitsData.map((benefit, index) => (
                <div key={index} className={styles.benefitCard}>
                    <div className={styles.icon}>{benefit.icon}</div>
                    <h3 className={styles.title}>{benefit.title}</h3>
                    <p className={styles.description}>{benefit.description}</p>
                </div>
            ))}
        </div>
    );
};

export default BoxBenefits;