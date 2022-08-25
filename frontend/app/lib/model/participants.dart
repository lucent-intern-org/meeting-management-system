import 'package:dio/dio.dart';

class Participants {
  var dio = Dio();
  Future<List<String>> getmeetinIdParticipants(body) async {
    List<String> participants = [];
    print(body);
    await dio
        .get('http://192.168.0.30:3000/participant/participant',
            queryParameters: body)
        .then((value) {
      print(value.data["data"]);
      for (var i in value.data["data"]) {
        participants.add(i["slackId"]);
      }
    });
    return participants;
  }
}
