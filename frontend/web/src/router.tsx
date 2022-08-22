import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DayDetailModal from './components/organisms/day_detail_modal';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    meetingAddModalVisibleState,
    meetingModifyModalState,
    addUserModalVisibleState,
    logoutModalVisibleState,
    deleteUserModalVisibleState,
    modifyUserModalVisibleState,
} from './atom';

import Header from './components/organisms/header';
import SignupModal from './components/organisms/signup_modal';
import Meeting from './pages/meeting';
import Admin from './pages/admin';
import LoginModal from './components/organisms/login_modal';
import MeetingModal from './components/organisms/meeting_modal';
import UserModal from './components/organisms/user_modal';
import DeleteUserModal from './components/organisms/delete_user_modal';
import LogoutModal from './components/organisms/logout_modal';

const Router: React.FC = () => {
    const signUpModalOpen = useRecoilValue(signUpModalVisibleState);
    const loginModalOpen = useRecoilValue(logInModalVisibleState);
    const meetingAddModalVisible = useRecoilValue(meetingAddModalVisibleState);
    const meetingModifyModalVisible = useRecoilValue(meetingModifyModalState).visible;
    const addUserModalOpen = useRecoilValue(addUserModalVisibleState);
    const deleteModalOpen = useRecoilValue(deleteUserModalVisibleState);
    const logoutModalOpen = useRecoilValue(logoutModalVisibleState);
    const modifyUserModalOpen = useRecoilValue(modifyUserModalVisibleState);

    return (
        <BrowserRouter>
            <DayDetailModal />
            <Header />
            {signUpModalOpen.visible && <SignupModal />}
            {loginModalOpen && <LoginModal />}
            {(meetingAddModalVisible || meetingModifyModalVisible) && <MeetingModal />}
            {(addUserModalOpen || modifyUserModalOpen.visible) && <UserModal />}
            {deleteModalOpen.visible && <DeleteUserModal />}
            {logoutModalOpen && <LogoutModal />}
            <Routes>
                <Route path='/' element={<Meeting />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
