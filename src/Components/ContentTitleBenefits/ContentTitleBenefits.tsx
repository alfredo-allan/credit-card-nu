import React from 'react';
import styles from './ContentTitleBenefits.module.css'; // Importe o CSS Module

const ContentTitleBenefits: React.FC = () => {
    return (
        <div className={styles['content-title']}>
            <h1 className={styles['title']}>Tudo que você precisa em um único app</h1>
        </div>
    );
};

export default ContentTitleBenefits;