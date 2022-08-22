import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteUserModalVisibleState } from '../../atom';
import theme from '../../styles/theme';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const DeleteUserModal: React.FC = () => {
    const deleteUserModalVisible = useRecoilValue(deleteUserModalVisibleState);

    return (
        <AlertModal
            header='사용자 삭제'
            setState={deleteUserModalVisibleState}
            confirmClick={() => {
                // TODO: backend로 delteUser 보내서 삭제시키고 초기화
            }}
        >
            <div>
                <Text fontSize={1} fontWeight={700} letterSpacing={0.05} color={theme.primaryColor}>
                    {deleteUserModalVisible.deleteUser.name}
                </Text>
                <Text fontSize={1} fontWeight={700} letterSpacing={0.05}>
                    님을 삭제하시겠습니까?
                </Text>
            </div>
        </AlertModal>
    );
};

export default DeleteUserModal;
