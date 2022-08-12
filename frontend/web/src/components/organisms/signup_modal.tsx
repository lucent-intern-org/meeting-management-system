/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from '@leecheuk/react-google-login';
import ModalHeader from '../molecules/modal_header';
import DropDown from '../atoms/drop_down';
import Input from '../atoms/input';
import Text from '../atoms/text';

import signUpModalVisibleState, { logInModalVisibleState, userSignUpInfoState } from '../../atom';
import { groups } from '../../temp_db';

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
    margin-top: 5vh;
`;

const SignupModal: React.FC = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

    const setSignUpModalOpen = useSetRecoilState(signUpModalVisibleState);
    const setLogInModalOpen = useSetRecoilState(logInModalVisibleState);
    const setUserSignUpInfo = useSetRecoilState(userSignUpInfoState);
    const [slackId, setSlackId] = useState('');
    const [position, setPosition] = useState('');
    const info = useRecoilValue(userSignUpInfoState);

    const addUserInfo = (email: string, name: string) => {
        setUserSignUpInfo({
            slackId: slackId,
            group: position,
            email: email,
            name: name,
            role: 'user',
        });
        console.log(info);
    };

    const onSignUpSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        let profile = { email: '', name: '' };
        // let token;
        if ('profileObj' in res) {
            profile = res.profileObj;
        }
        // if ('tokenId' in res) {
        //     token = res.tokenId;
        // }
        addUserInfo(profile.email, profile.name);
    };

    const hasBlank = () => {
        if (slackId === '' || position === '') {
            return true;
        }
        return false;
    };

    return ReactDOM.createPortal(
        <Background>
            <Container>
                <ModalHeader setState={signUpModalVisibleState}>회원가입</ModalHeader>
                <Input
                    type='text'
                    placeholder='Slack ID'
                    letterSpacing={0.15}
                    width={305}
                    marginTop='3vh'
                    onChange={(e) => {
                        setSlackId(e.target.value);
                    }}
                />
                <br />
                <DropDown
                    onChange={(e) => {
                        setPosition(e.target.value);
                    }}
                    placeholder='Position'
                    letterSpacing={0.15}
                    options={groups}
                />
                <br />
                <MarginTop>
                    <GoogleLogin
                        clientId={googleClientId}
                        onSuccess={onSignUpSuccess}
                        onFailure={(error: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                            console.log(error);
                        }}
                        pluginName='googleSignup'
                        buttonText='Sign up with Google'
                        disabled={hasBlank()}
                    />
                </MarginTop>
                <br />
                <Text fontSize={0.7}>이미 계정이 있으신가요?</Text>
                <Text
                    marginTop='3vh'
                    fontSize={0.7}
                    color='#346DF1'
                    onClick={() => {
                        setSignUpModalOpen(false);
                        setLogInModalOpen(true);
                    }}
                >
                    로그인
                </Text>
            </Container>
        </Background>,
        document.getElementById('modal-root')!,
    );
};

export default SignupModal;
