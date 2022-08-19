import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DayDetailModal from './components/organisms/day_detail_modal';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    meetingAddModalVisibleState,
} from './atom';

import Header from './components/organisms/header';
import SignupModal from './components/organisms/signup_modal';
import Meeting from './pages/meeting';
import LoginModal from './components/organisms/login_modal';
import MeetingAddModal from './components/organisms/meeting_add_modal';

const Router: React.FC = () => {
    const signUpModalOpen = useRecoilValue(signUpModalVisibleState);
    const loginModalOpen = useRecoilValue(logInModalVisibleState);
    const meetingAddModalVisible = useRecoilValue(meetingAddModalVisibleState);
    return (
        <BrowserRouter>
            <DayDetailModal />
            <Header />
            {signUpModalOpen && <SignupModal />}
            {loginModalOpen && <LoginModal />}
            {meetingAddModalVisible && <MeetingAddModal />}
            <Routes>
                <Route path='/' element={<Meeting />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
