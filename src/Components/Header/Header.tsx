import React from 'react';
import logo from '../../Assets/Img/content-logo-nu.png';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/'); // Vai para home
    };

    const handleBecomeNubankClick = () => {
        navigate('/CheckFormUserPage'); // Vai para a página de checkout/form
    };

    return (
        <header className={styles['custom-footer']}>
            <img
                src={logo}
                alt="Logo da Aplicação"
                onClick={handleLogoClick}
                className={styles['logo-header']}
            />
            <div className={styles['content-btn-home-nu']}>
                <button
                    className={styles['btn-home-nu']}
                    onClick={handleBecomeNubankClick}
                >
                    Quero ser Nubank
                </button>
            </div>
        </header>
    );
};

export default Header;
