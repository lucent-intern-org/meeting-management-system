/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from '@leecheuk/react-google-login';
import GoogleButton from 'react-google-button';
import Text from '../atoms/text';
import {
    signUpModalVisibleState,
    logInModalVisibleState,
    loginState,
    isAdminState,
} from '../../atom';
import ModalHeader from '../molecules/modal_header';
import theme from '../../styles/theme';
import CenteredModal from './centered_modal';
import FlexColumn from '../molecules/flex_column';
import ModalCloseButton from '../molecules/modal_close_button';
import { useGetAllUsers } from '../../api';

const LoginModal: React.FC = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
    const [signUpModalVisible, setSignUpModalVisible] = useRecoilState(signUpModalVisibleState);
    const [logInModalVisible, setLogInModalVisible] = useRecoilState(logInModalVisibleState);
    const [login, setLogin] = useRecoilState(loginState);
    const setIsAdmin = useSetRecoilState(isAdminState);

    const { data: users } = useGetAllUsers();

    const authenticate = (email: string, name: string, token: string) => {
        let isMember = false;
        let role = 'user';

        for (let i = 0; i < users.data.length; i += 1) {
            console.log(users.data[i].email);
            if (users.data[i].email === email) {
                isMember = true;
                role = users.data[i].role;
                break;
            }
        }

        if (isMember) {
            setLogin(!login);
            if (role === 'admin') {
                localStorage.setItem('admin', 'true');
                setIsAdmin(true);
            }
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
        } else {
            alert('LUCETBLOCK의 회원이 아닙니다');
        }
        setLogInModalVisible(!logInModalVisible);
    };

    const onLoginSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        let profile = { email: '', name: '' };
        let token = '';
        if ('profileObj' in res) {
            profile = res.profileObj;
        }
        if ('tokenId' in res) {
            token = res.tokenId;
        }
        authenticate(profile.email, profile.name, token);
        console.log(res);
    };

    return (
        <CenteredModal width={28} height={25}>
            <ModalCloseButton state={logInModalVisibleState} />
            <FlexColumn>
                <ModalHeader>로그인</ModalHeader>
                <FlexColumn>
                    <GoogleLogin
                        clientId={googleClientId}
                        onSuccess={onLoginSuccess}
                        onFailure={(error) => {
                            console.log(error);
                        }}
                        pluginName='googleLogin'
                        isSignedIn={false}
                        render={(props) => (
                            <GoogleButton
                                style={{
                                    width: '15rem',
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                                onClick={props.onClick}
                            >
                                Sign in with Google
                            </GoogleButton>
                        )}
                    />

                    <div style={{ marginTop: '6rem', paddingBottom: '2rem' }}>
                        <Text fontSize={0.7}>아직 회원이 아니신가요? </Text>
                        <Text
                            fontSize={0.7}
                            color={theme.submitBtnColor}
                            onClick={() => {
                                setSignUpModalVisible((prev) => ({
                                    ...prev,
                                    visible: !signUpModalVisible.visible,
                                }));

                                setLogInModalVisible(!logInModalVisible);
                            }}
                        >
                            회원가입
                        </Text>
                    </div>
                </FlexColumn>
            </FlexColumn>
        </CenteredModal>
    );
};

export default LoginModal;
