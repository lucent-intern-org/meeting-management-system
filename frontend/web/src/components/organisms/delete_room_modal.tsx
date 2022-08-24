import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteRoom } from '../../api';
import { deleteRoomModalVisibleState } from '../../atom';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const DeleteRoomModal: React.FC = () => {
    const deleteRoomModalVisible = useRecoilValue(deleteRoomModalVisibleState);

    // 회의실 삭제
    const queryClient = useQueryClient();

    const deleteRoomMutation = useMutation(() => deleteRoom(deleteRoomModalVisible.deleteRoom), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const deleteRoomConfirm = async () => {
        deleteRoomMutation.mutate();
    };

    return (
        <AlertModal
            header='회의실 삭제'
            setState={deleteRoomModalVisibleState}
            confirmClick={() => {
                deleteRoomConfirm();
            }}
        >
            <div>
                <Text
                    fontSize={1}
                    fontWeight={700}
                    letterSpacing={0.05}
                    color={deleteRoomModalVisible.deleteRoom.roomColor}
                >
                    {deleteRoomModalVisible.deleteRoom.roomName}
                </Text>
                <Text fontSize={1} fontWeight={700} letterSpacing={0.05}>
                    을 삭제하시겠습니까?
                </Text>
            </div>
        </AlertModal>
    );
};

export default DeleteRoomModal;
