/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useSetRecoilState } from 'recoil';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from '@leecheuk/react-google-login';
import Input from '../atoms/input';
import Text from '../atoms/text';
import { signUpModalVisibleState, logInModalVisibleState, LogInState } from '../../atom';
import ModalHeader from '../molecules/modal_header';
import { users } from '../../temp_db';

const Background = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    background: rgb(0, 0, 0, 0.5);
`;

const Container = styled.div`
    width: 33vw;
    height: 50vh;
    position: relative;
    border-radius: 2%;
    text-align: center;
    padding: 2vh;
    background-color: white;
    box-shadow: 1px 1px 13px #4a4848;
`;

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
    const setIsLogIn = useSetRecoilState(LogInState);

    const authenticate = (email: string, token: string) => {
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
        authenticate(profile.email, token);

        console.log(res);
    };

    return ReactDOM.createPortal(
        <Background>
            <Container>
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
                    <Text color='#808080' fontSize={0.7}>
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
            </Container>
        </Background>,
        document.getElementById('modal-root')!,
    );
};

export default LoginModal;
