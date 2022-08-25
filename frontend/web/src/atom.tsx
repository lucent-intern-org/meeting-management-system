import { atom } from 'recoil';
import { roomType } from './types';

export const dayDetailModalState = atom({
    key: 'dayDetailModal',
    default: {
        visible: false,
        date: '0000-00-00',
    },
});

export const meetingAddModalVisibleState = atom({
    key: 'meetingAddModalVisible',
    default: false,
});

export const meetingModifyModalState = atom({
    key: 'meetingModifyModal',
    default: {
        visible: false,
        meeting: {
            title: '',
            date: '0000-00-00',
            startTime: '00:00',
            endTime: '00:00',
            repeat: 'none',
            content: '',
            meetingId: -9999,
            roomId: -9999,
        },
        participants: [{ slackId: '', name: '', email: '', groupId: -9999, role: '' }],
    },
});

export const meetingDeleteModalState = atom({
    key: 'meetingDeleteModal',
    default: {
        visible: false,
        meetingId: -9999,
    },
});

export const signUpModalVisibleState = atom({
    key: 'signUpModalVisible',
    default: {
        visible: false,
        signUpUser: { slackId: '', name: '', email: '', groupId: -1000, role: '' },
    },
});

export const logInModalVisibleState = atom({
    key: 'LogInModalVisible',
    default: false,
});

export const userSignUpInfoState = atom({
    key: 'UserSignUpInfo',
    default: { slackId: '', name: '', email: '', groupId: -1000, role: '' },
});

export const loginState = atom({ key: 'login', default: false });

export const isAdminState = atom({ key: 'isAdmin', default: false });

export const adminPageState = atom({ key: 'adminPage', default: 'users' });

export const addUserModalVisibleState = atom({ key: 'addUserModalVisible', default: false });

export const modifyUserModalVisibleState = atom({
    key: 'modifyUserModalVisible',
    default: {
        visible: false,
        modifyUser: { slackId: '', name: '', email: '', groupId: -1000, role: '' },
    },
});

export const deleteUserModalVisibleState = atom({
    key: 'deleteUserModalVisible',
    default: {
        visible: false,
        deleteUser: { slackId: '', name: '', email: '', groupId: -1000, role: '' },
    },
});

export const addRoomModalVisibleState = atom({ key: 'addRoomModalVisible', default: false });

export const modifyRoomModalVisibleState = atom({
    key: 'modifyRoomModalVisible',
    default: {
        visible: false,
        modifyRoom: { roomId: -9999, roomColor: '', roomName: '' },
    },
});

export const deleteRoomModalVisibleState = atom({
    key: 'deleteRoomModalVisible',
    default: {
        visible: false,
        deleteRoom: { roomId: -9999, roomColor: '', roomName: '' },
    },
});

export const logoutModalVisibleState = atom({ key: 'logoutModalVisible', default: false });
