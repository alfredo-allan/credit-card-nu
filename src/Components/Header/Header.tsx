import React from 'react';
import logo from '../../Assets/Img/content-logo-nu.png'; // Importe a sua imagem aqui
import './Header.module.css'; // Importe o arquivo de estilos CSS Module, se quiser usar
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import styles from './Header.module.css';

interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    const navigate = useNavigate(); // Inicialize o hook useNavigate

    const handleLogoClick = () => {
        navigate('/'); // Navega para a rota '/' (página inicial)
    };

    return (
        <header className={styles['custom-footer']}>
            <img
                src={logo}
                alt="Logo da Aplicação"
                onClick={handleLogoClick} // Adicione o evento onClick à imagem
                className={styles['logo-header']}
            />
            <div className={styles['content-btn-home-nu']}>

                <button className={styles['btn-home-nu']}>Quero ser Nubank</button>
            </div>
        </header>
    );
};

export default Header;