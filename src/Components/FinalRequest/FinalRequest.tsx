import React from 'react';
import styles from './FinalRequest.module.css'; // Importe o CSS Module
import image1 from '../../Assets/Img/cartao-nu-quadrada-conteudo-dinamico-desktop.jpg'
const FinalRequest: React.FC = () => {
    return (
        <div className={styles['container-form']}>

            <h1 className={styles['title']}>Tenha N possibilidades na sua vida. Peça seu Nubank.</h1>
            <div className={styles['content-form']}>
                <form className={styles['form']}>
                    <h1 className={styles['title-form']} >Peça seu Cartão e abra já sua Conta</h1>
                    <input type="text" placeholder="Digite seu CPF" className={styles['cpf-input-form']} />
                    <button type="submit" className={styles['btn-continue']} >
                        Continuar <span className={styles['arrow-form']} aria-hidden="true">&gt;</span>
                    </button>
                </form>
                <div className={styles['content-image']}>
                    <img className={styles['image']} src={image1} alt="" />
                </div>
            </div>
        </div>
    );
};

export default FinalRequest;