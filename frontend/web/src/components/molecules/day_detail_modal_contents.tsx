/* eslint-disable no-unused-expressions */
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dayDetailModalState } from '../../atom';
import { meetings } from '../../temp_db';
import DayDetailModalContent from './day_detail_modal_content';
import Text from '../atoms/text';
import FlexRow from './flex_row';

const Container = styled.div`
    padding-top: 2rem;
`;

const DayDetailModalContents: React.FC = () => {
    const dayDetailModal = useRecoilValue(dayDetailModalState);
    const filteredMeeting = meetings.filter((meeting) => {
        return meeting.date.getTime() === dayDetailModal.date.getTime();
    });
    return (
        <Container>
            {filteredMeeting.length !== 0 ? (
                filteredMeeting.map((meeting) => {
                    return <DayDetailModalContent meeting={meeting} key={meeting.meetingId} />;
                })
            ) : (
                <FlexRow>
                    <div />
                    <Text fontSize={1.6} fontWeight={700}>
                        🔒 회의가 아직 없습니다!
                    </Text>
                </FlexRow>
            )}
        </Container>
    );
};

export default DayDetailModalContents;
