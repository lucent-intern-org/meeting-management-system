import 'package:app/model/meeting.dart';
import 'package:app/view/calendar_dialog.dart';
import 'package:app/view_model/update_metting_view_model.dart';
import 'package:app/widget_style.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class UpdateMeeting extends StatefulWidget {
  UpdateMeeting({Key? key, required this.meeting}) : super(key: key);
  final Meeting meeting;
  @override
  State<UpdateMeeting> createState() => _UpdateMeetingState(meeting);
}

class _UpdateMeetingState extends State<UpdateMeeting> {
  _UpdateMeetingState(this.meeting);
  final Meeting meeting;
  late UpdateMettingViewModel updateMettingViewModel =
      UpdateMettingViewModel(meeting);
  WidgetStyle widgetstyle = WidgetStyle();
  String? date;
  late Size size;

  @override
  void initState() {
    // TODO: implement initState
    updateMettingViewModel.updateMeetingModel.date = meeting.date;
    updateMettingViewModel.meeting = meeting;
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    size = MediaQuery.of(context).size;
    date = updateMettingViewModel.updateMeetingModel.date;
    date = date!.substring(0, 4) +
        '.' +
        date!.substring(4, 6) +
        '.' +
        date!.substring(6, 8);
    return GestureDetector(
      onTap: () {
        //다른화면 클릭시 텍스트 필드 포커스해제
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        body: SafeArea(
            child: Form(
          key: updateMettingViewModel.formKey,
          child: ListView(
            shrinkWrap: true,
            children: [
              Column(children: [
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
                  //제목
                  width: size.width * 0.8,
                  child: TextFormField(
                    validator: (value) {
                      if (value == '') {
                        return '제목을 입력해주세요.';
                      }
                      return null;
                    },
                    controller: updateMettingViewModel.titleController,
                    decoration: InputDecoration(labelText: '제목'),
                  ),
                ),
                Container(
                  //날짜
                  padding: EdgeInsets.fromLTRB(0, 25, 0, 10),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.calendar_month),
                        GestureDetector(
                          onTap: () {
                            showDialog(
                                context: context,
                                //barrierDismissible - Dialog를 제외한 다른 화면 터치 x
                                barrierDismissible: false,
                                builder: (BuildContext context) {
                                  return CalendarDialog(updateMettingViewModel);
                                }).then((value) {
                              if (value == true) {
                                setState(() {
                                  updateMettingViewModel
                                          .updateMeetingModel.date =
                                      updateMettingViewModel
                                          .updateMeetingModel.date;
                                });
                              }
                            });
                          },
                          child: Container(
                              margin: EdgeInsets.only(left: 15),
                              width: size.width * 0.7,
                              child: Text(date!)),
                        ),
                      ]),
                ),
                Container(
                  //시간
                  padding: EdgeInsets.all(5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.schedule),
                        Column(
                          children: [
                            Container(
                                width: size.width * 0.7,
                                margin: EdgeInsets.only(left: 15),
                                child: Row(
                                  children: [
                                    DropdownButton2(
                                      //시작시간
                                      iconSize: 0,
                                      items: updateMettingViewModel
                                          .updateMeetingModel.startList
                                          .map((item) =>
                                              DropdownMenuItem<String>(
                                                value: item,
                                                child: Text(
                                                  item,
                                                  style: const TextStyle(
                                                    fontSize: 14,
                                                  ),
                                                ),
                                              ))
                                          .toList(),
                                      dropdownMaxHeight: 200,
                                      value: updateMettingViewModel
                                          .updateMeetingModel.start,
                                      onChanged: (value) {
                                        setState(() {
                                          updateMettingViewModel
                                              .updateMeetingModel
                                              .start = value as String;
                                        });
                                      },
                                      buttonWidth: size.width * 0.25,
                                    ),
                                    const Text(
                                      "  -  ",
                                      style: TextStyle(
                                        fontSize: 40,
                                      ),
                                    ),
                                    DropdownButton2(
                                      //종료시간
                                      iconSize: 0,
                                      items: updateMettingViewModel
                                          .updateMeetingModel.endList
                                          .map((item) =>
                                              DropdownMenuItem<String>(
                                                value: item,
                                                child: Text(
                                                  item,
                                                  style: const TextStyle(
                                                    fontSize: 14,
                                                  ),
                                                ),
                                              ))
                                          .toList(),
                                      dropdownMaxHeight: 200,
                                      value: updateMettingViewModel
                                          .updateMeetingModel.end,
                                      onChanged: (value) {
                                        setState(() {
                                          updateMettingViewModel
                                              .updateMeetingModel
                                              .end = value as String;
                                        });
                                      },
                                      buttonWidth: size.width * 0.30,
                                    ),
                                  ],
                                )),
                          ],
                        )
                      ]),
                ),
                Container(
                  //종료시간 체크
                  width: size.width * 0.9,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      SizedBox(
                        width: size.width * 0.05,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            updateMettingViewModel.minusHour();
                          });
                        },
                        child: Text(
                          "-1h",
                          style: TextStyle(fontSize: 12),
                        ),
                        style: ElevatedButton.styleFrom(
                            minimumSize: Size(50, 30), primary: Colors.red),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            updateMettingViewModel.minusMinute();
                          });
                        },
                        child: Text(
                          "-30m",
                          style: TextStyle(fontSize: 12),
                        ),
                        style: ElevatedButton.styleFrom(
                            minimumSize: Size(50, 30), primary: Colors.red),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            updateMettingViewModel.plusMinute();
                          });
                        },
                        child: Text(
                          "+30m",
                          style: TextStyle(fontSize: 12),
                        ),
                        style: ElevatedButton.styleFrom(
                            minimumSize: Size(50, 30), primary: Colors.green),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            updateMettingViewModel.plusHour();
                          });
                        },
                        child: Text(
                          "+1h",
                          style: TextStyle(fontSize: 12),
                        ),
                        style: ElevatedButton.styleFrom(
                            minimumSize: Size(50, 30), primary: Colors.green),
                      )
                    ],
                  ),
                ),
                Container(
                  //미팅반복
                  padding: EdgeInsets.all(5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.event_repeat),
                        Container(
                          alignment: Alignment.center,
                          margin: EdgeInsets.only(left: 15),
                          width: size.width * 0.7,
                          child: DropdownButton2(
                            iconSize: 0,
                            items: updateMettingViewModel
                                .updateMeetingModel.repeatList
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
                            dropdownMaxHeight: 200,
                            value: updateMettingViewModel
                                .updateMeetingModel.repeat,
                            onChanged: (value) {
                              setState(() {
                                updateMettingViewModel.updateMeetingModel
                                    .repeat = value as String;
                              });
                            },
                            buttonWidth: size.width * 0.7,
                          ),
                        ),
                      ]),
                ),
                Container(
                  //참석자
                  padding: EdgeInsets.all(5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.people),
                        Container(
                          height: 40,
                          margin: EdgeInsets.only(left: 15),
                          width: size.width * 0.45 - 10,
                          child: DropdownButtonHideUnderline(
                            child: DropdownButton2(
                              isExpanded: true,
                              hint: Text(
                                'Select Item',
                                style: TextStyle(
                                  fontSize: 14,
                                  color: Theme.of(context).hintColor,
                                ),
                              ),
                              items: updateMettingViewModel
                                  .updateMeetingModel.userList
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
                              value: updateMettingViewModel
                                  .updateMeetingModel.user,
                              onChanged: (value) {
                                setState(() {
                                  updateMettingViewModel.updateMeetingModel
                                      .user = value as String;
                                });
                              },
                              buttonHeight: 40,
                              buttonWidth: 200,
                              dropdownMaxHeight: 200,
                              searchController:
                                  updateMettingViewModel.searchController,
                              searchInnerWidget: Padding(
                                padding: const EdgeInsets.only(
                                  top: 8,
                                  bottom: 4,
                                  right: 8,
                                  left: 8,
                                ),
                                //검색창
                                child: TextFormField(
                                  controller:
                                      updateMettingViewModel.searchController,
                                  decoration: InputDecoration(
                                    isDense: true,
                                    contentPadding: const EdgeInsets.symmetric(
                                      horizontal: 10,
                                      vertical: 8,
                                    ),
                                    hintText: 'Search for an User...',
                                    hintStyle: const TextStyle(fontSize: 12),
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                  ),
                                ),
                              ),
                              //search 값에 해당하는 User있을 경우 리턴
                              searchMatchFn: (item, searchValue) {
                                return (item.value
                                    .toString()
                                    .contains(searchValue));
                              },
                              //드롭다운메뉴 닫힐 때 search clear
                              onMenuStateChange: (isOpen) {
                                if (!isOpen) {
                                  updateMettingViewModel.searchController
                                      .clear();
                                }
                              },
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        DropdownButton2(
                          scrollbarAlwaysShow: true,
                          isExpanded: true,
                          alignment: Alignment.center,
                          hint: Text(
                            '그룹 추가',
                            style: TextStyle(
                              fontSize: 14,
                              color: Theme.of(context).hintColor,
                            ),
                          ),
                          items:
                              updateMettingViewModel.updateMeetingModel.gropList
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
                          value: updateMettingViewModel.updateMeetingModel.grop,
                          onChanged: (value) {
                            setState(() {
                              updateMettingViewModel.updateMeetingModel.grop =
                                  value as String;
                            });
                          },
                          buttonHeight: 55,
                          buttonWidth: size.width * 0.25,
                        ),
                      ]),
                ),
                Container(
                  //회의실
                  padding: EdgeInsets.all(5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.meeting_room),
                        Container(
                          margin: EdgeInsets.only(left: 15),
                          width: size.width * 0.7,
                          child: DropdownButton2(
                            iconSize: 0,
                            items: updateMettingViewModel
                                .updateMeetingModel.roomList
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
                            dropdownMaxHeight: 200,
                            value:
                                updateMettingViewModel.updateMeetingModel.room,
                            onChanged: (value) {
                              setState(() {
                                updateMettingViewModel.updateMeetingModel.room =
                                    value as String;
                              });
                            },
                            buttonWidth: size.width * 0.7,
                          ),
                        ),
                      ]),
                ),
                Container(
                  //내용
                  height: 150,
                  padding: EdgeInsets.all(5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                            padding: EdgeInsets.only(top: 3),
                            alignment: Alignment.topCenter,
                            child: Icon(
                              Icons.notes,
                              size: 34,
                            )),
                        Container(
                          alignment: Alignment.center,
                          margin: EdgeInsets.only(left: 15),
                          width: size.width * 0.7,
                          child: TextFormField(
                            validator: (value) {
                              if (value == '') {
                                return '내용을 입력해주세요.';
                              }
                              return null;
                            },
                            controller:
                                updateMettingViewModel.contentController,
                            maxLines: 5,
                            decoration:
                                widgetstyle.textFieldDeco(meeting.content),
                          ),
                        )
                      ]),
                ),
                Container(
                  padding: EdgeInsets.only(top: 30),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              minimumSize: Size(100, 35)),
                          onPressed: () {
                            if (updateMettingViewModel.formKey.currentState!
                                .validate()) {
                              if (updateMettingViewModel.updateMeeting()) {
                                Navigator.pop(context);
                              }
                            }
                          },
                          child: Text("예약")),
                      ElevatedButton(
                          style: ElevatedButton.styleFrom(
                              primary: Colors.black38,
                              minimumSize: Size(100, 35)),
                          onPressed: () {
                            Navigator.pop(context);
                          },
                          child: Text("취소"))
                    ],
                  ),
                )
              ]),
            ],
          ),
        )),
      ),
    );
  }
}
