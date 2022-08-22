import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { meetingModifyModalState, userState } from '../../atom';
import { participants, rooms, users } from '../../temp_db';
import { meetingType, userType } from '../../types';
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

type dayDetailModalContentProps = {
    meeting: meetingType;
};

const DayDetailModalContent: React.FC<dayDetailModalContentProps> = ({
    meeting,
}: dayDetailModalContentProps) => {
    const [meetingModifyModal, setMeetingModifyModal] = useRecoilState(meetingModifyModalState);
    const [pu, setPu] = React.useState<userType[]>([]);
    const user = useRecoilValue(userState);

    React.useEffect(() => {
        setPu(
            participants.map((p) => {
                return users.find((u) => {
                    return p.meetingId === meeting.meetingId && u.slackId === p.slackId;
                });
            }) as userType[],
        );
    }, [meeting]);

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
                            return user.email.length > 0 && user.name.length > 0
                                ? setMeetingModifyModal({
                                      visible: !meetingModifyModal.visible,
                                      meeting: meeting,
                                      participants: pu,
                                  })
                                : alert('로그인이 필요합니다.');
                        }}
                    >
                        수정
                    </Text>
                    <Text
                        fontSize={0.8}
                        fontWeight={300}
                        onClick={() => {
                            console.log(meeting);
                            console.log(pu);
                        }}
                    >
                        삭제
                    </Text>
                </div>
            </FlexRow>
        </Container>
    );
};

export default React.memo(DayDetailModalContent);
