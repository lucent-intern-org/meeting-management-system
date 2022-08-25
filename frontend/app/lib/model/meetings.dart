import 'package:app/urldata.dart';
import 'package:dio/dio.dart';

import 'meeting.dart';

class Meetings {
  var dio = Dio();
  UrlData urlData = UrlData();
  static Map<String, List<Meeting>> meetings = {};
  Map<String, List<Meeting>> get() => meetings;
  Future<void> getMeeting() async {
    meetings = {};
    await dio.get('${urlData.url}/meetings/all').then((value) {
      for (var i in value.data['data']) {
        if (meetings['${i['date']}'] == null) {
          meetings['${i['date']}'] = [
            Meeting(i['roomId'], i['date'], i['startTime'], i['endTime'],
                i['title'], i['content'], i['repeat'],
                meetingId: i['meetingId'])
          ];
        } else {
          meetings['${i['date']}'] = meetings['${i['date']}']! +
              [
                Meeting(i['roomId'], i['date'], i['startTime'], i['endTime'],
                    i['title'], i['content'], i['repeat'],
                    meetingId: i['meetingId'])
              ];
        }
      }
    });
  }

  Future<void> addMeeting(body) async {
    await dio.post('${urlData.url}/meetings/create', data: body);
  }

  Future<void> updateMeeting(body) async {
    await dio.post('${urlData.url}/meetings/update', data: body);
  }

  Future<bool> deleteMeeting(body) async {
    print(body);
    await dio.post('${urlData.url}/meetings/delete', data: body);
    return true;
  }
}
