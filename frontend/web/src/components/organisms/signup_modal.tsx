/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import CenteredModal from './centered_modal';
import theme from '../../styles/theme';
import FlexColumn from '../molecules/flex_column';
import ModalCloseButton from '../molecules/modal_close_button';
import { addUser, useGetAllGroups } from '../../api';
import { userType } from '../../types';
import Loading from '../molecules/loading';

const SignupModal: React.FC = () => {
    const googleClientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
    const [signUpModalVisible, setSignUpModalVisible] = useRecoilState(signUpModalVisibleState);
    const [logInModalVisible, setLogInModalVisible] = useRecoilState(logInModalVisibleState);
    const [slackId, setSlackId] = useState<string>('');
    const [groupId, setGroupId] = useState<number>(-9999);
    const [position, setPosition] = useState<string>('');

    const { data: groups } = useGetAllGroups();

    const toNum = (p: string) => {
        const groupName = groups.data.find((data: { groupName: string; groupId: string }) => {
            return data.groupName === p;
        });

        return groupName!.groupId;
    };

    const queryClient = useQueryClient();

    // 사용자 추가
    const addUserMutation = useMutation((userInfo: userType) => addUser(userInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const addUserConfirm = (userInfo: userType) => {
        addUserMutation.mutate(userInfo);
        setSignUpModalVisible((prev) => ({
            ...prev,
            visible: !signUpModalVisible.visible,
        }));
    };

    const onSignUpSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        // let token;
        if ('profileObj' in res) {
            const profile = res.profileObj;
            const data: userType = {
                slackId: slackId,
                groupId: groupId,
                email: profile.email,
                name: profile.name,
                role: 'user',
            };
            addUserConfirm(data);
        }
        // if ('tokenId' in res) {
        //     token = res.tokenId;
        // }
    };

    const validation = () => {
        return !(
            slackId.length >= 1 &&
            slackId.length <= 15 &&
            (slackId[0] === 'W' || slackId[0] === 'U') &&
            position !== ''
        );
    };

    return groups !== undefined ? (
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
                            setGroupId(toNum(e.target.value));
                            setPosition(e.target.value);
                        }}
                        placeholder='Position'
                        letterSpacing={0.15}
                        options={groups.data}
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
                        buttonText='Sign up with Google'
                        disabled={validation()}
                        render={(props) => (
                            <GoogleButton
                                style={{
                                    width: '20rem',
                                    backgroundColor: 'white',
                                    color: validation() ? theme.inputColor : 'black',
                                }}
                                onClick={props.onClick}
                                disabled={props.disabled}
                                label='Sign up with Google'
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
    ) : (
        <CenteredModal width={34} height={34}>
            <Loading />
        </CenteredModal>
    );
};

export default SignupModal;
