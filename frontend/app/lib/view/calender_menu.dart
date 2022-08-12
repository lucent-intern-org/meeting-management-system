import 'package:app/google_sign_in_api.dart';
import 'package:app/provider/date_provider.dart';
import 'package:app/view/login.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CalenderMenu extends StatefulWidget {
  const CalenderMenu({Key? key}) : super(key: key);

  @override
  State<CalenderMenu> createState() => _CalenderMenuState();
}

class _CalenderMenuState extends State<CalenderMenu> {
  bool select1 = false;
  bool select2 = false;
  bool select3 = false;
  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: MediaQuery.of(context).size.width * 0.4, //drawer 사이즈
      child: ListView(
        children: [
          Container(
            child: Text("Calender"),
          ),
          ListTile(
            title: Text('Day'),
            leading: Icon(Icons.view_agenda),
            selectedTileColor: Colors.blue[100],
            selected: select1,
            onTap: () {
              setState(() {
                select1 = true;
                select2 = false;
                select3 = false;
              });
              Provider.of<DateProvider>(context, listen: false)
                  .setcalenderIndex(0);
            },
          ),
          ListTile(
            title: Text('Week'),
            leading: Icon(Icons.view_agenda),
            selectedTileColor: Colors.blue[100],
            selected: select2,
            onTap: () {
              setState(() {
                select1 = false;
                select2 = true;
                select3 = false;
              });
              Provider.of<DateProvider>(context, listen: false)
                  .setcalenderIndex(1);
            },
          ),
          ListTile(
            title: Text('Month'),
            leading: Icon(Icons.view_agenda),
            selectedTileColor: Colors.blue[100],
            selected: select3,
            onTap: () {
              setState(() {
                select1 = false;
                select2 = false;
                select3 = true;
              });
              Provider.of<DateProvider>(context, listen: false)
                  .setcalenderIndex(2);
            },
          ),
          ListTile(
            title: Text('로그아웃'),
            leading: Icon(Icons.logout),
            selectedTileColor: Colors.blue[100],
            onTap: () {
              GoogleSignInApi.logout();
              Navigator.pushReplacement(
                  context, MaterialPageRoute(builder: (context) => Login()));
            },
          )
        ],
      ),
    );
  }
}
