import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { deleteMeeting } from '../../api';
import { meetingDeleteModalState } from '../../atom';
import Text from '../atoms/text';
import AlertModal from './alert_modal';

const MeetingDeleteModal: React.FC = () => {
    const queryClient = useQueryClient();
    const meetingDeleteModal = useRecoilValue(meetingDeleteModalState);
    const deleteMeetingMutation = useMutation((meetingId: number) => deleteMeeting(meetingId), {
        onSuccess: () => {
            queryClient.invalidateQueries(['meetings']);
            queryClient.invalidateQueries([
                'participants',
                { meetingId: meetingDeleteModal.meetingId },
            ]);
        },
    });
    return (
        <AlertModal
            header='미팅 삭제'
            setState={meetingDeleteModalState}
            confirmClick={() => {
                deleteMeetingMutation.mutate(meetingDeleteModal.meetingId, {});
            }}
        >
            <Text fontSize={1} fontWeight={700} letterSpacing={0.05}>
                미팅을 삭제하시겠습니까?
            </Text>
        </AlertModal>
    );
};

export default MeetingDeleteModal;
