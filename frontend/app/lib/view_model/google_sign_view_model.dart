import 'package:app/google_sign_in_api.dart';
import 'package:app/model/user.dart';
import 'package:flutter/material.dart';
import '../model/groups.dart';
import '../model/users.dart';

class GoogleSignViewModel {
  final TextEditingController slackIdController = TextEditingController();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  Users users = Users();
  Groups groups = Groups();

  List<String> groupList = [];

  GoogleSignViewModel() {
    groups.getGroups().then((value) {
      groupList = value;
    });
  }

  String? group;

  Future signIn(BuildContext context) async {
    final user = await GoogleSignInApi.login();
    if (user == null) {
      await GoogleSignInApi.logout();
      return '로그인 실패';
    } else {
      //디비에 있는 이메일인가 파악
      if (await users.getEmailUserId({"email": user.email}) != '') {
        return '로그인 성공';
      }
      await GoogleSignInApi.logout();
      return '로그인 실패';
    }
  }

  Future signUp(BuildContext context) async {
    final user = await GoogleSignInApi.login();
    await GoogleSignInApi.logout();
    if (user == null) {
      return '회원가입 실패';
    } else {
      //회원가입 정보
      if (await users.getUserIdName({"slackId": slackIdController.text}) !=
          '') {
        return '회원가입 실패';
      }

      //body
      var body = {
        "slackId": slackIdController.text,
        "name": user.displayName,
        "email": user.email,
        "groupId": groupList.indexOf(group!),
        "role": "user"
      };
      //DB에 회원가입 정보 저장
      users.createUser(body);
      return '회원가입 성공';
    }
  }
}
