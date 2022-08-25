import 'package:app/urldata.dart';
import 'package:dio/dio.dart';

class Users {
  var dio = Dio();
  UrlData urlData = UrlData();
  Future<List<String>> getGroupUserId(body) async {
    List<String> users = [];
    print(body);
    await dio
        .get('${urlData.url}/users/group', queryParameters: body)
        .then((value) {
      for (var i in value.data["data"]) {
        users.add(i["slackId"]);
      }
    });
    return users;
  }

  Future<String> getNameUserId(body) async {
    print(body);
    String slackId = '';
    await dio
        .get('${urlData.url}/users/name', queryParameters: body)
        .then((value) {
      print(value.data["data"]);
      print(value.data["data"]["slackId"]);
      slackId = value.data["data"]["slackId"];
    });
    return slackId;
  }

  Future<String> getUserIdName(body) async {
    String name = '';
    await dio
        .get('${urlData.url}/users/slack', queryParameters: body)
        .then((value) {
      if (value.data["data"] != null) {
        name = value.data["data"]["name"];
      }
    });
    print(name);
    return name;
  }

  Future<String> getEmailUserId(body) async {
    String slackId = '';
    await dio
        .get('${urlData.url}/users/email', queryParameters: body)
        .then((value) {
      if (value.data["data"] != null) {
        slackId = value.data["data"]["name"];
      }
    });
    return slackId;
  }

  Future<void> createUser(body) async {
    await dio.post('${urlData.url}/users/create', data: body);
  }
}
