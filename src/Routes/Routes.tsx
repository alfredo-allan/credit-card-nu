import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/HomePage/HomePage';
import CheckFomrUserPage from '../Pages/HomePage/CheckFormUserPage/CheckFormUserPage';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/CheckFormUserPage' element={<CheckFomrUserPage />} />
                {/* Adicione a rota para a página da sacola */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;