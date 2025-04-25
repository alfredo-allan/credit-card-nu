import React from 'react';
import imageMobile from '../../Assets/Img/cartoes-sobrepostos-mobile.png'; // Importe a imagem para mobile
import imageDesktop from '../../Assets/Img/cartoes-sobrepostos-desktop.png'; // Importe a imagem para desktop
import styles from './OverlayCard.module.css'; // Importe o arquivo de estilos CSS Module, se quiser usar

interface OverlayCardProps { }

const OverlayCard: React.FC<OverlayCardProps> = () => {
    const isMobile = window.innerWidth < 768; // Exemplo de breakpoint para mobile

    return (
        <div className="container my-5 d-flex flex-column align-items-center">
            <img
                src={isMobile ? imageMobile : imageDesktop}
                alt="Imagem do Content Header"
                className={styles['content-image']}
            />
            <div className={styles['content-overlay-cards-text']}>
                <h1 className={styles['title']}>Cartão de crédito</h1>
                <p className={styles['paragraph']}>
                    Não é apenas um cartão: dá pra pagar boleto no crédito, criar cartão virtual, fazer Pix no crédito, parcelar compras, criar cartão adicional e muito mais.
                </p>
            </div>
        </div>
    );
};

export default OverlayCard;