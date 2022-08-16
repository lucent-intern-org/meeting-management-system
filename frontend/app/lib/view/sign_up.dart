import 'package:app/google_sign_in_api.dart';
import 'package:app/main.dart';
import 'package:app/provider/date_provider.dart';
import 'package:dropdown_button2/dropdown_button2.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SignUp extends StatefulWidget {
  SignUp({Key? key}) : super(key: key);

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
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
  TextEditingController slackIdController = TextEditingController();
  final GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: ListView(
        children: [
          Form(
            key: formKey,
            child: Column(
              children: [
                Container(
                  //생성창 나가기
                  alignment: Alignment.centerRight,
                  child: IconButton(
                    icon: Icon(Icons.close),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                ),
                Container(
                  padding: EdgeInsets.fromLTRB(10, 50, 10, 10),
                  child: Text(
                    "LUCENTBLOCK",
                    style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  padding: EdgeInsets.only(
                    bottom: MediaQuery.of(context).size.height * 0.2,
                  ),
                  child: Text(
                    "회원가입",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  //제목
                  padding: EdgeInsets.only(
                    bottom: 20,
                  ),
                  width: 230,
                  child: TextFormField(
                    validator: (value) {
                      if (value == '') {
                        return '슬랙 아이디를 입력해주세요.';
                      }
                      return null;
                    },
                    controller: slackIdController,
                    decoration: InputDecoration(labelText: 'Slack ID'),
                  ),
                ),
                Container(
                  padding: EdgeInsets.only(
                    bottom: 30,
                  ),
                  width: 230,
                  child: DropdownButtonFormField2(
                      validator: (value) {
                        if (value == null) {
                          return '그룹을 선택해주세요.';
                        }
                        return null;
                      },
                      scrollbarAlwaysShow: true,
                      isExpanded: true,
                      alignment: Alignment.centerLeft,
                      hint: Text(
                        'Position',
                        style: TextStyle(
                          fontSize: 14,
                          color: Theme.of(context).hintColor,
                        ),
                      ),
                      items: gropList
                          .map((item) => DropdownMenuItem<String>(
                                value: item,
                                child: Text(
                                  item,
                                  style: const TextStyle(
                                    fontSize: 14,
                                  ),
                                ),
                              ))
                          .toList(),
                      dropdownFullScreen: true,
                      dropdownMaxHeight: 200,
                      value: grop,
                      onChanged: (value) {
                        setState(() {
                          grop = value as String;
                        });
                      },
                      buttonHeight: 30,
                      buttonWidth: 230),
                ),
                Container(
                  width: 250,
                  child: ElevatedButton(
                    child: Text("구글 아이디로 회원가입"),
                    onPressed: () async {
                      setState(() {
                        gropcheck = true;
                      });
                      if (formKey.currentState!.validate() && grop != null) {
                        signIn(context).then((value) {
                          if (value == true) {
                            GoogleSignInApi.logout();
                            Navigator.pop(context);
                          }
                        });
                      }
                    },
                  ),
                ),
                Container(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('이미 계정이 있으신가요?'),
                      TextButton(
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Text('로그인'))
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      )),
    );
  }

  Future signIn(BuildContext context) async {
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
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('회원가입 성공'),
        ),
      );
      return true;
    }
  }
}
