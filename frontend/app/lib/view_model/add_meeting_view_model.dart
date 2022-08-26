import 'package:app/google_sign_in_api.dart';
import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meeting.dart';
import 'package:app/model/meetings.dart';
import 'package:flutter/material.dart';

import '../model/users.dart';

class AddMeetingViewModel {
  Meeting? meeting;
  Meetings meetings = Meetings();
  Meeting_Form_Model addMeetingModel = Meeting_Form_Model();

  TextEditingController titleController = TextEditingController();
  TextEditingController contentController = TextEditingController();
  TextEditingController searchController = TextEditingController();

  GlobalKey<FormState> formKey = GlobalKey<FormState>(); //폼검사를 위한 키

  List<String> participantUsers = [GoogleSignInApi.currentUser()!.displayName!];
  List<String> participantGroups = [];
  List<String> participantList = [];
  Users users = Users();

  Future<bool> initFormModel() async {
    return await addMeetingModel.initData();
  }

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

  String? titleValidator(value) {
    if (value == '') {
      return '제목을 입력해주세요.';
    }
    return null;
  }

  String? startTimeValidator(value) {
    // 해당 날짜의 미팅들 가져와서 시작 시간과 종료 시간이
    // 사용자가 설정한 시작 시간과 종료 시간 사이에 있다면 회의중복
    var startIndex = addMeetingModel.startList.indexOf(addMeetingModel.start);
    var endIndex = addMeetingModel.endList.indexOf(addMeetingModel.end);
    //이미 존재하는 회의인지 체크
    var meetingList = meetings.get()[addMeetingModel.date];
    if (meetingList != null) {
      for (Meeting i in meetings.get()[addMeetingModel.date]!) {
        if (startIndex < addMeetingModel.endList.indexOf(i.endTime!) &&
            endIndex > addMeetingModel.startList.indexOf(i.startTime!)) {
          if (addMeetingModel.room == addMeetingModel.roomList[i.roomId!]) {
            return '이미 회의 존재';
          }
        }
      }
    }

    return null;
  }

  String? endTimeValidator(value) {
    var startIndex = addMeetingModel.startList.indexOf(addMeetingModel.start);
    var endIndex = addMeetingModel.endList.indexOf(addMeetingModel.end);
    //이미 존재하는 회의인지 체크
    var meetingList = meetings.get()[addMeetingModel.date];
    if (meetingList != null) {
      for (Meeting i in meetings.get()[addMeetingModel.date]!) {
        if (startIndex < addMeetingModel.endList.indexOf(i.endTime!) &&
            endIndex > addMeetingModel.startList.indexOf(i.startTime!)) {
          if (addMeetingModel.room == addMeetingModel.roomList[i.roomId!]) {
            return '이미 회의 존재';
          }
        }
      }
    }
    //종료 시간이 시작 시간보다 빠른지 체크
    if (addMeetingModel.endList.indexOf(value.toString()) <=
        addMeetingModel.startList.indexOf(addMeetingModel.start)) {
      return '종료시간 이상';
    }
    return null;
  }

  String? contentValidator(value) {
    if (value.toString().replaceAll('\n', '').replaceAll(' ', '') == '') {
      return '내용을 입력해주세요.';
    }
    return null;
  }

  Future<bool> addMeeting() async {
    var roomId = addMeetingModel.roomList.indexOf(addMeetingModel.room!);
    var date = addMeetingModel.date;
    var startTime = addMeetingModel.start;
    var endTime = addMeetingModel.end;
    var title = titleController.text;
    var content = contentController.text;
    var repeat = addMeetingModel.repeat;
    if (title == "" || content == "") {
      return false;
    }
    var slackId = await getParticipant();
    meeting = Meeting(roomId, date, startTime, endTime, title, content, repeat);
    var body = {
      "roomId": roomId,
      "date": date,
      "startTime": startTime,
      "endTime": endTime,
      "title": title,
      "content": content,
      "repeat": repeat,
      "slackId": slackId
    };
    await meetings.addMeeting(body);
    await meetings.getMeeting();
    return true;
  }

  Future<List> getParticipant() async {
    var slackIdList = Set();
    for (String i in participantGroups) {
      //i그룹에 대한 유저 리스트
      var getGroupUser = [i];
      for (String slackId in await users
          .getGroupUserId({"groupId": addMeetingModel.groupList.indexOf(i)})) {
        slackIdList.add(slackId);
      }

      print(slackIdList);
    }
    for (String i in participantUsers) {
      //참여자 유저 하나씩 저장
      var a = await users.getNameUserId({"name": i});
      print(a);
      slackIdList.add(a);
    }
    return slackIdList.toList();
  }
}
