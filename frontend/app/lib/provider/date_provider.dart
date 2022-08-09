import 'package:flutter/material.dart';

class DateProvider extends ChangeNotifier {
  final DateTime today = DateTime.now();
  DateTime focusedDay = DateTime.now();
  DateTime selectedDay = DateTime.now();
  int calenderIndex = 2; //default : month Calender
  void setCalender(DateTime date) {
    focusedDay = date;
    notifyListeners();
  }

  void setday(DateTime focusedDay, DateTime selectedDay) {
    this.focusedDay = focusedDay;
    this.selectedDay = selectedDay;
    notifyListeners();
  }

  void setcalenderIndex(int calenderIndex) {
    this.calenderIndex = calenderIndex;
    notifyListeners();
  }
}
