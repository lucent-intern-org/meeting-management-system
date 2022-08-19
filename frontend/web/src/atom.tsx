import { atom } from 'recoil';

export const dayDetailModalState = atom({
    key: 'dayDetailModal',
    default: {
        visible: false,
        date: new Date(),
    },
});

export const meetingAddModalVisibleState = atom({
    key: 'meetingAddModalVisible',
    default: false,
});

export const signUpModalVisibleState = atom({
    key: 'signUpModalVisible',
    default: false,
});

export const logInModalVisibleState = atom({
    key: 'LogInModalVisible',
    default: false,
});

export const userSignUpInfoState = atom({
    key: 'UserSignUpInfo',
    default: { slackId: '', name: '', email: '', group: '', role: '' },
});

export const loginState = atom({ key: 'Login', default: false });

export const userState = atom({
    key: 'user',
    default: {
        email: '',
        name: '',
    },
});
