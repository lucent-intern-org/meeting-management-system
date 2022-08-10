import 'package:dropdown_button2/dropdown_button2.dart';
import 'package:flutter/material.dart';

class AddMeeting extends StatefulWidget {
  AddMeeting({Key? key}) : super(key: key);

  @override
  State<AddMeeting> createState() => _AddMeetingState();
}

class _AddMeetingState extends State<AddMeeting> {
  late Size size;

  List<String> dropdownList = ['반복 없음', '매일 반복', '매주 반복', '매월 반복'];
  String dropdown = '반복 없음';
  List<String> startList = List.generate(
      48,
      (index) =>
          '${(index ~/ 2).toString().padLeft(2, '0')}:${(index % 2 * 30).toString().padLeft(2, '0')}');
  String start = '09:00';
  List<String> endList = List.generate(
      48,
      (index) =>
          '${(index ~/ 2).toString().padLeft(2, '0')}:${(index % 2 * 30).toString().padLeft(2, '0')}');
  String end = '09:00';
  List<String> gropList = [
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
  List<String> roomList = ['Thield', 'Bezos', 'Musk'];
  String room = 'Thield';

  String day = '2022. 08. 04';
  @override
  Widget build(BuildContext context) {
    size = MediaQuery.of(context).size;
    return GestureDetector(
      onTap: () {
        //다른화면 클릭시 텍스트 필드 포커스해제
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        body: SafeArea(
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
                width: size.width * 0.8,
                child: TextField(
                  decoration: InputDecoration(labelText: '제목'),
                ),
              ),
              Container(
                padding: EdgeInsets.fromLTRB(0, 25, 0, 10),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.calendar_month),
                  Container(
                      margin: EdgeInsets.only(left: 15),
                      width: size.width * 0.7,
                      child: Text(day)),
                ]),
              ),
              Container(
                padding: EdgeInsets.all(5),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.schedule),
                  Column(
                    children: [
                      Container(
                          width: size.width * 0.7,
                          margin: EdgeInsets.only(left: 15),
                          child: Row(
                            children: [
                              DropdownButton2(
                                iconSize: 0,
                                items: startList
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
                                value: start,
                                onChanged: (value) {
                                  setState(() {
                                    start = value as String;
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
                                iconSize: 0,
                                items: endList
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
                                value: end,
                                onChanged: (value) {
                                  setState(() {
                                    end = value as String;
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
                width: size.width * 0.9,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    SizedBox(
                      width: size.width * 0.05,
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        "-1h",
                        style: TextStyle(fontSize: 12),
                      ),
                      style: ElevatedButton.styleFrom(
                          minimumSize: Size(50, 30), primary: Colors.red),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        "-30m",
                        style: TextStyle(fontSize: 12),
                      ),
                      style: ElevatedButton.styleFrom(
                          minimumSize: Size(50, 30), primary: Colors.red),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        "+30m",
                        style: TextStyle(fontSize: 12),
                      ),
                      style: ElevatedButton.styleFrom(
                          minimumSize: Size(50, 30), primary: Colors.green),
                    ),
                    ElevatedButton(
                      onPressed: () {},
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
                padding: EdgeInsets.all(5),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.event_repeat),
                  Container(
                    alignment: Alignment.center,
                    margin: EdgeInsets.only(left: 15),
                    width: size.width * 0.7,
                    child: DropdownButton2(
                      iconSize: 0,
                      items: dropdownList
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
                      value: dropdown,
                      onChanged: (value) {
                        setState(() {
                          dropdown = value as String;
                        });
                      },
                      buttonWidth: size.width * 0.7,
                    ),
                  ),
                ]),
              ),
              Container(
                padding: EdgeInsets.all(5),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.people),
                  Container(
                      height: 40,
                      margin: EdgeInsets.only(left: 15),
                      width: size.width * 0.45 - 10,
                      child: TextField()),
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
                    buttonHeight: 55,
                    buttonWidth: size.width * 0.25,
                  ),
                ]),
              ),
              Container(
                padding: EdgeInsets.all(5),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                  Icon(Icons.meeting_room),
                  Container(
                    margin: EdgeInsets.only(left: 15),
                    width: size.width * 0.7,
                    child: DropdownButton2(
                      iconSize: 0,
                      items: roomList
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
                      value: room,
                      onChanged: (value) {
                        setState(() {
                          room = value as String;
                        });
                      },
                      buttonWidth: size.width * 0.7,
                    ),
                  ),
                ]),
              ),
              Container(
                height: 150,
                padding: EdgeInsets.all(5),
                child:
                    Row(mainAxisAlignment: MainAxisAlignment.center, children: [
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
                    child: TextField(
                        maxLines: 5, decoration: textFieldDeco('내용을 입력해주세요')),
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
                          print("예약");
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
        )),
      ),
    );
  }
}

InputDecoration textFieldDeco(labeltext) {
  return InputDecoration(
    labelText: labeltext,
    filled: true,
    fillColor: Colors.grey[200],
    focusedBorder: const OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(10.0)),
      borderSide: BorderSide(width: 0, color: Colors.grey),
    ),
    enabledBorder: const OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(10.0)),
      borderSide: BorderSide(width: 0, color: Colors.grey),
    ),
    border: const OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(10.0)),
      borderSide: BorderSide(width: 0, color: Colors.grey),
    ),
  );
}
