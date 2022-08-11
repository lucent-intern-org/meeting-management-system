DateTime toNoDot(String date) {
  return DateTime(int.parse(date.substring(0, 4)),
      int.parse(date.substring(5, 7)), int.parse(date.substring(8, 10)));
}

void toDotFormat() {}
