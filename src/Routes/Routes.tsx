import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/HomePage/HomePage';
import CheckFormUserPage from '../Pages/HomePage/CheckFormUserPage/CheckFormUserPage';
import LoadingPage from '../Pages/LoadingPage/LoadingPage'; // Importe a página de carregamento

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CheckFormUserPage" element={<CheckFormUserPage />} />
                {/* Rota temporária de carregamento */}
                <Route
                    path="/Loading"
                    element={<LoadingPage />}
                />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
