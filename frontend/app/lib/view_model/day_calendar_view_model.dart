import 'package:app/model/meeting_form_model.dart';
import 'package:app/model/meetings.dart';

import '../model/meeting.dart';

class DayCalendarViewModel {
  Meetings meetings = Meetings();
  Meeting_Form_Model meeting_form_model = Meeting_Form_Model();
  Future<bool> initData() async {
    return await meeting_form_model.initData();
  }

  Future<void> setMeeting() async {
    await meetings.getMeeting();
  }

  Map<String, List<Meeting>> getMeeting() {
    return meetings.get();
  }
}
