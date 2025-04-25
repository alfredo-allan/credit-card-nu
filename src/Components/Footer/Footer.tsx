import React from 'react';
import logoFooter from '../../Assets/Img/content-logo-footer.png'; // Importe a imagem para o footer
import styles from './Footer.module.css'; // Podemos criar um arquivo CSS simples para estilos não relacionados ao Bootstrap

interface FooterProps { }

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className={styles['content-footer']}>
            <div className="container d-flex justify-content-center align-items-center flex-column flex-md-row">
                <div className="content-logo-footer mb-2 mb-md-0">
                    <img className={styles['logo-footer']} src={logoFooter} alt="Logo do Footer" />
                </div>
                <span className="copyright ms-md-3">
                    &copy; {new Date().getFullYear()} Nu Pagamentos S.A - Instituição de Pagamento. 18.236.120/0001-58. Rua Capote Valente, 39 - São Paulo, SP - 05409-000
                </span>
            </div>
        </footer>
    );
};

export default Footer;