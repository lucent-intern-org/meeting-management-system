import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DayDetailModal from './components/organisms/day_detail_modal';
import { signUpModalVisibleState, logInModalVisibleState } from './atom';

import Header from './components/organisms/header';
import SignupModal from './components/organisms/signup_modal';
import Meeting from './pages/meeting';
import LoginModal from './components/organisms/login_modal';

const Router: React.FC = () => {
    const signUpModalOpen = useRecoilValue(signUpModalVisibleState);
    const loginModalOpen = useRecoilValue(logInModalVisibleState);
    return (
        <BrowserRouter>
            <DayDetailModal />
            <Header />
            {signUpModalOpen && <SignupModal />}
            {loginModalOpen && <LoginModal />}
            <Routes>
                <Route path='/' element={<Meeting />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
