import 'package:app/urldata.dart';
import 'package:dio/dio.dart';

class Groups {
  var dio = Dio();
  UrlData urlData = UrlData();
  Future<List<String>> getGroups() async {
    List<String> groupList = [];
    await dio.get('${urlData.url}/groups/all').then((value) {
      for (var i in value.data['data']) {
        groupList.add(i["groupName"]);
      }
    });
    return groupList;
  }
}
