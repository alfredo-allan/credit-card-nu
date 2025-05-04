import React from 'react';
import Header from '../../Components/Header/Header'; // Ajuste o caminho se necessário
import ContentHeader from '../../Components/ContentHeader/ContentHeader'; // Ajuste o caminho se necessário
import Footer from '../../Components/Footer/Footer'; // Importe o Footer também
import OverlayCard from '../../Components/OverlayCard/OverlayCard';
import styles from './HomePage.module.css'
import CardOverTable from '../../Components/CardOverTable/CardOverTable';
import BoxBenifits from '../../Components/BoxBenefits/BoxBenefits';
import ContentTitleBenefits from '../../Components/ContentTitleBenefits/ContentTitleBenefits';
import BoxScrambled from '../../Components/BoxScrambled/BoxSrambled';

const HomePage: React.FC = () => {
    return (
        <div className={styles['content-home-page']}>
            <Header />
            <main>
                <ContentHeader />
                <OverlayCard />
                <CardOverTable />
                <div className={styles['content-iteration-benefits']}>
                    <ContentTitleBenefits />
                    <div className={styles['content-iteration-box-benefits']}>
                        <BoxBenifits />
                    </div>
                </div>
                <BoxScrambled />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;