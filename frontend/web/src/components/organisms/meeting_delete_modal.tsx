import React from 'react';
import { useRecoilValue } from 'recoil';
import { meetingDeleteModalState } from '../../atom';
import Text from '../atoms/text';
import AlertModal from './alert_modal';

const MeetingDeleteModal: React.FC = () => {
    const meetingDeleteModal = useRecoilValue(meetingDeleteModalState);

    return (
        <AlertModal
            header='미팅 삭제'
            setState={meetingDeleteModalState}
            confirmClick={() => {
                // todo: delete meeting api call
                console.log('미팅 삭제');
                console.log(meetingDeleteModal.meetingId);
            }}
        >
            <Text fontSize={1} fontWeight={700} letterSpacing={0.05}>
                미팅을 삭제하시겠습니까?
            </Text>
        </AlertModal>
    );
};

export default MeetingDeleteModal;
