import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteRoomModalVisibleState } from '../../atom';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const DeleteRoomModal: React.FC = () => {
    const deleteRoomModalVisible = useRecoilValue(deleteRoomModalVisibleState);

    return (
        <AlertModal
            header='회의실 삭제'
            setState={deleteRoomModalVisibleState}
            confirmClick={() => {
                // TODO: backend로 deleteRoom 보내서 삭제시키고 테이블 reload
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
