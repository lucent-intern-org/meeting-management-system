import 'package:app/model/meeting.dart';
import 'package:app/view/update_meeting.dart';
import 'package:app/view_model/detail_meeting_view_model.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class DetailMeeting extends StatelessWidget {
  DetailMeeting({Key? key, required this.meeting}) : super(key: key);
  final Meeting meeting;
  late DetailMeetingViewModel detailMeetingViewModel;

  @override
  Widget build(BuildContext context) {
    detailMeetingViewModel = DetailMeetingViewModel(meeting);
    return FutureBuilder(
      future: detailMeetingViewModel.getParticipants(),
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData == false) {
          return const Scaffold();
        } else {
          return Scaffold(
            body: SafeArea(
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      IconButton(
                          onPressed: () async {
                            await Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => UpdateMeeting(
                                        meeting: meeting,
                                        participants: detailMeetingViewModel
                                            .particiapantList))).then(
                              (value) {
                                if (value == true) {
                                  Navigator.pop(context, true);
                                }
                              },
                            );
                          },
                          icon: const Icon(Icons.edit)),
                      IconButton(
                          onPressed: () {
                            showDialog(
                                context: context,
                                //barrierDismissible - Dialog??? ????????? ?????? ?????? ?????? x
                                barrierDismissible: false,
                                builder: (BuildContext context) {
                                  return AlertDialog(
                                    // RoundedRectangleBorder - Dialog ?????? ????????? ????????? ??????
                                    shape: RoundedRectangleBorder(
                                        borderRadius:
                                            BorderRadius.circular(10.0)),

                                    //Dialog Main Title
                                    title: Container(
                                        alignment: Alignment.center,
                                        child: const Text("????????? ??????")),
                                    //
                                    content: Column(
                                      mainAxisSize: MainAxisSize.min,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Container(
                                          alignment: Alignment.center,
                                          child: const Text(
                                            "????????? ?????????????????????????",
                                            style:
                                                TextStyle(color: Colors.black),
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
                                            child: const Text("??????"),
                                            //????????? ??????
                                            onPressed: () async {
                                              await detailMeetingViewModel
                                                  .deleteMeeting()
                                                  .then((value) {
                                                if (value == true) {
                                                  Navigator.pop(context, true);
                                                }
                                              });
                                            },
                                          ),
                                          ElevatedButton(
                                            style: ElevatedButton.styleFrom(
                                                primary: Colors.black38),
                                            onPressed: () {
                                              Navigator.pop(context);
                                            },
                                            child: const Text("??????"),
                                          ),
                                        ],
                                      )
                                    ],
                                  );
                                }).then((value) {
                              //????????????
                              if (value == true) {
                                Navigator.pop(context, true);
                              }
                            });
                          },
                          icon: const Icon(Icons.delete))
                    ],
                  ),
                  Container(
                    //??????
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
                    alignment: Alignment.center,
                    child: Text(
                      "${meeting.title}",
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  Container(
                    //??????
                    padding: const EdgeInsets.all(10),
                    alignment: Alignment.centerRight,
                    child: Text(
                      "${meeting.date!.substring(0, 4)}??? ${meeting.date!.substring(5, 7)}??? ${meeting.date!.substring(8, 10)}??? ${DateFormat('E', 'ko_KR').format(DateTime(int.parse(meeting.date!.substring(0, 4)), int.parse(meeting.date!.substring(5, 7)), int.parse(meeting.date!.substring(8, 10))))}??????",
                      style: const TextStyle(fontSize: 20),
                    ),
                  ),
                  Container(
                    // ?????????, ??????
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
                            style:
                                TextStyle(color: Colors.orange, fontSize: 16),
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
                    //?????????
                    padding: const EdgeInsets.all(10),
                    alignment: Alignment.centerRight,
                    child: Text(
                        detailMeetingViewModel.particiapantList.join(', ')),
                  ),
                  Container(
                    //?????? ??????
                    padding: const EdgeInsets.fromLTRB(10, 30, 10, 10),
                    alignment: Alignment.center,
                    child: Text("${meeting.content}"),
                  ),
                ],
              ),
            ),
          );
        }
      },
    );
  }
}
