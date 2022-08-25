class Meeting {
  int? meetingId;
  int? roomId;
  String? date;
  String? startTime;
  String? endTime;
  String? title;
  String? content;
  String? repeat;
  //List<String>? user;

  Meeting(this.meetingId, this.roomId, this.date, this.startTime, this.endTime,
      this.title, this.content, this.repeat);
}
