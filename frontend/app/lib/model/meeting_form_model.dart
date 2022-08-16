class Meeting_Form_Model {
  List<String> repeatList = ['반복 없음', '매일 반복', '매주 반복', '매월 반복'];
  String repeat = '반복 없음';
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
  List<String> userList = [
    '류건열',
    '이채림',
    '김재훈',
    '이상호',
    'B_Item1',
    'B_Item2',
    'B_Item3',
    'B_Item4',
  ];

  String? user;

  String? date; //yyyymmdd
}
