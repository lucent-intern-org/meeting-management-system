import 'package:app/model/meeting.dart';
import 'package:app/provider/date_provider.dart';
import 'package:app/test/test_data.dart';
import 'package:app/view/add_meeting.dart';
import 'package:app/view/detail_meeting.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:provider/provider.dart';

class WeekMonthCalender extends StatefulWidget {
  WeekMonthCalender({Key? key}) : super(key: key);

  @override
  State<WeekMonthCalender> createState() => _WeekMonthCalenderState();
}

class _WeekMonthCalenderState extends State<WeekMonthCalender> {
  late ValueNotifier<List<Meeting>> _selectedEvents;

  List<List<Meeting>> meetings = TestData().meetings;
  late DateTime _focusedDay;
  late DateTime _selectedDay;
  late CalendarFormat format;

  @override
  void initState() {
    super.initState();
    _focusedDay = Provider.of<DateProvider>(context, listen: false).focusedDay;
    _selectedDay =
        Provider.of<DateProvider>(context, listen: false).selectedDay;
    _selectedEvents = ValueNotifier(meetings[_selectedDay.day.toInt()]);
  }

  @override
  Widget build(BuildContext context) {
    if (Provider.of<DateProvider>(context, listen: false).calenderIndex == 2) {
      format = CalendarFormat.month;
    } else {
      format = CalendarFormat.week;
    }
    return SafeArea(
        child: Column(children: [
      Container(
        child: TableCalendar(
          calendarFormat: format,
          headerVisible: false,
          calendarStyle: const CalendarStyle(
              weekendTextStyle: TextStyle(color: Colors.red)),
          locale: 'ko-KR', //한국어
          currentDay: DateTime.now(),
          focusedDay: _focusedDay,
          firstDay: DateTime.utc(2010, 10, 16),
          lastDay: DateTime.utc(2030, 3, 14),
          onPageChanged: (DateTime dateTime) {
            Provider.of<DateProvider>(context, listen: false)
                .setCalender(dateTime);
          },
          eventLoader: (day) {
            if (meetings.length > day.day.toInt()) {
              return meetings[day.day.toInt()];
            }
            return [];
          },
          onDaySelected: _onDaySelected,
          selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
        ),
      ),
      Container(
        //width: MediaQuery.of(context).size.width,
        alignment: Alignment.centerRight,
        child: IconButton(
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: ((context) => AddMeeting(
                            date: _selectedDay.toString(),
                          ))));
            },
            icon: Icon(Icons.add)),
      ),
      ValueListenableBuilder<List<Meeting>>(
        valueListenable: _selectedEvents,
        builder: (context, value, _) {
          return ListView.builder(
            //해당 일의 회의리스트
            shrinkWrap: true,
            itemCount: value.length,
            itemBuilder: (context, index) {
              return Container(
                margin: const EdgeInsets.symmetric(
                  horizontal: 12.0,
                  vertical: 4.0,
                ),
                decoration: BoxDecoration(
                  border: Border.all(),
                  borderRadius: BorderRadius.circular(12.0),
                ),
                child: ListTile(
                  onTap: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: ((context) =>
                                DetailMeeting(meeting: value[index]))));
                  },
                  title: Text(
                      '${value[index].startTime} ~ ${value[index].endTime} : ${value[index].title}'),
                ),
              );
            },
          );
        },
      )
    ]));
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    if (!isSameDay(_selectedDay, selectedDay)) {
      setState(() {
        _selectedDay = selectedDay;
        _focusedDay = focusedDay;
      });
      Provider.of<DateProvider>(context, listen: false)
          .setday(focusedDay, selectedDay);
      _selectedEvents.value = meetings[_selectedDay.day.toInt()];
    }
  }
}
