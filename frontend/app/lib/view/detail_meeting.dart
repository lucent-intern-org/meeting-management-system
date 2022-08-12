import 'package:app/model/meeting.dart';
import 'package:app/view/update_meeting.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DetailMeeting extends StatelessWidget {
  const DetailMeeting({Key? key, required this.meeting}) : super(key: key);
  final Meeting meeting;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  IconButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) =>
                                    UpdateMeeting(meeting: meeting)));
                      },
                      icon: Icon(Icons.edit)),
                  IconButton(
                      onPressed: () {
                        showDialog(
                            context: context,
                            //barrierDismissible - Dialog를 제외한 다른 화면 터치 x
                            barrierDismissible: false,
                            builder: (BuildContext context) {
                              return AlertDialog(
                                // RoundedRectangleBorder - Dialog 화면 모서리 둥글게 조절
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(10.0)),

                                //Dialog Main Title
                                title: Column(
                                  children: [
                                    Text("회의실 삭제"),
                                  ],
                                ),
                                //
                                content: Column(
                                  mainAxisSize: MainAxisSize.min,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Container(
                                      alignment: Alignment.center,
                                      child: Text(
                                        "회의를 삭제하시겠습니까?",
                                        style: TextStyle(color: Colors.black),
                                      ),
                                    ),
                                  ],
                                ),
                                actions: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceEvenly,
                                    children: [
                                      ElevatedButton(
                                        child: Text("확인"),
                                        //회의실 삭제
                                        onPressed: () {
                                          Navigator.pop(context);
                                        },
                                      ),
                                      ElevatedButton(
                                        child: Text("취소"),
                                        style: ElevatedButton.styleFrom(
                                            primary: Colors.black38),
                                        onPressed: () {
                                          Navigator.pop(context);
                                        },
                                      ),
                                    ],
                                  )
                                ],
                              );
                            });
                      },
                      icon: Icon(Icons.delete))
                ],
              ),
            ),
            Container(
              //제목
              padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
              alignment: Alignment.center,
              child: Text(
                "${meeting.title}",
                style: const TextStyle(fontSize: 20),
              ),
            ),
            Container(
              //날짜
              padding: const EdgeInsets.all(10),
              alignment: Alignment.centerRight,
              child: Text(
                "${meeting.date!.substring(0, 4)}년 ${meeting.date!.substring(4, 6)}월 ${meeting.date!.substring(6, 8)}일 ${DateFormat('E', 'ko_KR').format(DateTime(int.parse(meeting.date!.substring(0, 4)), int.parse(meeting.date!.substring(4, 6)), int.parse(meeting.date!.substring(6, 8))))}요일",
                style: const TextStyle(fontSize: 20),
              ),
            ),
            Container(
              // 회의실, 시간
              padding: const EdgeInsets.all(10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  if (meeting.roomId == 0) ...[
                    const Text(
                      "[Thiel] ",
                      style: TextStyle(color: Colors.red, fontSize: 16),
                    ),
                  ] else if (meeting.roomId == 1) ...[
                    const Text(
                      "[Bezos]",
                      style: TextStyle(color: Colors.orange, fontSize: 16),
                    ),
                  ] else if (meeting.roomId == 2) ...[
                    const Text(
                      "[Musk]",
                      style: TextStyle(color: Colors.amber, fontSize: 16),
                    ),
                  ],
                  Text(
                    "${meeting.startTime} ~  ${meeting.endTime}",
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
              ),
            ),
            Container(
              //참여자
              padding: const EdgeInsets.all(10),
              alignment: Alignment.centerRight,
              child: const Text("참여자"),
            ),
            Container(
              //회의 내용
              padding: const EdgeInsets.all(10),
              alignment: Alignment.center,
              child: Text("${meeting.content}"),
            ),
          ],
        ),
      ),
    );
  }
}
