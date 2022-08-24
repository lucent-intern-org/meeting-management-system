/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DateClickArg } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/react';
import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { useGetAllGroups, useGetAllMeetings, useGetAllRooms } from '../api';
import {
    dayDetailModalState,
    isAdminState,
    loginState,
    meetingAddModalVisibleState,
} from '../atom';
import Loading from '../components/molecules/loading';
import Calendar from '../templates/calendar';
import { meetingType } from '../types';
import { toStringDateByFormatting } from '../utils/date';

const Container = styled.div`
    padding: 3rem 5% 3rem 5%;
`;

const Meeting: React.FC = () => {
    const [dayDetailModal, setDayDetailModal] = useRecoilState(dayDetailModalState);
    const [meetingAddModalVisible, setMeetingAddModalVisible] = useRecoilState(
        meetingAddModalVisibleState,
    );
    const meetings = useGetAllMeetings();
    const rooms = useGetAllRooms();
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

    const renderByStatus = React.useCallback(() => {
        const status = [meetings.status, rooms.status];
        if (status.includes('loading')) {
            return <Loading />;
        }
        if (status.includes('error')) {
            if (meetings.error instanceof Error) {
                return <div>Error: {meetings.error.message}</div>;
            }
            return <div>Error!!</div>;
        }
        return (
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
                events={meetings.data.data.map((meeting: meetingType) => {
                    const meetingDate = meeting.date;
                    return {
                        title: meeting.title,
                        start: `${meetingDate}T${meeting.startTime}`,
                        end: `${meetingDate}T${meeting.endTime}`,
                        color: `${rooms.data.data[meeting.roomId].roomColor}`,
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
        );
    }, [meetings, rooms]);

    return <Container>{renderByStatus()}</Container>;
};

export default Meeting;
