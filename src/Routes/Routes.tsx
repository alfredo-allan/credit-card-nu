import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Pages/HomePage/HomePage';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Adicione a rota para a página da sacola */}
            </Routes>
        </Router>
    );
}

export default AppRoutes;