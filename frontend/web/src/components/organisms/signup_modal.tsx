/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import {
    GoogleLogin,
    GoogleLoginResponse,
    GoogleLoginResponseOffline,
} from '@leecheuk/react-google-login';
import GoogleButton from 'react-google-button';
import ModalHeader from '../molecules/modal_header';
import DropDown from '../atoms/drop_down';
import Input from '../atoms/input';
import Text from '../atoms/text';
import { signUpModalVisibleState, logInModalVisibleState } from '../../atom';
import { groups } from '../../temp_db';
import CenteredModal from './centered_modal';
import theme from '../../styles/theme';
import FlexColumn from '../molecules/flex_column';
import ModalCloseButton from '../molecules/modal_close_button';

const SignupModal: React.FC = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
    const [signUpModalVisible, setSignUpModalVisible] = useRecoilState(signUpModalVisibleState);
    const [logInModalVisible, setLogInModalVisible] = useRecoilState(logInModalVisibleState);
    const [slackId, setSlackId] = useState<string>('');
    const [position, setPosition] = useState<string>('');

    const toNum = (p: string) => {
        let id = 0;
        groups.map((group) => {
            if (group.groupName === p) {
                id = group.groupId;
            }
        });
        return id;
    };

    const addUserInfo = (email: string, name: string, p: number) => {
        setSignUpModalVisible({
            visible: !signUpModalVisible.visible,
            signUpUser: {
                slackId: slackId,
                groupId: p,
                email: email,
                name: name,
                role: 'user',
            },
        });
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
        addUserInfo(profile.email, profile.name, toNum(position));
    };

    const hasBlank = () => {
        return !(slackId.length >= 1 && slackId.length <= 15 && position !== '');
    };
    return (
        <CenteredModal width={34} height={34}>
            <ModalCloseButton state={signUpModalVisibleState} />
            <FlexColumn>
                <ModalHeader>회원가입</ModalHeader>
                <FlexColumn justifyContent='center'>
                    <Input
                        type='text'
                        placeholder=' Slack ID'
                        letterSpacing={0.15}
                        onChange={(e) => {
                            setSlackId(e.target.value);
                        }}
                    />
                    <DropDown
                        onChange={(e) => {
                            setPosition(e.target.value);
                        }}
                        placeholder='Position'
                        letterSpacing={0.15}
                        options={groups}
                        width={100}
                    />
                </FlexColumn>
                <FlexColumn justifyContent='space-around'>
                    <GoogleLogin
                        clientId={googleClientId}
                        onSuccess={onSignUpSuccess}
                        onFailure={(error: GoogleLoginResponse | GoogleLoginResponseOffline) => {
                            console.log(error);
                        }}
                        pluginName='googleSignup'
                        disabled={hasBlank()}
                        render={(props) => (
                            <GoogleButton
                                style={{
                                    width: '20rem',
                                    backgroundColor: 'white',
                                    color: hasBlank() ? theme.inputColor : 'black',
                                }}
                                onClick={props.onClick}
                                disabled={props.disabled}
                            >
                                Sign up with Google
                            </GoogleButton>
                        )}
                    />
                    <div>
                        <Text fontSize={0.7}>이미 계정이 있으신가요? </Text>
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
                            로그인
                        </Text>
                    </div>
                </FlexColumn>
            </FlexColumn>
        </CenteredModal>
    );
};
export default SignupModal;
