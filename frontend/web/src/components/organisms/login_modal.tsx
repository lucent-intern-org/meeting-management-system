/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import styled from 'styled-components';

import { useSetRecoilState } from 'recoil';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from '@leecheuk/react-google-login';
import Input from '../atoms/input';
import Text from '../atoms/text';
import { signUpModalVisibleState, logInModalVisibleState, loginState, userState } from '../../atom';
import ModalHeader from '../molecules/modal_header';
import { users } from '../../temp_db';
import theme from '../../styles/theme';
import CenteredModal from './centered_modal';

const MarginTop = styled.div`
    margin-top: 6vh;
`;

const Align = styled.div`
    margin-top: 1vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
`;

const LoginModal: React.FC = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    const setSignUpModalOpen = useSetRecoilState(signUpModalVisibleState);
    const setLogInModalOpen = useSetRecoilState(logInModalVisibleState);
    const [keepLogIn, setKeepLogIn] = useState(false);
    const setIsLogIn = useSetRecoilState(loginState);
    const setUser = useSetRecoilState(userState);

    const authenticate = (email: string, name: string, token: string) => {
        let isMember = false;
        console.log(email);
        /*
        if ) db에 인자로 들어온 email이 있으면 ?
        - 로그인 ok.
        - token 저장
        - 모달 닫기
        
        if ) db에 이 email이 없으면?
        - 로그인 x
        */

        for (let i = 0; i < users.length; i += 1) {
            if (users[i].email === email) {
                isMember = true;

                break;
            }
        }

        if (isMember) {
            setIsLogIn(true);
            setUser({ email: email, name: name });

            if (keepLogIn) {
                localStorage.setItem('token', token);
            }
        } else {
            alert('LUCETBLOCK의 회원이 아닙니다');
        }

        setLogInModalOpen(false);
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
        <CenteredModal width={25} height={30}>
            <ModalHeader setState={logInModalVisibleState}>로그인</ModalHeader>
            <MarginTop>
                <GoogleLogin
                    clientId={googleClientId}
                    onSuccess={onLoginSuccess}
                    onFailure={(error) => {
                        console.log(error);
                    }}
                    pluginName='googleLogin'
                    isSignedIn={keepLogIn}
                />
            </MarginTop>

            <Align>
                <Input
                    type='checkbox'
                    onChange={(e) => {
                        setKeepLogIn(e.target.checked);
                    }}
                />
                <Text color={theme.inputColor} fontSize={0.7}>
                    로그인 상태 유지할래요.
                </Text>
            </Align>
            <br />
            <Text fontSize={0.7}>아직 회원이 아니신가요?</Text>
            <Text
                marginTop='6vh'
                fontSize={0.7}
                color='#346DF1'
                onClick={() => {
                    setLogInModalOpen(false);
                    setSignUpModalOpen(true);
                }}
            >
                회원가입
            </Text>
        </CenteredModal>
    );
};

export default LoginModal;
