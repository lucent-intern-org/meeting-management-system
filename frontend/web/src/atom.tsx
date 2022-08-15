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
    default: false,
});

export const logInModalVisibleState = atom({
    key: 'LogInModal',
    default: false,
});

export const userSignUpInfoState = atom({
    key: 'UserSignUpInfo',
    default: { slackId: '', name: '', email: '', group: '', role: '' },
});

export const loginState = atom({ key: 'login', default: false });

export const isAdminState = atom({ key: 'isAdmin', default: false });
