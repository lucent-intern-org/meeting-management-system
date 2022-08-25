import 'package:app/model/meeting.dart';

import '../model/meetings.dart';

class WeekMonthCalenderViewModel {
  Meetings meetings = Meetings();

  Future<void> setMeeting() async {
    await meetings.getMeeting();
  }

  Map<String, List<Meeting>> getMeeting() {
    return meetings.get();
  }
}
