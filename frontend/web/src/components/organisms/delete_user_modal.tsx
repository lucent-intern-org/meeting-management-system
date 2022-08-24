import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteUser } from '../../api';
import { deleteUserModalVisibleState } from '../../atom';
import theme from '../../styles/theme';
import Text from '../atoms/text';

import AlertModal from './alert_modal';

const DeleteUserModal: React.FC = () => {
    const deleteUserModalVisible = useRecoilValue(deleteUserModalVisibleState);

    // 사용자 삭제
    const queryClient = useQueryClient();

    const deleteUserMutation = useMutation(() => deleteUser(deleteUserModalVisible.deleteUser), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    const deleteUserConfirm = async () => {
        deleteUserMutation.mutate();
    };

    return (
        <AlertModal
            header='사용자 삭제'
            setState={deleteUserModalVisibleState}
            confirmClick={() => {
                deleteUserConfirm();
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
