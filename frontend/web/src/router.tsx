import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import DayDetailModal from './components/organisms/day_detail_modal';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    meetingAddModalVisibleState,
    addUserModalVisibleState,
    logoutModalVisibleState,
    deleteUserModalVisibleState,
    modifyUserModalVisibleState,
    deleteRoomModalVisibleState,
    addRoomModalVisibleState,
    modifyRoomModalVisibleState,
} from './atom';

import Header from './components/organisms/header';
import SignupModal from './components/organisms/signup_modal';
import Meeting from './pages/meeting';
import Admin from './pages/admin';
import LoginModal from './components/organisms/login_modal';
import MeetingAddModal from './components/organisms/meeting_add_modal';
import UserModal from './components/organisms/user_modal';
import DeleteUserModal from './components/organisms/delete_user_modal';
import LogoutModal from './components/organisms/logout_modal';
import DeleteRoomModal from './components/organisms/delete_room_modal';
import RoomModal from './components/organisms/room_modal';

const Router: React.FC = () => {
    const signUpModalVisible = useRecoilValue(signUpModalVisibleState);
    const loginModalVisible = useRecoilValue(logInModalVisibleState);
    const meetingAddModalVisible = useRecoilValue(meetingAddModalVisibleState);
    const addUserModalVisible = useRecoilValue(addUserModalVisibleState);
    const deleteUserModalVisible = useRecoilValue(deleteUserModalVisibleState);
    const modifyUserModalVisible = useRecoilValue(modifyUserModalVisibleState);
    const addRoomModalVisible = useRecoilValue(addRoomModalVisibleState);
    const delteRoomModalVisible = useRecoilValue(deleteRoomModalVisibleState);
    const modifyRoomModalVisible = useRecoilValue(modifyRoomModalVisibleState);
    const logoutModalVisible = useRecoilValue(logoutModalVisibleState);

    return (
        <BrowserRouter>
            <DayDetailModal />
            <Header />
            {signUpModalVisible.visible && <SignupModal />}
            {loginModalVisible && <LoginModal />}
            {meetingAddModalVisible && <MeetingAddModal />}
            {(addUserModalVisible || modifyUserModalVisible.visible) && <UserModal />}
            {deleteUserModalVisible.visible && <DeleteUserModal />}
            {(addRoomModalVisible || modifyRoomModalVisible.visible) && <RoomModal />}
            {delteRoomModalVisible.visible && <DeleteRoomModal />}
            {logoutModalVisible && <LogoutModal />}
            <Routes>
                <Route path='/' element={<Meeting />} />
                <Route path='/admin' element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
