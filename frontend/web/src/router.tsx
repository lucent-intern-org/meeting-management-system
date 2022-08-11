import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DayDetailModal from './components/organisms/day_detail_modal';
import Header from './components/organisms/header';
import Meeting from './pages/meeting';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <DayDetailModal />
            <Header />
            <Routes>
                <Route path='/' element={<Meeting />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
