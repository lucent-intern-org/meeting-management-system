import 'package:app/google_sign_in_api.dart';
import 'package:app/main.dart';
import 'package:app/provider/date_provider.dart';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

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
            child: Text(
              "로그인",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
          ),
          SizedBox(
            height: MediaQuery.of(context).size.height * 0.3,
          ),
          Container(
            child: ElevatedButton(
              child: Text("구글 아이디로 로그인"),
              onPressed: () async {
                await signIn(context);
                Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ChangeNotifierProvider(
                            create: (context) => DateProvider(),
                            child: MyHomePage())));
              },
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
          content: Text('로그인 실패'),
        ),
      );
    } else {
      //디비에 있는 이메일인가 파악
      //if(user=='dbuser')
      print(user.email);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          duration: Duration(seconds: 3),
          content: Text('로그인 성공'),
        ),
      );
    }
  }
}
