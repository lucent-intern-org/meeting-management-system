import 'package:app/google_sign_in_api.dart';
import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meeting.dart';
import 'package:app/model/users.dart';
import 'package:app/test/test_data.dart';
import 'package:flutter/material.dart';

import '../model/meetings.dart';

class UpdateMeetingViewModel {
  late Meeting meeting;
  Meeting_Form_Model updateMeetingModel = Meeting_Form_Model();
  Users users = Users();
  Meetings meetings = Meetings();
  late TextEditingController titleController;
  late TextEditingController contentController;
  TextEditingController searchController = TextEditingController();

  GlobalKey<FormState> formKey = GlobalKey<FormState>(); //폼검사를 위한 키

  List<String> participantUsers = [GoogleSignInApi.currentUser()!.displayName!];
  List<String> participantGroups = [];
  List<String> participantList = [];

  UpdateMeetingViewModel(this.meeting) {
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
    var meetingList = meetings.get()[updateMeetingModel.date];
    if (meetingList != null) {
      for (Meeting i in meetings.get()[updateMeetingModel.date]!) {
        if (startIndex < updateMeetingModel.endList.indexOf(i.endTime!) &&
            endIndex > updateMeetingModel.startList.indexOf(i.startTime!)) {
          if (updateMeetingModel.room ==
              updateMeetingModel.roomList[i.roomId!]) {
            return '이미 회의 존재';
          }
        }
      }
    }
    return null;
  }

  String? endTimeValidator(value) {
    var startIndex =
        updateMeetingModel.startList.indexOf(updateMeetingModel.start);
    var endIndex = updateMeetingModel.endList.indexOf(updateMeetingModel.end);
    //이미 존재하는 회의인지 체크
    var meetingList = meetings.get()[updateMeetingModel.date];
    if (meetingList != null) {
      for (Meeting i in meetings.get()[updateMeetingModel.date]!) {
        if (startIndex < updateMeetingModel.endList.indexOf(i.endTime!) &&
            endIndex > updateMeetingModel.startList.indexOf(i.startTime!)) {
          if (updateMeetingModel.room ==
              updateMeetingModel.roomList[i.roomId!]) {
            return '이미 회의 존재';
          }
        }
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
    if (value.toString().replaceAll('\n', '').replaceAll(' ', '') == '') {
      return '내용을 입력해주세요.';
    }
    return null;
  }

  Future<bool> updateMeeting() async {
    var meetingId = meeting.meetingId;
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
    var slackId = await getParticipant();
    meeting = Meeting(roomId, date, startTime, endTime, title, content, repeat);
    var body = {
      "meetingId": meetingId,
      "roomId": roomId,
      "date": date,
      "startTime": startTime,
      "endTime": endTime,
      "title": title,
      "content": content,
      "repeat": repeat,
      "slackId": slackId
    };
    await meetings.updateMeeting(body);
    await meetings.getMeeting();
    return true;
  }

  Future<List> getParticipant() async {
    var slackIdList = Set();
    for (String i in participantGroups) {
      //i그룹에 대한 유저 리스트
      var getGroupUser = [i];
      for (String slackId in await users.getGroupUserId(
          {"groupId": updateMeetingModel.groupList.indexOf(i)})) {
        slackIdList.add(slackId);
      }
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
