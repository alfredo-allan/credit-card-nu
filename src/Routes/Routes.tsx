import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/HomePage/HomePage';
import CheckFormUserPage from '../Pages/HomePage/CheckFormUserPage/CheckFormUserPage';
import PrivacyPolicy from '../Pages/PrivacyPolicy/PrivacyPolicy';
import LoadingPage from '../Pages/LoadingPage/LoadingPage';
import PaymentRequestPage from '../Pages/PaymentRequestPage/PaymentRequestPage';
import PaymentCheckoutPage from '../Pages/PaymentCheckoutPage/PaymentCheckoutPage'; // Nova página

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CheckFormUserPage" element={<CheckFormUserPage />} />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

                {/* Fluxo de pagamento em páginas separadas */}
                <Route path="/PaymentRequestPage" element={<PaymentRequestPage />} />
                <Route path="/PaymentCheckout" element={<PaymentCheckoutPage />} />

                {/* Rota temporária de carregamento */}
                <Route path="/Loading" element={<LoadingPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;