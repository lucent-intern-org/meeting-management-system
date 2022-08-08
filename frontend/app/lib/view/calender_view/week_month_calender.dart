import 'package:app/provider/date_provider.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:provider/provider.dart';

class MonthCalender extends StatefulWidget {
  MonthCalender({Key? key}) : super(key: key);

  @override
  State<MonthCalender> createState() => _MonthCalenderState();
}

class _MonthCalenderState extends State<MonthCalender> {
  late DateTime _focusedDay;
  late DateTime _selectedDay;
  late CalendarFormat format;

  @override
  void initState() {
    super.initState();
    _focusedDay = Provider.of<DateProvider>(context, listen: false).focusedDay;
    _selectedDay =
        Provider.of<DateProvider>(context, listen: false).selectedDay;
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
          locale: 'ko-KR',
          currentDay: DateTime.now(),
          focusedDay: _focusedDay,
          firstDay: DateTime.utc(2010, 10, 16),
          lastDay: DateTime.utc(2030, 3, 14),
          onPageChanged: (DateTime dateTime) {
            Provider.of<DateProvider>(context, listen: false)
                .setCalender(dateTime);
          },
          eventLoader: (day) {
            return [];
          },
          onDaySelected: _onDaySelected,
          selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
        ),
      ),
      Container(
        //width: MediaQuery.of(context).size.width,
        alignment: Alignment.centerRight,
        child: IconButton(onPressed: () {}, icon: Icon(Icons.add)),
      ),
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
    }
  }
}
