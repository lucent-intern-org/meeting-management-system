import 'package:app/view_model/google_sign_view_model.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class SignUp extends StatefulWidget {
  const SignUp({Key? key}) : super(key: key);

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final GoogleSignViewModel googleSignViewModel = GoogleSignViewModel();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: ListView(
        children: [
          Form(
            key: googleSignViewModel.formKey,
            child: Column(
              children: [
                Container(
                  //생성창 나가기
                  alignment: Alignment.centerRight,
                  child: IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () {
                      Navigator.pop(context);
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.fromLTRB(10, 50, 10, 10),
                  child: const Text(
                    "LUCENTBLOCK",
                    style: TextStyle(fontSize: 34, fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  padding: EdgeInsets.only(
                    bottom: MediaQuery.of(context).size.height * 0.2,
                  ),
                  child: const Text(
                    "회원가입",
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                ),
                Container(
                  //제목
                  padding: const EdgeInsets.only(
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
                    controller: googleSignViewModel.slackIdController,
                    decoration: const InputDecoration(labelText: 'Slack ID'),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.only(
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
                      items: googleSignViewModel.gropList
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
                      value: googleSignViewModel.grop,
                      onChanged: (value) {
                        setState(() {
                          googleSignViewModel.grop = value as String;
                        });
                      },
                      buttonHeight: 30,
                      buttonWidth: 230),
                ),
                SizedBox(
                  width: 250,
                  child: ElevatedButton(
                    child: const Text("구글 아이디로 회원가입"),
                    onPressed: () async {
                      setState(() {
                        googleSignViewModel.gropcheck = true;
                      });
                      if (googleSignViewModel.formKey.currentState!
                              .validate() &&
                          googleSignViewModel.grop != null) {
                        googleSignViewModel.signUp(context).then((value) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              duration: Duration(seconds: 3),
                              content: Text(value),
                            ),
                          );
                          if (value == '회원가입 성공') {
                            Navigator.pop(context);
                          }
                        });
                      }
                    },
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('이미 계정이 있으신가요?'),
                    TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: const Text('로그인'))
                  ],
                ),
              ],
            ),
          ),
        ],
      )),
    );
  }
}
