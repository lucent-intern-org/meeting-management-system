import 'package:app/google_sign_in_api.dart';
import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meeting.dart';
import 'package:app/test/test_data.dart';
import 'package:flutter/material.dart';

class UpdateMettingViewModel {
  late Meeting meeting;
  Meeting_Form_Model updateMeetingModel = Meeting_Form_Model();

  late TextEditingController titleController;
  late TextEditingController contentController;
  TextEditingController searchController = TextEditingController();

  GlobalKey<FormState> formKey = GlobalKey<FormState>(); //폼검사를 위한 키

  List<String> participantUsers = [GoogleSignInApi.currentUser()!.displayName!];
  List<String> participantGroups = [];
  List<String> participantList = [];

  UpdateMettingViewModel(this.meeting) {
    titleController = TextEditingController(text: meeting.title);
    contentController = TextEditingController(text: meeting.content);
    updateMeetingModel.repeat = meeting.repeat!;
    updateMeetingModel.start = meeting.startTime!;
    updateMeetingModel.end = meeting.endTime!;
    updateMeetingModel.date = meeting.date;
  }
  Future<bool> initFormModel() async {
    await updateMeetingModel.initData().then((value) =>
        updateMeetingModel.room = updateMeetingModel.roomList[meeting.roomId!]);
    return true;
  }

  void setParticipantList() {
    participantList = participantUsers + participantGroups;
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

  String? titleValidator(value) {
    if (value == '') {
      return '제목을 입력해주세요.';
    }
    return null;
  }

  String? startTimeValidator(value) {
    // 해당 날짜의 미팅들 가져와서 시작 시간과 종료 시간이
    // 사용자가 설정한 시작 시간과 종료 시간 사이에 있다면 회의중복
    var startIndex =
        updateMeetingModel.startList.indexOf(updateMeetingModel.start);
    var endIndex = updateMeetingModel.endList.indexOf(updateMeetingModel.end);
    //이미 존재하는 회의인지 체크
    for (Meeting i in TestData().meetings[7]) {
      if (startIndex < updateMeetingModel.endList.indexOf(i.endTime!) &&
          endIndex > updateMeetingModel.startList.indexOf(i.startTime!)) {
        return '이미 회의 존재';
      }
    }
    return null;
  }

  String? endTimeValidator(value) {
    var startIndex =
        updateMeetingModel.startList.indexOf(updateMeetingModel.start);
    var endIndex = updateMeetingModel.endList.indexOf(updateMeetingModel.end);
    //이미 존재하는 회의인지 체크
    for (Meeting i in TestData().meetings[7]) {
      if (startIndex < updateMeetingModel.endList.indexOf(i.endTime!) &&
          endIndex > updateMeetingModel.startList.indexOf(i.startTime!)) {
        return '이미 회의 존재';
      }
    }
    //종료 시간이 시작 시간보다 빠른지 체크
    if (updateMeetingModel.endList.indexOf(value.toString()) <=
        updateMeetingModel.startList.indexOf(updateMeetingModel.start)) {
      return '종료시간 이상';
    }
    return null;
  }

  String? contentValidator(value) {
    if (value == '') {
      return '내용을 입력해주세요.';
    }
    return null;
  }

  bool updateMeeting() {
    var meetingId = 6;
    var roomId = updateMeetingModel.roomList.indexOf(updateMeetingModel.room!);
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
