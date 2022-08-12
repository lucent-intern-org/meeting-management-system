import { atom } from 'recoil';

const signUpModalVisibleState = atom({
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

export const LogInState = atom({ key: 'IsLogIn', default: false });

export default signUpModalVisibleState;
