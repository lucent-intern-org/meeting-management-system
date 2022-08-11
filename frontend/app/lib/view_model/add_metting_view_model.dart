import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meeting.dart';
import 'package:flutter/material.dart';

class AddMettingViewModel {
  Meeting? meeting;
  Meeting_Form_Model addMeetingModel = Meeting_Form_Model();

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
    //해당 시간에 등록 가능한가 체크
    meeting = Meeting(
        meetingId, roomId, date, startTime, endTime, title, content, repeat);
    return true;
  }
}
