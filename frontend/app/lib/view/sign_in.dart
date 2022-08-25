import 'package:app/main.dart';
import 'package:app/provider/date_provider.dart';
import 'package:app/view/sign_up.dart';
import 'package:app/view_model/google_sign_view_model.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SignIn extends StatelessWidget {
  SignIn({Key? key}) : super(key: key);
  final GoogleSignViewModel googleSignViewModel = GoogleSignViewModel();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
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
              bottom: MediaQuery.of(context).size.height * 0.3,
            ),
            child: const Text(
              "로그인",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ),
          Container(
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).size.height * 0.2,
            ),
            child: ElevatedButton(
              child: const Text("구글 아이디로 로그인"),
              onPressed: () async {
                googleSignViewModel.signIn(context).then((value) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      duration: Duration(seconds: 3),
                      content: Text(value),
                    ),
                  );
                  if (value == '로그인 성공') {
                    //main page로 전환
                    Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ChangeNotifierProvider(
                                create: (context) => DateProvider(),
                                child: MyHomePage())));
                  }
                });
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text('아직 회원이 아니신가요?'),
              TextButton(
                  onPressed: () {
                    //회원가입 페이지로 이동
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => SignUp()));
                  },
                  child: const Text('회원가입 하기'))
            ],
          ),
        ],
      )),
    );
  }
}
