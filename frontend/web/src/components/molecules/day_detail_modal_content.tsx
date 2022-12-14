/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { useGetAllRooms, useGetAllUsers, useGetDayMeetingParticipants } from '../../api';
import { meetingDeleteModalState, meetingModifyModalState } from '../../atom';
import { meetingType, participantType, userType } from '../../types';
import Text from '../atoms/text';
import FlexRow from './flex_row';
import Loading from './loading';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
`;

const ContentContainer = styled.div`
    padding-top: 0.5rem;
`;

type dayDetailModalContentProps = {
    meeting: meetingType;
};

const DayDetailModalContent: React.FC<dayDetailModalContentProps> = ({
    meeting,
}: dayDetailModalContentProps) => {
    const [meetingModifyModal, setMeetingModifyModal] = useRecoilState(meetingModifyModalState);
    const [meetingDeleteModal, setMeetingDeleteModal] = useRecoilState(meetingDeleteModalState);
    const [pu, setPu] = React.useState<userType[]>([]);
    const user = { email: localStorage.getItem('email'), name: localStorage.getItem('name') };
    const participants = useGetDayMeetingParticipants(meeting.meetingId);
    const rooms = useGetAllRooms();
    const users = useGetAllUsers();
    React.useEffect(() => {
        if (participants.status === 'success' && users.status === 'success') {
            setPu(
                participants.data.data.map((p: participantType) => {
                    return users.data.data.find((u: userType) => {
                        return p.meetingId === meeting.meetingId && u.slackId === p.slackId;
                    });
                }) as userType[],
            );
        }
    }, [meeting.meetingId, participants.status, participants.data, users.status]);

    const renderByStatus = React.useCallback(() => {
        switch (rooms.status) {
            case 'loading':
                return <Loading />;
            case 'error':
                if (rooms.error instanceof Error) {
                    return <div>Error: {rooms.error.message}</div>;
                }
                break;
            default:
                return (
                    <>
                        <FlexRow>
                            <Text fontSize={1.5} fontWeight={800}>
                                {meeting.title}
                            </Text>
                            <div>
                                <Text
                                    fontSize={1}
                                    color={rooms.data.data[meeting.roomId].roomColor}
                                >{`[${rooms.data.data[meeting.roomId].roomName}] `}</Text>
                                <Text fontSize={1}>{`${meeting.startTime} ~ `}</Text>
                                <Text fontSize={1}>{meeting.endTime}</Text>
                            </div>
                        </FlexRow>
                        <FlexRow>
                            <div>
                                {pu[0] &&
                                    pu.length > 0 &&
                                    pu.map((p) => {
                                        return (
                                            <Text fontSize={0.8} fontWeight={400} key={p.slackId}>
                                                {`${p.name} `}
                                            </Text>
                                        );
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
                                <Text
                                    fontSize={0.8}
                                    fontWeight={300}
                                    onClick={() => {
                                        return user.email && user.name
                                            ? setMeetingModifyModal({
                                                  visible: !meetingModifyModal.visible,
                                                  meeting: meeting,
                                                  participants: pu,
                                              })
                                            : alert('???????????? ???????????????.');
                                    }}
                                >
                                    ??????
                                </Text>
                                <Text
                                    fontSize={0.8}
                                    fontWeight={300}
                                    onClick={() => {
                                        return user.email && user.name
                                            ? setMeetingDeleteModal({
                                                  visible: !meetingDeleteModal.visible,
                                                  meetingId: meeting.meetingId,
                                              })
                                            : alert('???????????? ???????????????.');
                                    }}
                                >
                                    ??????
                                </Text>
                            </div>
                        </FlexRow>
                    </>
                );
        }
    }, [pu, rooms.status, meeting]);

    return <Container>{renderByStatus()}</Container>;
};

export default React.memo(DayDetailModalContent);
