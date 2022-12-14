/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUserModalVisibleState, modifyUserModalVisibleState } from '../../atom';
import theme from '../../styles/theme';
import CenteredModal from './centered_modal';
import ModalCloseButton from '../molecules/modal_close_button';
import CustomButton from '../atoms/custom_button';
import Input from '../atoms/input';
import DropDown from '../atoms/drop_down';
import FlexColumn from '../molecules/flex_column';
import FlexRow from '../molecules/flex_row';
import { addUser, modifyUser, useGetAllGroups } from '../../api';
import { userType } from '../../types';

const UserModal: React.FC = () => {
    const [addUserModalVisible, setAddUserModalVisible] = useRecoilState(addUserModalVisibleState);
    const [modifyUserModalVisible, setModifyUserModalVisible] = useRecoilState(
        modifyUserModalVisibleState,
    );
    const [validation, setValidation] = useState(false);

    const { data: groups } = useGetAllGroups();

    const [userInfo, setUserInfo] = useState<userType>(
        addUserModalVisible
            ? {
                  slackId: '',
                  name: '',
                  email: '',
                  groupId: -1000,
                  role: '',
              }
            : modifyUserModalVisible.modifyUser,
    );

    const regEmail =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    const validateSubmit = () => {
        return !(
            userInfo.slackId.length >= 1 &&
            userInfo.slackId.length <= 15 &&
            (userInfo.slackId[0] === 'W' || userInfo.slackId[0] === 'U') &&
            userInfo.name.length >= 1 &&
            userInfo.name.length <= 10 &&
            userInfo.email.length >= 1 &&
            userInfo.email.length <= 40 &&
            userInfo.groupId >= 0 &&
            userInfo.role.length > 0 &&
            regEmail.test(userInfo.email)
        );
    };

    React.useEffect(() => {
        const debounce = setTimeout(() => {
            setValidation(validateSubmit());
        }, 200);
        return () => {
            clearTimeout(debounce);
        };
    }, [userInfo]);

    const onChange = (key: string, value: string | number) => {
        setUserInfo((prev) => ({ ...prev, [key]: value }));
    };

    const changeModalOpen = () => {
        return addUserModalVisible
            ? setAddUserModalVisible(!addUserModalVisible)
            : setModifyUserModalVisible((prev) => ({
                  ...prev,
                  visible: !modifyUserModalVisible.visible,
              }));
    };

    const queryClient = useQueryClient();

    // ????????? ??????
    const addUserMutation = useMutation(() => addUser(userInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const addUserConfirm = async () => {
        addUserMutation.mutate();
    };

    // ????????? ??????
    const modifyUserMutation = useMutation(() => modifyUser(userInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const modifyUserConfirm = async () => {
        modifyUserMutation.mutate();
    };

    const roles = [{ roleName: 'user' }, { roleName: 'admin' }];

    return (
        <CenteredModal width={30} height={35}>
            <ModalCloseButton
                state={addUserModalVisible ? addUserModalVisibleState : modifyUserModalVisibleState}
            />
            <FlexColumn>
                <Input
                    type='text'
                    placeholder=' Slack ID'
                    letterSpacing={0.15}
                    width='15rem'
                    marginTop='2vh'
                    value={userInfo.slackId}
                    disabled={modifyUserModalVisible.visible}
                    onChange={(e: { target: { value: string } }) => {
                        onChange('slackId', e.target.value);
                    }}
                />
                <Input
                    type='text'
                    placeholder=' Name'
                    letterSpacing={0.15}
                    width='15rem'
                    value={userInfo.name}
                    disabled={modifyUserModalVisible.visible}
                    onChange={(e: { target: { value: string } }) => {
                        onChange('name', e.target.value);
                    }}
                />
                <Input
                    type='text'
                    placeholder=' Email'
                    letterSpacing={0.15}
                    width='15rem'
                    value={userInfo.email}
                    disabled={modifyUserModalVisible.visible}
                    onChange={(e: { target: { value: string } }) => {
                        onChange('email', e.target.value);
                    }}
                />
                <DropDown
                    onChange={(e: { target: { value: string } }) => {
                        const g = groups.data.find(
                            (val: { groupName: string; groupId: string }) =>
                                val.groupName === e.target.value,
                        );
                        onChange('groupId', g!.groupId);
                    }}
                    placeholder='Position'
                    letterSpacing={0.15}
                    margin={0}
                    width={54.25}
                    options={groups.data}
                    defaultValue={
                        userInfo.groupId < 0 ? 'default' : groups.data[userInfo.groupId].groupName
                    }
                />
                <DropDown
                    onChange={(e: { target: { value: string } }) => {
                        onChange('role', e.target.value);
                    }}
                    placeholder='Role'
                    letterSpacing={0.15}
                    margin={0}
                    width={54.25}
                    options={roles}
                    defaultValue={userInfo.role}
                />
                <div style={{ width: '100%' }}>
                    <FlexRow justifyContent='space-around'>
                        <CustomButton
                            bgColor={validation ? theme.cancelBtnColor : theme.submitBtnColor}
                            width={30}
                            verticalPadding={0.3}
                            marginRight={0}
                            disabled={validation}
                            onClick={() => {
                                console.log(userInfo);
                                if (addUserModalVisible) {
                                    // ????????? ??????
                                    addUserConfirm();
                                } else {
                                    // ????????? ??????
                                    modifyUserConfirm();
                                }
                                changeModalOpen();
                            }}
                        >
                            {addUserModalVisible ? '??????' : '??????'}
                        </CustomButton>
                        <CustomButton
                            bgColor={theme.cancelBtnColor}
                            width={30}
                            verticalPadding={0.3}
                            marginRight={0}
                            onClick={() => {
                                changeModalOpen();
                            }}
                        >
                            ??????
                        </CustomButton>
                    </FlexRow>
                </div>
            </FlexColumn>
        </CenteredModal>
    );
};

export default UserModal;
