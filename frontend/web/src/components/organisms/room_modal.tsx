/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { SketchPicker } from 'react-color';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import theme from '../../styles/theme';
import CenteredModal from './centered_modal';
import ModalCloseButton from '../molecules/modal_close_button';
import CustomButton from '../atoms/custom_button';
import Input from '../atoms/input';
import FlexColumn from '../molecules/flex_column';
import FlexRow from '../molecules/flex_row';
import { roomType } from '../../types';
import { addRoom, useGetAllRooms, modifyRoom } from '../../api';
import { addRoomModalVisibleState, modifyRoomModalVisibleState } from '../../atom';

const RoomModal: React.FC = () => {
    const [addRoomModalVisible, setAddRoomModalVisible] = useRecoilState(addRoomModalVisibleState);
    const [modifyRoomModalVisible, setModifyRoomModalVisible] = useRecoilState(
        modifyRoomModalVisibleState,
    );
    const { data: rooms } = useGetAllRooms();

    const [roomInfo, setRoomInfo] = useState<roomType>(
        addRoomModalVisible
            ? {
                  roomId: rooms!.length,
                  roomColor: '#000000',
                  roomName: '',
              }
            : modifyRoomModalVisible.modifyRoom,
    );

    const onChange = (key: string, value: string | number) => {
        setRoomInfo((prev) => ({ ...prev, [key]: value }));
    };

    const changeModalOpen = () => {
        return addRoomModalVisible
            ? setAddRoomModalVisible(!addRoomModalVisible)
            : setModifyRoomModalVisible((prev) => ({
                  ...prev,
                  visible: !modifyRoomModalVisible.visible,
              }));
    };

    const isDuplication = () => {
        let hasName = false;
        for (let i = 0; i < rooms!.length; i += 1) {
            if (
                rooms![i].roomName === roomInfo.roomName ||
                rooms![i].roomColor === roomInfo.roomColor
            ) {
                hasName = true;
            }
        }

        return hasName;
    };

    const hasBlank = () => {
        return roomInfo.roomName === '';
    };

    const queryClient = useQueryClient();

    // 회의실 추가
    const addRoomMutation = useMutation(() => addRoom(roomInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const addRoomConfirm = async () => {
        addRoomMutation.mutate();
    };

    // 회의실 수정
    const modifyRoomMutation = useMutation(() => modifyRoom(roomInfo), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const modifyRoomConfirm = async () => {
        modifyRoomMutation.mutate();
    };

    return (
        <CenteredModal width={30} height={35}>
            <ModalCloseButton
                state={addRoomModalVisible ? addRoomModalVisibleState : modifyRoomModalVisibleState}
            />
            <FlexColumn horizontalPadding={6}>
                <Input
                    type='text'
                    placeholder='회의실 명'
                    letterSpacing={0.15}
                    marginTop='2vh'
                    fontSize={1}
                    value={roomInfo.roomName}
                    onChange={(e: { target: { value: string } }) => {
                        onChange('roomName', e.target.value);
                    }}
                />
                <SketchPicker
                    color={roomInfo.roomColor}
                    onChangeComplete={(color) => {
                        onChange('roomColor', color.hex);
                    }}
                />
                <div style={{ width: '100%' }}>
                    <FlexRow justifyContent='space-between'>
                        <CustomButton
                            bgColor={theme.submitBtnColor}
                            width={35}
                            verticalPadding={0.3}
                            marginRight={0}
                            onClick={() => {
                                if (isDuplication()) {
                                    alert('이름이 같거나 색상이 같은 회의실이 존재합니다');
                                } else if (hasBlank()) {
                                    alert('회의실 이름을 작성해주세요');
                                } else {
                                    if (addRoomModalVisible) {
                                        addRoomConfirm();
                                    } else {
                                        modifyRoomConfirm();
                                    }

                                    changeModalOpen();
                                }
                                console.log(roomInfo);
                            }}
                        >
                            {addRoomModalVisible ? '추가' : '수정'}
                        </CustomButton>
                        <CustomButton
                            bgColor={theme.cancelBtnColor}
                            width={35}
                            verticalPadding={0.3}
                            marginRight={0}
                            onClick={() => {
                                changeModalOpen();
                            }}
                        >
                            취소
                        </CustomButton>
                    </FlexRow>
                </div>
            </FlexColumn>
        </CenteredModal>
    );
};

export default RoomModal;
