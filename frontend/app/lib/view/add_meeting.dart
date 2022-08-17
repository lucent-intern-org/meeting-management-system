import 'package:app/view_model/add_metting_view_model.dart';
import 'package:app/widget_style.dart';
import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class AddMeeting extends StatefulWidget {
  AddMeeting({Key? key, required this.date, required this.timeindex})
      : super(key: key);
  final String date;
  final int timeindex;
  @override
  State<AddMeeting> createState() => _AddMeetingState(date, timeindex);
}

class _AddMeetingState extends State<AddMeeting> {
  _AddMeetingState(this.date, this.timeindex);

  AddMettingViewModel addMettingViewModel = AddMettingViewModel();
  WidgetStyle widgetstyle = WidgetStyle();
  final String date; //yyyy-mm-dd
  final int timeindex;
  late Size size;
  @override
  void initState() {
    addMettingViewModel.addMeetingModel.start =
        addMettingViewModel.addMeetingModel.startList[timeindex * 2];
    addMettingViewModel.addMeetingModel.end =
        addMettingViewModel.addMeetingModel.endList[timeindex * 2 + 2];
    addMettingViewModel.addMeetingModel.date =
        date.substring(0, 10).replaceAll('-', '');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    addMettingViewModel.setParticipantList();

    size = MediaQuery.of(context).size;

    return GestureDetector(
      onTap: () {
        //다른화면 클릭시 텍스트 필드 포커스해제
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        body: SafeArea(
            child: Form(
          key: addMettingViewModel.formKey,
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
                    validator: (value) =>
                        addMettingViewModel.titleValidator(value),
                    controller: addMettingViewModel.titleController,
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
                        Container(
                            margin: EdgeInsets.only(left: 15),
                            width: size.width * 0.7,
                            child: Text(
                                date.substring(0, 10).replaceAll('-', '.'))),
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
                                    SizedBox(
                                      width: size.width * 0.25,
                                      height: 60,
                                      child: DropdownButtonFormField2(
                                        //시작시간
                                        validator: (value) =>
                                            addMettingViewModel
                                                .startTimeValidator(value),
                                        iconSize: 0,
                                        items: addMettingViewModel
                                            .addMeetingModel.startList
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
                                        value: addMettingViewModel
                                            .addMeetingModel.start,
                                        onChanged: (value) {
                                          setState(() {
                                            addMettingViewModel.addMeetingModel
                                                .start = value as String;
                                          });
                                        },
                                        buttonWidth: size.width * 0.25,
                                      ),
                                    ),
                                    SizedBox(
                                      height: 60,
                                      child: const Text(
                                        "  -  ",
                                        style: TextStyle(
                                          fontSize: 40,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      width: size.width * 0.3,
                                      height: 60,
                                      child: DropdownButtonFormField2(
                                        //종료시간
                                        validator: (value) =>
                                            addMettingViewModel
                                                .endTimeValidator(value),
                                        iconSize: 0,
                                        items: addMettingViewModel
                                            .addMeetingModel.endList
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
                                        value: addMettingViewModel
                                            .addMeetingModel.end,
                                        onChanged: (value) {
                                          setState(() {
                                            addMettingViewModel.addMeetingModel
                                                .end = value as String;
                                          });
                                        },
                                        buttonWidth: size.width * 0.30,
                                      ),
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
                            addMettingViewModel.minusHour();
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
                            addMettingViewModel.minusMinute();
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
                            addMettingViewModel.plusMinute();
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
                            addMettingViewModel.plusHour();
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
                            items:
                                addMettingViewModel.addMeetingModel.repeatList
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
                            value: addMettingViewModel.addMeetingModel.repeat,
                            onChanged: (value) {
                              setState(() {
                                addMettingViewModel.addMeetingModel.repeat =
                                    value as String;
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
                          child: Stack(
                            children: [
                              Container(
                                height: 40,
                                width: size.width * 0.45 - 10,
                                child: DropdownButtonHideUnderline(
                                  child: DropdownButton2(
                                    isExpanded: true,
                                    items: addMettingViewModel
                                        .addMeetingModel.userList
                                        .map((item) => DropdownMenuItem<String>(
                                              value: item,
                                              child: TextButton(
                                                style: TextButton.styleFrom(
                                                    alignment:
                                                        Alignment.centerLeft,
                                                    fixedSize: Size(
                                                        size.width * 0.45 - 10,
                                                        40)),
                                                onPressed: () {
                                                  setState(() {
                                                    addMettingViewModel
                                                        .addParticipantUsers(
                                                            item);
                                                  });
                                                },
                                                child: Text(
                                                  item,
                                                  style: const TextStyle(
                                                    fontSize: 14,
                                                  ),
                                                ),
                                              ),
                                            ))
                                        .toList(),
                                    onChanged: (value) {},
                                    buttonHeight: 40,
                                    buttonWidth: 200,
                                    dropdownMaxHeight: 200,
                                    dropdownWidth: size.width * 0.45 - 10,
                                    searchController:
                                        addMettingViewModel.searchController,
                                    searchInnerWidget: Padding(
                                      padding: const EdgeInsets.only(
                                        top: 8,
                                        bottom: 4,
                                        right: 8,
                                        left: 8,
                                      ),
                                      //검색창
                                      child: TextFormField(
                                        controller: addMettingViewModel
                                            .searchController,
                                        decoration: InputDecoration(
                                          isDense: true,
                                          contentPadding:
                                              const EdgeInsets.symmetric(
                                            horizontal: 10,
                                            vertical: 8,
                                          ),
                                          hintText: 'Search for an User...',
                                          hintStyle:
                                              const TextStyle(fontSize: 12),
                                          border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(8),
                                          ),
                                        ),
                                      ),
                                    ),
                                    //search 값에 해당하는 User있을 경우 리턴
                                    searchMatchFn: (item, searchValue) {
                                      if (searchValue == '' ||
                                          (addMettingViewModel.participantList
                                              .contains(
                                                  item.value.toString()))) {
                                        //검색 값이 있을때만 유저보여줌
                                        return false;
                                      }
                                      return (item.value
                                          .toString()
                                          .contains(searchValue));
                                    },
                                    //드롭다운메뉴 닫힐 때 search clear
                                    onMenuStateChange: (isOpen) {
                                      if (!isOpen) {
                                        addMettingViewModel.searchController
                                            .clear();
                                      }
                                    },
                                  ),
                                ),
                              ),
                              Container(
                                height: 40,
                                width: size.width * 0.35,
                                child: ListView.builder(
                                    physics: BouncingScrollPhysics(),
                                    scrollDirection: Axis.horizontal,
                                    itemCount: addMettingViewModel
                                        .participantList.length,
                                    itemBuilder: (BuildContext ctx, int idx) {
                                      if (idx == 0) {
                                        return Container(
                                            alignment: Alignment.center,
                                            height: 40,
                                            child: Text(
                                              addMettingViewModel
                                                  .participantList[idx],
                                              style: TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  color: Colors.black),
                                            ));
                                      }
                                      return TextButton(
                                          onPressed: () {
                                            setState(() {
                                              addMettingViewModel
                                                  .removeParticipantList(idx);
                                            });
                                          },
                                          child: Container(
                                            alignment: Alignment.center,
                                            height: 40,
                                            child: Row(children: [
                                              Text(
                                                addMettingViewModel
                                                    .participantList[idx],
                                                style: TextStyle(
                                                    fontWeight:
                                                        FontWeight.normal,
                                                    color: Colors.black),
                                              ),
                                              Icon(
                                                Icons.close,
                                                size: 16,
                                                color: Colors.blue,
                                              )
                                            ]),
                                          ));
                                    }),
                              ),
                            ],
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
                          items: addMettingViewModel.addMeetingModel.gropList
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
                          value: addMettingViewModel.addMeetingModel.grop,
                          onChanged: (value) {
                            setState(() {
                              addMettingViewModel
                                  .addParticipantGroups(value.toString());
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
                            items: addMettingViewModel.addMeetingModel.roomList
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
                            value: addMettingViewModel.addMeetingModel.room,
                            onChanged: (value) {
                              setState(() {
                                addMettingViewModel.addMeetingModel.room =
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
                            validator: (value) =>
                                addMettingViewModel.contentValidator(value),
                            controller: addMettingViewModel.contentController,
                            maxLines: 5,
                            decoration: widgetstyle.textFieldDeco('내용'),
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
                            if (addMettingViewModel.formKey.currentState!
                                .validate()) {
                              if (addMettingViewModel.addMeeting()) {
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
