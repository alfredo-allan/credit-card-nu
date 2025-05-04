import React, { useEffect, useRef } from 'react';
import styles from './BoxScrambled.module.css';
import image1 from '../../Assets/Img/pagamento-por-aproximacao-cartao-nubank-com-smart-watch-itens-esportivos-ptbr-cards-empilhados-desktop.jpg';
import image2 from '../../Assets/Img/mulher-consultando-aplicativo-nubank-no-celular-na-cozinha-e-homem-arrumando-porta-ptbr-cards-links-image-desktop.jpg';
import image3 from '../../Assets/Img/mulher-olhando-celular-e-comendo-fruta-em-uma-mesa-ptbr-cards-empilhados-desktop.jpg';

const cardsData = [
    { image: image1, title: "O fim da complexidade", description: "Para quem sabe que tecnologia e design são melhores do que agências e papelada." },
    { image: image2, title: "Controle total", description: "Gerencie sua vida financeira sem complicações." },
    { image: image3, title: "Foco em você", description: "Soluções simples para o seu dia a dia." },
];

const BoxScrambled: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = containerRef.current?.querySelectorAll(`.${styles.card}`);
        if (!cards) return;

        const onScroll = () => {
            const scrollY = window.scrollY;
            cards.forEach((card, index) => {
                const offset = index * 60;
                const top = card.getBoundingClientRect().top + window.scrollY;
                const relativeY = scrollY - top + offset;

                const translate = Math.max(0, relativeY);
                (card as HTMLElement).style.transform = `translateY(${translate}px)`;
            });
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={styles.contentContainer}>
            <div ref={containerRef} className={styles.container}>
                {cardsData.map((card, idx) => (
                    <div className={styles.card} key={idx}>
                        <h3 className={styles.title}>{card.title}</h3>
                        <img src={card.image} alt={card.title} className={styles.image} />
                        <p className={styles.description}>{card.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoxScrambled;
