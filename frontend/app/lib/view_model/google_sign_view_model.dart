import 'package:app/google_sign_in_api.dart';
import 'package:app/model/user.dart';
import 'package:flutter/material.dart';

class GoogleSignViewModel {
  final TextEditingController slackIdController = TextEditingController();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  final List<String> gropList = [
    'C-Level',
    'Frontend',
    'Backend',
    'Finance',
    'PM',
    'Infra',
    'Design',
    'Marketing',
    'BlockChain',
    'People',
    'Legal',
    'QA',
    'RealEstateCredit',
    'RealEstateInvestmentManagement'
  ];
  String? grop;
  bool gropcheck = false;

  Future signIn(BuildContext context) async {
    final user = await GoogleSignInApi.login();

    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('로그인 실패'),
        ),
      );
      return false;
    } else {
      //디비에 있는 이메일인가 파악
      //if(user=='dbuser')
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('로그인 성공'),
        ),
      );
      return true;
    }
  }

  Future signUp(BuildContext context) async {
    final user = await GoogleSignInApi.login();

    if (user == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('회원가입 실패'),
        ),
      );
      return false;
    } else {
      //회원가입 정보
      User signUpUser = User(slackIdController.text, user.displayName,
          user.email, gropList.indexOf(grop!));
      //DB에 회원가입 정보 저장
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('회원가입 성공'),
        ),
      );
      GoogleSignInApi.logout();
      return true;
    }
  }
}
