import React from 'react';
import styled from 'styled-components';

import Calendar from '../templates/calendar';

const Container = styled.div`
    padding: 3rem 5% 3rem 5%;
`;

const Meeting: React.FC = () => {
    return (
        <Container>
            <Calendar
                customButtons={{
                    addMeeting: {
                        text: '미팅 추가',
                        click: () => {
                            console.log('미팅 추가');
                        },
                    },
                }}
                headerToolBar={{
                    left: 'addMeeting',
                    center: 'prev,title,next',
                    right: 'dayGridWeek,dayGridMonth',
                }}
            />
        </Container>
    );
};

export default Meeting;
