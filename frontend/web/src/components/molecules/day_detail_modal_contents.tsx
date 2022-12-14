/* eslint-disable no-unused-expressions */
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { dayDetailModalState } from '../../atom';
import DayDetailModalContent from './day_detail_modal_content';
import Text from '../atoms/text';
import FlexRow from './flex_row';
import { useGetDayMeetings } from '../../api';
import { meetingType } from '../../types';
import Loading from './loading';

const Container = styled.div`
    padding-top: 2rem;
`;

const DayDetailModalContents: React.FC = () => {
    const dayDetailModal = useRecoilValue(dayDetailModalState);
    const dayMeetings = useGetDayMeetings(dayDetailModal.date);

    const renderByStatus = React.useCallback(() => {
        let sorted = [];
        switch (dayMeetings.status) {
            case 'loading':
                return <Loading />;
            case 'error':
                if (dayMeetings.error instanceof Error) {
                    return <div>Error: {dayMeetings.error.message}</div>;
                }
                break;
            default:
                sorted = dayMeetings.data.data.sort((a: meetingType, b: meetingType) => {
                    if (a.startTime > b.startTime) {
                        return 1;
                    }
                    if (a.startTime === b.startTime) {
                        if (a.endTime > b.endTime) {
                            return 1;
                        }
                        if (a.endTime < b.endTime) {
                            return -1;
                        }
                        return 0;
                    }
                    return -1;
                });
                return sorted.length !== 0 ? (
                    sorted.map((meeting: meetingType) => {
                        return <DayDetailModalContent meeting={meeting} key={meeting.meetingId} />;
                    })
                ) : (
                    <FlexRow>
                        <div />
                        <Text fontSize={1.6} fontWeight={700}>
                            ???? ????????? ?????? ????????????!
                        </Text>
                    </FlexRow>
                );
        }
    }, [dayMeetings]);

    return <Container>{renderByStatus()}</Container>;
};

export default DayDetailModalContents;
