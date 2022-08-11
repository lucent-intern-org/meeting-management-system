import 'package:app/model/add_meeting_model.dart';
import 'package:app/model/meeting.dart';
import 'package:flutter/material.dart';

class Add_Metting_View_Model {
  Meeting? meeting;
  Add_Meeting_Model addMeetingModel = Add_Meeting_Model();

  TextEditingController titleController = TextEditingController();
  TextEditingController contentController = TextEditingController();
  TextEditingController searchController = TextEditingController();

  GlobalKey<FormState> formKey = GlobalKey<FormState>(); //폼검사를 위한 키

  void minusHour() {
    var endi = addMeetingModel.endList.indexOf(addMeetingModel.end) - 2;
    print(endi);
    if (endi < 0) endi = 48 + endi;
    addMeetingModel.end = addMeetingModel.endList[endi];
  }

  void minusMinute() {
    var endi = addMeetingModel.endList.indexOf(addMeetingModel.end) - 1;
    print(endi);
    if (endi < 0) endi = 48 + endi;
    addMeetingModel.end = addMeetingModel.endList[endi];
  }

  void plusMinute() {
    var endi = addMeetingModel.endList.indexOf(addMeetingModel.end) + 1;
    if (endi > 47) endi = endi - 48;
    addMeetingModel.end = addMeetingModel.endList[endi];
  }

  void plusHour() {
    var endi = addMeetingModel.endList.indexOf(addMeetingModel.end) + 2;
    if (endi > 47) endi = endi - 48;
    addMeetingModel.end = addMeetingModel.endList[endi];
  }

  bool addMeeting() {
    var meetingId = 6;
    var roomId = addMeetingModel.roomList.indexOf(addMeetingModel.room);
    var date = addMeetingModel.date;
    var startTime = addMeetingModel.start;
    var endTime = addMeetingModel.end;
    var title = titleController.text;
    var content = contentController.text;
    var repeat = addMeetingModel.repeat;
    if (title == "" || content == "") {
      return false;
    }
    meeting = Meeting(
        meetingId, roomId, date, startTime, endTime, title, content, repeat);
    return true;
  }
}
