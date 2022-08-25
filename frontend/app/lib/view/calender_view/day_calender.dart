import 'package:app/model/meeting.dart';
import 'package:app/provider/date_provider.dart';
import 'package:app/view/add_meeting.dart';
import 'package:app/view/detail_meeting.dart';
import 'package:app/view_model/day_calendar_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class DayCalender extends StatefulWidget {
  DayCalender({Key? key}) : super(key: key);

  @override
  State<DayCalender> createState() => _DayCalenderState();
}

class _DayCalenderState extends State<DayCalender> {
  List<dynamic> list = [];

  DayCalendarViewModel dayCalendarViewModel = DayCalendarViewModel();

  late DateTime selectDay;

  late ValueNotifier<List<Meeting>> _selectedEvents;

  final PageController _pageController = PageController(initialPage: 100);

  int prepage = 100;
  late int year;
  late int month;
  late int day;

  @override
  Widget build(BuildContext context) {
    selectDay = Provider.of<DateProvider>(context, listen: true).selectedDay;
    year = selectDay.year.toInt();
    month = selectDay.month.toInt();
    day = selectDay.day.toInt();
    if (dayCalendarViewModel
            .getMeeting()[selectDay.toString().substring(0, 10)] !=
        null) {
      _selectedEvents = ValueNotifier(dayCalendarViewModel
          .getMeeting()[selectDay.toString().substring(0, 10)]!);
    } else {
      _selectedEvents = ValueNotifier([]);
    }
    print("aaaaa$_selectedEvents");

    return FutureBuilder(
      future: dayCalendarViewModel.initData(),
      builder: (context, snapshot) {
        if (snapshot.hasData == false) {
          return const SizedBox();
        } else {
          return SafeArea(
              child: Column(children: [
            SizedBox(
              height: 40,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                      flex: 1,
                      child: Container(
                          alignment: Alignment.center,
                          height: 40,
                          color: Colors.blue[200],
                          child: Text(
                            "$day일",
                            textAlign: TextAlign.center,
                          ))),
                  Expanded(
                      flex: 2,
                      child: Container(
                          height: 40,
                          alignment: Alignment.center,
                          color: Colors.red,
                          child: Text(
                              dayCalendarViewModel
                                  .meeting_form_model.roomList[0],
                              textAlign: TextAlign.center))),
                  Expanded(
                      flex: 2,
                      child: Container(
                          height: 40,
                          alignment: Alignment.center,
                          color: Colors.orange,
                          child: Text(
                              dayCalendarViewModel
                                  .meeting_form_model.roomList[1],
                              textAlign: TextAlign.center))),
                  Expanded(
                      flex: 2,
                      child: Container(
                          height: 40,
                          alignment: Alignment.center,
                          color: Colors.amber[200],
                          child: Text(
                              dayCalendarViewModel
                                  .meeting_form_model.roomList[2],
                              textAlign: TextAlign.center)))
                ],
              ),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height - 120,
              child: PageView.builder(
                scrollDirection: Axis.horizontal,
                controller: _pageController,
                itemCount: 200,
                onPageChanged: (index) {
                  //페이지 넘길때
                  if (index > prepage) {
                    //다음 페이지
                    selectDay = DateTime.utc(
                        selectDay.year.toInt(), //날짜 +1
                        selectDay.month.toInt(),
                        selectDay.day.toInt() + 1);
                  } else if (index < prepage) {
                    //이전 페이지
                    selectDay = DateTime.utc(
                        selectDay.year.toInt(), //날짜 -1
                        selectDay.month.toInt(),
                        selectDay.day.toInt() - 1);
                  }
                  Provider.of<DateProvider>(context, listen: false)
                      .setday(selectDay, selectDay); //날짜 저장
                  prepage = index; //이전 페이지에 현재페이지 번호저장
                },
                itemBuilder: (context, pageindex) {
                  return Container(
                    height: MediaQuery.of(context).size.height - 120,
                    child: ValueListenableBuilder<List<Meeting>>(
                        valueListenable: _selectedEvents,
                        builder: (context, value, _) {
                          return ListView.builder(
                            scrollDirection: Axis.vertical,
                            shrinkWrap: true,
                            itemCount: 24,
                            itemBuilder: (context, index) {
                              Meeting? m1;
                              Meeting? m2;
                              Meeting? m3;
                              for (Meeting i in value) {
                                if (i.roomId != null) {
                                  int startNum =
                                      int.parse(i.startTime!.split(':')[0]);
                                  int endNum =
                                      int.parse(i.endTime!.split(':')[0]);

                                  if (i.roomId == 0) {
                                    if (startNum == index ||
                                        (startNum < index && index < endNum)) {
                                      m1 = i;
                                    }
                                  }
                                  if (i.roomId == 1) {
                                    if (startNum == index ||
                                        (startNum < index && index < endNum)) {
                                      m2 = i;
                                    }
                                  }
                                  if (i.roomId == 2) {
                                    if (startNum == index ||
                                        (startNum < index && index < endNum)) {
                                      m3 = i;
                                    }
                                  }
                                }
                              }
                              return Container(
                                  height: 50,
                                  decoration: BoxDecoration(
                                      border: Border.all(
                                          width: 0.5, color: Colors.grey)),
                                  child: Row(children: [
                                    Expanded(
                                        flex: 1,
                                        child: Container(
                                            alignment: Alignment.center,
                                            height: 50,
                                            decoration: const BoxDecoration(
                                                border: Border(
                                                    right:
                                                        BorderSide(width: 1))),
                                            child: Text("$index시",
                                                textAlign: TextAlign.center))),
                                    if (m1 != null) ...[
                                      Expanded(
                                          flex: 2,
                                          child: Container(
                                              alignment: Alignment.center,
                                              height: 50,
                                              color: Colors.red,
                                              child: GestureDetector(
                                                onTap: () {
                                                  Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                          builder: ((context) =>
                                                              DetailMeeting(
                                                                  meeting:
                                                                      m1!)))).then(
                                                      (value) {
                                                    if (value == true) {
                                                      setState(() {
                                                        if (dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)] !=
                                                            null) {
                                                          _selectedEvents = ValueNotifier(
                                                              dayCalendarViewModel
                                                                      .getMeeting()[
                                                                  selectDay
                                                                      .toString()
                                                                      .substring(
                                                                          0,
                                                                          10)]!);
                                                        } else {
                                                          _selectedEvents =
                                                              ValueNotifier([]);
                                                        }
                                                      });
                                                    }
                                                  });
                                                },
                                                child: Text("${m1.title}",
                                                    textAlign:
                                                        TextAlign.center),
                                              ))),
                                    ] else ...[
                                      Expanded(
                                          flex: 2,
                                          child: TextButton(
                                            onPressed: () {
                                              Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                      builder: ((context) => AddMeeting(
                                                          date: selectDay
                                                              .toString(),
                                                          timeindex: index,
                                                          room: dayCalendarViewModel
                                                              .meeting_form_model
                                                              .roomList[0])))).then(
                                                  (value) {
                                                if (value == true) {
                                                  setState(() {
                                                    _selectedEvents =
                                                        ValueNotifier(
                                                            dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)]!);
                                                  });
                                                }
                                              });
                                            },
                                            child: const SizedBox(
                                              height: 50,
                                            ),
                                          )),
                                    ],
                                    if (m2 != null) ...[
                                      Expanded(
                                          flex: 2,
                                          child: Container(
                                              alignment: Alignment.center,
                                              height: 50,
                                              color: Colors.orange,
                                              child: GestureDetector(
                                                onTap: () {
                                                  Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                          builder: ((context) =>
                                                              DetailMeeting(
                                                                  meeting:
                                                                      m2!)))).then(
                                                      (value) {
                                                    if (value == true) {
                                                      setState(() {
                                                        _selectedEvents = ValueNotifier(
                                                            dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)]!);
                                                      });
                                                    }
                                                  });
                                                },
                                                child: Text("${m2.title}",
                                                    textAlign:
                                                        TextAlign.center),
                                              ))),
                                    ] else ...[
                                      Expanded(
                                          flex: 2,
                                          child: TextButton(
                                            onPressed: () {
                                              Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                      builder: ((context) =>
                                                          AddMeeting(
                                                            date: selectDay
                                                                .toString(),
                                                            timeindex: index,
                                                            room: dayCalendarViewModel
                                                                .meeting_form_model
                                                                .roomList[1],
                                                          )))).then((value) {
                                                if (value == true) {
                                                  setState(() {
                                                    _selectedEvents =
                                                        ValueNotifier(
                                                            dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)]!);
                                                  });
                                                }
                                              });
                                            },
                                            child: const SizedBox(
                                              height: 50,
                                            ),
                                          )),
                                    ],
                                    if (m3 != null) ...[
                                      Expanded(
                                          flex: 2,
                                          child: Container(
                                              alignment: Alignment.center,
                                              height: 50,
                                              color: Colors.amber,
                                              child: GestureDetector(
                                                onTap: () {
                                                  Navigator.push(
                                                      context,
                                                      MaterialPageRoute(
                                                          builder: ((context) =>
                                                              DetailMeeting(
                                                                  meeting:
                                                                      m3!)))).then(
                                                      (value) {
                                                    if (value == true) {
                                                      setState(() {
                                                        _selectedEvents = ValueNotifier(
                                                            dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)]!);
                                                      });
                                                    }
                                                  });
                                                },
                                                child: Text("${m3.title}",
                                                    textAlign:
                                                        TextAlign.center),
                                              ))),
                                    ] else ...[
                                      Expanded(
                                          flex: 2,
                                          child: TextButton(
                                            onPressed: () {
                                              Navigator.push(
                                                  context,
                                                  MaterialPageRoute(
                                                      builder: ((context) =>
                                                          AddMeeting(
                                                            date: selectDay
                                                                .toString(),
                                                            timeindex: index,
                                                            room: dayCalendarViewModel
                                                                .meeting_form_model
                                                                .roomList[2],
                                                          )))).then((value) {
                                                if (value == true) {
                                                  setState(() {
                                                    _selectedEvents =
                                                        ValueNotifier(
                                                            dayCalendarViewModel
                                                                    .getMeeting()[
                                                                selectDay
                                                                    .toString()
                                                                    .substring(
                                                                        0,
                                                                        10)]!);
                                                  });
                                                }
                                              });
                                            },
                                            child: const SizedBox(
                                              height: 50,
                                            ),
                                          )),
                                    ]
                                  ]));
                            },
                          );
                        }),
                  );
                },
              ),
            ),
          ]));
        }
      },
    );
  }
}
