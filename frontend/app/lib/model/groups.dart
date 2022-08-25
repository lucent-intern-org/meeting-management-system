import 'package:dio/dio.dart';

class Groups {
  var dio = Dio();

  Future<List<String>> getGroups() async {
    List<String> groupList = [];
    await dio.get('http://192.168.0.30:3000/groups/all').then((value) {
      for (var i in value.data['data']) {
        groupList.add(i["groupName"]);
      }
    });
    return groupList;
  }
}
