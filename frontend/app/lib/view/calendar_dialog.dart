import 'package:app/view_model/update_metting_view_model.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';

class CalendarDialog extends StatefulWidget {
  CalendarDialog(this.updateMettingViewModel, {Key? key}) : super(key: key);
  final UpdateMettingViewModel updateMettingViewModel;
  @override
  State<CalendarDialog> createState() =>
      _CalendarDialogState(updateMettingViewModel);
}

class _CalendarDialogState extends State<CalendarDialog> {
  _CalendarDialogState(this.updateMettingViewModel);
  final UpdateMettingViewModel updateMettingViewModel;
  String? date;
  DateTime? _focusedDay;
  DateTime? _selectedDay;

  @override
  void initState() {
    date = updateMettingViewModel.updateMeetingModel.date;
    print(date);
    _focusedDay = DateTime(int.parse(date!.substring(0, 4)),
        int.parse(date!.substring(4, 6)), int.parse(date!.substring(6, 8)));
    _selectedDay = _focusedDay;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      // RoundedRectangleBorder - Dialog 화면 모서리 둥글게 조절
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      content: Container(
        height: 400,
        child: TableCalendar(
          headerStyle: HeaderStyle(formatButtonVisible: false),
          calendarStyle: const CalendarStyle(
              weekendTextStyle: TextStyle(color: Colors.red)),
          locale: 'ko-KR', //한국어
          currentDay: DateTime.now(),
          focusedDay: _focusedDay!,
          firstDay: DateTime.utc(2010, 10, 16),
          lastDay: DateTime.utc(2030, 3, 14),
          onDaySelected: (DateTime selectedDay, DateTime focusedDay) {
            if (!isSameDay(_selectedDay, selectedDay)) {
              setState(() {
                _selectedDay = selectedDay;
                _focusedDay = focusedDay;
              });
            }
          },
          selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
        ),
      ),
      actions: <Widget>[
        TextButton(
          child: new Text("확인"),
          onPressed: () {
            updateMettingViewModel.updateMeetingModel.date =
                DateFormat('yyyyMMdd').format(_selectedDay!);
            Navigator.pop(context, true);
          },
        ),
      ],
    );
  }
}
