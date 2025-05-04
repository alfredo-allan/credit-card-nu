import React from 'react';
import imageDesktop from '../../Assets/Img/nubank-home-sobre-superficie-geometrica-p.avif';
import imageMobile from '../../Assets/Img/nubank-home-sobre-superficie-geometrica-mobile.png'
import styles from './CardOverTable.module.css'; // Importe o arquivo de estilos CSS Module, se quiser usar

interface CardOverTableProps { }

const CardOverTable: React.FC<CardOverTableProps> = () => {
    const isMobile = window.innerWidth < 768; // Exemplo de breakpoint para mobile

    return (
        <div className={styles['container-overlay-card']}>
            <div className="my-5 d-flex flex-column align-items-center">
                <div className={styles['content-overlay-card']}>
                    <img
                        src={isMobile ? imageMobile : imageDesktop}
                        alt="Imagem do Content Header"
                        className={styles['image-overlay-card']}
                    />
                </div>

                <div className={styles['content-overlay-cards-text']}>
                    <h1 className={styles['title']}>Conta do Nubank</h1>
                    <p className={styles['paragraph']}>
                        Uma conta digital que te dá controle sobre o seu dinheiro. Com o seu Assistente de Pagamentos, seus boletos ficam em dia sem dor de cabeça.                </p>
                </div>
            </div>
        </div>
    );
};

export default CardOverTable;