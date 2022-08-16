import 'package:app/google_sign_in_api.dart';
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

  List<String> participantUsers = [GoogleSignInApi.currentUser()!.displayName!];
  List<String> participantGroups = [];
  List<String> participantList = [];
  void setParticipantList() {
    participantList = participantUsers + participantGroups;
  }

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

  void addParticipantUsers(String item) {
    if (!participantList.contains(item)) {
      participantUsers.add(item);
    }
  }

  void addParticipantGroups(String item) {
    if (!participantGroups.contains(item)) {
      participantGroups.add(item);
    }
  }

  void removeParticipantList(int idx) {
    if (participantUsers.contains(participantList[idx])) {
      participantUsers.remove(participantList[idx]);
    } else {
      participantGroups.remove(participantList[idx]);
    }
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

  void addParticipant() {
    for (String i in participantGroups) {
      //i그룹에 대한 유저 리스트
      var getGroupUser = [i];
      for (String j in participantUsers) {
        //그룹들 안에 해당 유저 있는지 파악
        if (getGroupUser.contains(j)) {
          //그룹과의 중복 제거를 위해 유저삭제
          participantUsers.remove(j);
        }
      }
      participantList += getGroupUser;
    }
    participantList += participantUsers;
    for (String i in participantList) {
      //참여자 유저 하나씩 저장
      var participant = {'meetingId': 6, 'slackId': i};
    }
  }
}
