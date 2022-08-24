import React from 'react';
import FullCalendar, {
    ButtonTextCompoundInput,
    CssDimValue,
    CustomButtonInput,
    DateFormatter,
    EventClickArg,
    EventSourceInput,
    FormatterInput,
    PluginDef,
    ToolbarInput,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import styled from 'styled-components';

const Container = styled.div`
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

    .fc .fc-daygrid-day-frame {
        cursor: pointer;
    }

    .fc .fc-daygrid-day-events .fc-daygrid-event .fc-event-main .fc-event-main-frame {
        flex-direction: column;
        align-items: center;
    }

    .fc .fc-daygrid-day-events .fc-daygrid-event .fc-event-main {
        font-size: 0.5rem;
        font-weight: 400;
    }
`;

type CalendarProps = {
    plugins?: PluginDef[];
    initialView?: string;
    customButtons: { [name: string]: CustomButtonInput };
    headerToolBar: false | ToolbarInput;
    buttonText?: ButtonTextCompoundInput;
    dateClick: (arg: DateClickArg | EventClickArg) => void;
    events?: EventSourceInput;
    displayEventEnd?: boolean;
    eventTimeFormat: FormatterInput | DateFormatter;
    eventDisplay?: string;
    fixedWeekCount?: boolean;
    height?: CssDimValue;
    views: {
        dayGridMonth: {
            dayMaxEvents: number;
        };
        dayGridWeek: {
            dayMaxEvents: number;
        };
    };
};

const Calendar: React.FC<CalendarProps> = ({
    plugins = [dayGridPlugin, interactionPlugin],
    initialView = 'dayGridWeek',
    customButtons,
    headerToolBar,
    buttonText = {
        month: 'Month',
        week: 'Week',
    },
    dateClick,
    events,
    displayEventEnd = true,
    eventTimeFormat,
    eventDisplay = 'block',
    fixedWeekCount = false,
    height = 'auto',
    views,
}: CalendarProps) => {
    return (
        <Container>
            <FullCalendar
                plugins={plugins}
                initialView={initialView}
                customButtons={customButtons}
                headerToolbar={headerToolBar}
                buttonText={buttonText}
                dateClick={dateClick}
                events={events}
                displayEventEnd={displayEventEnd}
                eventTimeFormat={eventTimeFormat}
                eventDisplay={eventDisplay}
                fixedWeekCount={fixedWeekCount}
                height={height}
                views={views}
                eventClick={dateClick}
            />
        </Container>
    );
};

export default Calendar;
