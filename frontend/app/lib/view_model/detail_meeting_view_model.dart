import 'package:app/model/meeting.dart';

import '../google_sign_in_api.dart';
import '../model/meetings.dart';
import '../model/participants.dart';
import '../model/users.dart';

class DetailMeetingViewModel {
  late Meeting meeting;
  final Meetings meetings = Meetings();
  final Users users = Users();
  final Participants participants = Participants();
  List<String> particiapantList = [];

  DetailMeetingViewModel(this.meeting);

  Future<bool> getParticipants() async {
    List<String> tempList = [];
    var slackIdList = await participants
        .getmeetinIdParticipants({"meetingId": meeting.meetingId});
    print("slackList : $slackIdList");
    for (String i in slackIdList) {
      print(i);
      tempList.add(await users.getUserIdName({"slackId": i}));
    }
    if (tempList.contains(GoogleSignInApi.currentUser()!.displayName!)) {
      tempList.remove(GoogleSignInApi.currentUser()!.displayName!);
      particiapantList = [GoogleSignInApi.currentUser()!.displayName!];
    }
    particiapantList.addAll(tempList);
    print(particiapantList);
    return true;
  }

  Future<bool> deleteMeeting() async {
    await meetings.deleteMeeting({"meetingId": meeting.meetingId});
    await meetings.getMeeting();
    return true;
  }
}
