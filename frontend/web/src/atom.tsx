import { atom } from 'recoil';

export const dayDetailModalState = atom({
    key: 'dayDetailModalState',
    default: {
        visible: false,
        date: new Date(),
    },
});

export const signUpModalVisibleState = atom({
    key: 'signUpModal',
    default: {
        visible: false,
        signUpUser: { slackId: '', name: '', email: '', groupId: -1000, role: '' },
    },
});

export const logInModalVisibleState = atom({
    key: 'LogInModal',
    default: false,
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

export const logoutModalVisibleState = atom({ key: 'logoutModalVisible', default: false });
