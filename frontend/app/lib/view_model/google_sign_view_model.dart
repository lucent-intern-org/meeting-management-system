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
      return '로그인 실패';
    } else {
      //디비에 있는 이메일인가 파악
      //if(user=='dbuser')
      return '로그인 성공';
    }
  }

  Future signUp(BuildContext context) async {
    final user = await GoogleSignInApi.login();

    if (user == null) {
      return '회원가입 실패';
    } else {
      //회원가입 정보
      User signUpUser = User(slackIdController.text, user.displayName,
          user.email, gropList.indexOf(grop!));
      //DB에 회원가입 정보 저장

      GoogleSignInApi.logout();
      return '회원가입 성공';
    }
  }
}
