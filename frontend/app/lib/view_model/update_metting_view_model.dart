import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meeting.dart';
import 'package:flutter/material.dart';

class UpdateMettingViewModel {
  late Meeting meeting;
  Meeting_Form_Model updateMeetingModel = Meeting_Form_Model();

  late TextEditingController titleController;
  late TextEditingController contentController;
  TextEditingController searchController = TextEditingController();

  GlobalKey<FormState> formKey = GlobalKey<FormState>(); //폼검사를 위한 키

  UpdateMettingViewModel(this.meeting) {
    titleController = TextEditingController(text: meeting.title);
    contentController = TextEditingController(text: meeting.content);
    updateMeetingModel.room = updateMeetingModel.roomList[meeting.roomId!];
    updateMeetingModel.repeat = meeting.repeat!;
    updateMeetingModel.start = meeting.startTime!;
    updateMeetingModel.end = meeting.endTime!;
    updateMeetingModel.date = meeting.date;
  }

  void minusHour() {
    var endi = updateMeetingModel.endList.indexOf(updateMeetingModel.end) - 2;
    print(endi);
    if (endi < 0) endi = 48 + endi;
    updateMeetingModel.end = updateMeetingModel.endList[endi];
  }

  void minusMinute() {
    var endi = updateMeetingModel.endList.indexOf(updateMeetingModel.end) - 1;
    print(endi);
    if (endi < 0) endi = 48 + endi;
    updateMeetingModel.end = updateMeetingModel.endList[endi];
  }

  void plusMinute() {
    var endi = updateMeetingModel.endList.indexOf(updateMeetingModel.end) + 1;
    if (endi > 47) endi = endi - 48;
    updateMeetingModel.end = updateMeetingModel.endList[endi];
  }

  void plusHour() {
    var endi = updateMeetingModel.endList.indexOf(updateMeetingModel.end) + 2;
    if (endi > 47) endi = endi - 48;
    updateMeetingModel.end = updateMeetingModel.endList[endi];
  }

  bool updateMeeting() {
    var meetingId = 6;
    var roomId = updateMeetingModel.roomList.indexOf(updateMeetingModel.room);
    var date = updateMeetingModel.date;
    var startTime = updateMeetingModel.start;
    var endTime = updateMeetingModel.end;
    var title = titleController.text;
    var content = contentController.text;
    var repeat = updateMeetingModel.repeat;
    if (title == "" || content == "") {
      return false;
    }
    //해당 시간에 등록 가능한가 체크
    meeting = Meeting(
        meetingId, roomId, date, startTime, endTime, title, content, repeat);
    return true;
  }
}
