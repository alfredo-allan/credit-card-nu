import React from 'react';
import imageMobile from '../../Assets/Img/image-mobile-.png'; // Importe a imagem para mobile
import imageDesktop from '../../Assets/Img/image-desktop.png'; // Importe a imagem para desktop
import styles from './ContentHeader.module.css'; // Importe o arquivo de estilos CSS Module, se quiser usar

interface ContentHeaderProps { }

const ContentHeader: React.FC<ContentHeaderProps> = () => {
    const isMobile = window.innerWidth < 768; // Exemplo de breakpoint para mobile

    return (
        <div className="my-5 d-flex flex-column align-items-center">
            <img
                src={isMobile ? imageMobile : imageDesktop}
                alt="Imagem do Content Header"
                className={styles['content-image']}
            />
            <h1 className={styles['title']}>Tenha N possibilidades na vida com Nubank</h1>
            <div className={styles['content-form']}>
                <form className={styles['form']}>
                    <h1 className={styles['title-form']} >Com o Nubank, a resposta vem em menos de 1 minuto</h1>
                    <input type="text" placeholder="Digite seu CPF" className={styles['cpf-input-form']} />
                    <button type="submit" className={styles['btn-continue']} >
                        Continuar <span className={styles['arrow-form']} aria-hidden="true">&gt;</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContentHeader;