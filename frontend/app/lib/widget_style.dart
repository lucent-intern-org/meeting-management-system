import 'package:flutter/material.dart';

class WidgetStyle {
  InputDecoration textFieldDeco(labeltext) {
    return InputDecoration(
      contentPadding: EdgeInsets.fromLTRB(0, 16, 0, 0),
      labelText: labeltext,
      filled: true,
      fillColor: Colors.grey[200],
      focusedBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(width: 0, color: Colors.grey),
      ),
      enabledBorder: const OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(width: 0, color: Colors.grey),
      ),
      border: const OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10.0)),
        borderSide: BorderSide(width: 0, color: Colors.grey),
      ),
    );
  }
}
