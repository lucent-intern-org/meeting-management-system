import 'package:app/provider/date_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class DayCalender extends StatelessWidget {
  DayCalender({Key? key}) : super(key: key);
  List<dynamic> list = [];
  late DateTime selectDay;
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
                    child: const Text("Thiel", textAlign: TextAlign.center))),
            Expanded(
                flex: 2,
                child: Container(
                    height: 40,
                    alignment: Alignment.center,
                    color: Colors.orange,
                    child: const Text("Bezos", textAlign: TextAlign.center))),
            Expanded(
                flex: 2,
                child: Container(
                    height: 40,
                    alignment: Alignment.center,
                    color: Colors.amber[200],
                    child: const Text("Musk", textAlign: TextAlign.center)))
          ],
        ),
      ),
      Container(
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
                child: ListView.builder(
                  scrollDirection: Axis.vertical,
                  shrinkWrap: true,
                  itemCount: 24,
                  itemBuilder: (context, index) {
                    return Container(
                        height: 50,
                        decoration: BoxDecoration(
                            border: Border.all(width: 0.5, color: Colors.grey)),
                        child: Row(children: [
                          Expanded(
                              flex: 1,
                              child: Container(
                                  alignment: Alignment.center,
                                  height: 50,
                                  decoration: const BoxDecoration(
                                      border:
                                          Border(right: BorderSide(width: 1))),
                                  child: Text("$index시",
                                      textAlign: TextAlign.center))),
                          Expanded(
                              flex: 2,
                              child: TextButton(
                                onPressed: () {
                                  print("$index Thiel");
                                },
                                child: const SizedBox(
                                  height: 50,
                                ),
                              )),
                          Expanded(
                              flex: 2,
                              child: TextButton(
                                onPressed: () {
                                  print("$index Bezos");
                                },
                                child: const SizedBox(
                                  height: 50,
                                ),
                              )),
                          Expanded(
                              flex: 2,
                              child: TextButton(
                                onPressed: () {
                                  print("$index Musk");
                                },
                                child: const SizedBox(
                                  height: 50,
                                ),
                              )),
                        ]));
                  },
                ));
          },
        ),
      ),
    ]));
  }
}
