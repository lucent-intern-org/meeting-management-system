import React from 'react';
import FullCalendar, {
    ButtonTextCompoundInput,
    CustomButtonInput,
    PluginDef,
    ToolbarInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';

const Container = styled.div`
    /* padding: 3rem 5% 0 5%; */
    .fc {
        height: calc(100vh - 11rem);
    }

    .fc .fc-header-toolbar .fc-toolbar-chunk div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .fc .fc-addMeeting-button {
        width: 100%;
    }

    .fc .fc-toolbar-chunk:nth-child(1) {
        width: 14%;
    }
    .fc .fc-toolbar-chunk:nth-child(3) {
        width: 14%;
    }

    .fc .fc-toolbar-title {
        padding: 0 1rem 0 1rem;
    }

    .fc .fc-toolbar-chunk .fc-prev-button,
    .fc .fc-toolbar-chunk .fc-next-button {
        height: 2rem;
        width: 2rem;
        padding: 0;
    }

    .fc .fc-button {
        border: none;
    }

    .fc .fc-button-group > .fc-button {
        background-color: ${({ theme }) => theme.secondaryColor};
    }
    .fc .fc-button-group > .fc-button.fc-button-active,
    .fc .fc-button:hover,
    .fc .fc-button-primary {
        background-color: ${({ theme }) => theme.primaryColor};
    }

    .fc .fc-col-header-cell {
        background-color: ${({ theme }) => theme.primaryColor};
        color: white;
    }

    .fc .fc-col-header-cell .fc-scrollgrid-sync-inner {
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

type CalendarProps = {
    plugins?: PluginDef[];
    initialView?: string;
    customButtons: { [name: string]: CustomButtonInput };
    headerToolBar: false | ToolbarInput;
    buttonText?: ButtonTextCompoundInput;
};

const Calendar: React.FC<CalendarProps> = ({
    plugins = [dayGridPlugin],
    initialView = 'dayGridWeek',
    customButtons,
    headerToolBar,
    buttonText = {
        month: 'Month',
        week: 'Week',
    },
}: CalendarProps) => {
    return (
        <Container>
            <FullCalendar
                plugins={plugins}
                initialView={initialView}
                customButtons={customButtons}
                headerToolbar={headerToolBar}
                buttonText={buttonText}
            />
        </Container>
    );
};

export default Calendar;
