import 'package:app/urldata.dart';
import 'package:dio/dio.dart';

class Participants {
  var dio = Dio();
  UrlData urlData = UrlData();
  Future<List<String>> getmeetinIdParticipants(body) async {
    List<String> participants = [];
    print(body);
    await dio
        .get('${urlData.url}/participant/participant', queryParameters: body)
        .then((value) {
      print(value.data["data"]);
      for (var i in value.data["data"]) {
        participants.add(i["slackId"]);
      }
    });
    return participants;
  }
}
