import 'package:app/urldata.dart';
import 'package:dio/dio.dart';

class Meeting_Form_Model {
  var dio = Dio();
  UrlData urlData = UrlData();
  List<String> repeatList = ['반복 없음', '매일 반복', '매주 반복', '매월 반복'];
  String repeat = '반복 없음';
  List<String> startList = List.generate(
      48,
      (index) =>
          '${(index ~/ 2).toString().padLeft(2, '0')}:${(index % 2 * 30).toString().padLeft(2, '0')}');
  String start = '09:00';
  List<String> endList = List.generate(
      48,
      (index) =>
          '${(index ~/ 2).toString().padLeft(2, '0')}:${(index % 2 * 30).toString().padLeft(2, '0')}');
  String end = '09:00';
  List<String> groupList = [];
  String? group;
  List<String> roomList = [];
  String? room;
  List<String> roomColor = [];
  List<String> userList = [];

  String? user;

  String? date; //yyyymmdd
  Future<bool> initData() async {
    await dio.get('${urlData.url}/groups/all').then((value) {
      for (var i in value.data['data']) {
        groupList.add(i["groupName"]);
      }
    });
    await dio.get('${urlData.url}/rooms/all').then((value) {
      for (var i in value.data['data']) {
        roomList.add(i["roomName"]);
        roomColor.add(i["roomColor"]);
      }
      room = roomList[0];
    });

    await dio.get('${urlData.url}/users/all').then((value) {
      for (var i in value.data['data']) {
        userList.add(i["name"]);
      }
    });
    return true;
  }
}
