import React from 'react';
import styled from 'styled-components';
import { participants, rooms, users } from '../../temp_db';
import Text from '../atoms/text';
import FlexRow from './flex_row';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
`;

const ContentContainer = styled.div`
    padding-top: 0.5rem;
`;

type Meeting = {
    meetingId: number;
    roomId: number;
    date: Date;
    startTime: string;
    endTime: string;
    title: string;
    content: string;
    repeat: string;
};

type dayDetailModalContentProps = {
    meeting: Meeting;
};

const DayDetailModalContent: React.FC<dayDetailModalContentProps> = ({
    meeting,
}: dayDetailModalContentProps) => {
    return (
        <Container>
            <FlexRow>
                <Text fontSize={1.5} fontWeight={800}>
                    {meeting.title}
                </Text>
                <div>
                    <Text fontSize={1} color={rooms[meeting.roomId].roomColor}>{`[${
                        rooms[meeting.roomId].roomName
                    }] `}</Text>
                    <Text fontSize={1}>{`${meeting.startTime} ~ `}</Text>
                    <Text fontSize={1}>{meeting.endTime}</Text>
                </div>
            </FlexRow>
            <FlexRow>
                <div>
                    {participants.map((p) => {
                        const pu = users.find((u) => {
                            return p.meetingId === meeting.meetingId && u.slackId === p.slackId;
                        });
                        if (pu !== undefined) {
                            return (
                                <Text fontSize={0.8} fontWeight={400} key={pu?.slackId}>
                                    {`${pu?.name} `}
                                </Text>
                            );
                        }
                    })}
                </div>
                <Text fontSize={0.8} fontWeight={300}>
                    {meeting.repeat}
                </Text>
            </FlexRow>
            <ContentContainer>{meeting.content}</ContentContainer>
            <FlexRow>
                <div />
                <div>
                    <Text fontSize={0.8} fontWeight={300} onClick={() => {}}>
                        수정
                    </Text>
                    <Text fontSize={0.8} fontWeight={300} onClick={() => {}}>
                        삭제
                    </Text>
                </div>
            </FlexRow>
        </Container>
    );
};

export default DayDetailModalContent;
