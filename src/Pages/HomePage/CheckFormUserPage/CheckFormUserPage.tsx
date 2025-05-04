import React from 'react';
import styles from './CheckFormUserPage.module.css'
import CheckFormUser from '../../../Components/CheckFormUser/CheckFormUser';

const CheckFomrUserPage: React.FC = () => {
    return (
        <div className={styles['content-check-form-page']}>
            <CheckFormUser />
        </div>
    );
};

export default CheckFomrUserPage;