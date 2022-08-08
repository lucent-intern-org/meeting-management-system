import 'package:app/provider/date_provider.dart';
import 'package:app/view/calender_app_bar.dart';
import 'package:app/view/calender_menu.dart';
import 'package:app/view/calender_view/day_calender.dart';
import 'package:app/view/calender_view/week_month_calender.dart';
import 'package:flutter/material.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:provider/provider.dart';

void main() {
  initializeDateFormatting().then((_) => runApp(const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ChangeNotifierProvider(
          create: (context) => DateProvider(), child: MyHomePage()),
    );
  }
}

class MyHomePage extends StatelessWidget {
  MyHomePage({Key? key}) : super(key: key);
  List<Widget> calenders = [
    DayCalender(),
    WeekMonthCalender(),
    WeekMonthCalender()
  ];
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: CalenderAppBar(),
        drawer: CalenderMenu(),
        body: Column(children: [
          calenders[
              Provider.of<DateProvider>(context, listen: true).calenderIndex]
        ]));
  }
}
