import 'package:app/provider/date_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CalenderAppBar extends StatelessWidget implements PreferredSizeWidget {
  CalenderAppBar({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      elevation: 0,
      title: Text(
          "${Provider.of<DateProvider>(context, listen: true).focusedDay.month}월"),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(45);
}
