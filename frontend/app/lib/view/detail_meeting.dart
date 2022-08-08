import 'package:app/model/meeting.dart';
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
              //제목
              padding: const EdgeInsets.all(20),
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
                "${DateFormat('yyyy년 MM월 dd일').format(DateTime.utc(int.parse(meeting.date!.substring(0, 4)), int.parse(meeting.date!.substring(4, 6)), int.parse(meeting.date!.substring(6, 8))))} ${DateFormat('E', 'ko_KR').format(DateTime.now())}요일",
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
