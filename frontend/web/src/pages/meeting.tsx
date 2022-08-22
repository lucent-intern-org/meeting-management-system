/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import {
    dayDetailModalState,
    isAdminState,
    loginState,
    meetingAddModalVisibleState,
} from '../atom';
import Calendar from '../templates/calendar';
import { meetings, rooms } from '../temp_db';
import { toStringDateByFormatting } from '../utils/date';

const Container = styled.div`
    padding: 3rem 5% 3rem 5%;
`;

const Meeting: React.FC = () => {
    const [dayDetailModal, setDayDetailModal] = useRecoilState(dayDetailModalState);
    const [meetingAddModalVisible, setMeetingAddModalVisible] = useRecoilState(
        meetingAddModalVisibleState,
    );

    const [login, setLogin] = useRecoilState(loginState);
    const setIsAdmin = useSetRecoilState(isAdminState);

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            setLogin(!login);
            if (localStorage.getItem('admin')) {
                setIsAdmin(true);
            }
        }
    }, []);

    return (
        <Container>
            <Calendar
                customButtons={{
                    addMeeting: {
                        text: '미팅 추가',
                        click: () => {
                            return login &&
                                localStorage.getItem('name') &&
                                localStorage.getItem('email')
                                ? setMeetingAddModalVisible(!meetingAddModalVisible)
                                : alert('로그인이 필요합니다.');
                        },
                    },
                }}
                headerToolBar={{
                    left: 'addMeeting',
                    center: 'prev,title,next',
                    right: 'dayGridWeek,dayGridMonth',
                }}
                dateClick={(info: DateClickArg | EventClickArg) => {
                    return info.jsEvent.type === 'mouseup'
                        ? setDayDetailModal({
                              visible: !dayDetailModal.visible,
                              date: toStringDateByFormatting((info as DateClickArg).date),
                          })
                        : setDayDetailModal({
                              visible: !dayDetailModal.visible,
                              date: toStringDateByFormatting((info as EventClickArg).event.start!),
                          });
                }}
                events={meetings.map((meeting) => {
                    const meetingDate = meeting.date;
                    return {
                        title: meeting.title,
                        start: `${meetingDate}T${meeting.startTime}`,
                        end: `${meetingDate}T${meeting.endTime}`,
                        color: `${rooms[meeting.roomId].roomColor}`,
                    };
                })}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }}
                views={{
                    dayGridMonth: {
                        dayMaxEvents: 2,
                    },
                    dayGridWeek: {
                        dayMaxEvents: 15,
                    },
                }}
            />
        </Container>
    );
};

export default Meeting;
