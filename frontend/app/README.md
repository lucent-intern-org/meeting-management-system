## **📋App File Tree**

```
📦app
 ┣ 📂.dart_tool
 ┃ ┣ 📜package_config.json
 ┃ ┣ 📜package_config_subset
 ┃ ┗ 📜version
 ┣ 📂android
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┣ 📂debug
 ┃ ┃ ┃ ┃ ┗ 📜AndroidManifest.xml
 ┃ ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂io
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂flutter
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂plugins
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜GeneratedPluginRegistrant.java
 ┃ ┃ ┃ ┃ ┣ 📂kotlin
 ┃ ┃ ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂example
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂app
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MainActivity.kt
 ┃ ┃ ┃ ┃ ┣ 📂res
 ┃ ┃ ┃ ┃ ┗ 📜AndroidManifest.xml
 ┃ ┃ ┃ ┗ 📂profile
 ┃ ┃ ┃ ┃ ┗ 📜AndroidManifest.xml
 ┃ ┃ ┗ 📜build.gradle
 ┃ ┣ 📂gradle
 ┃ ┃ ┗ 📂wrapper
 ┃ ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜build.gradle
 ┃ ┣ 📜gradle.properties
 ┃ ┣ 📜local.properties
 ┃ ┗ 📜settings.gradle
 ┣ 📂ios
 ┃ ┣ 📂Flutter
 ┃ ┃ ┣ 📜AppFrameworkInfo.plist
 ┃ ┃ ┣ 📜Debug.xcconfig
 ┃ ┃ ┣ 📜flutter_export_environment.sh
 ┃ ┃ ┣ 📜Generated.xcconfig
 ┃ ┃ ┗ 📜Release.xcconfig
 ┃ ┣ 📂Runner
 ┃ ┃ ┣ 📂Assets.xcassets
 ┃ ┃ ┃ ┣ 📂AppIcon.appiconset
 ┃ ┃ ┃ ┗ 📂LaunchImage.imageset
 ┃ ┃ ┣ 📂Base.lproj
 ┃ ┃ ┣ 📜AppDelegate.swift
 ┃ ┃ ┣ 📜GeneratedPluginRegistrant.h
 ┃ ┃ ┣ 📜GeneratedPluginRegistrant.m
 ┃ ┃ ┣ 📜Info.plist
 ┃ ┃ ┗ 📜Runner-Bridging-Header.h
 ┃ ┣ 📂Runner.xcodeproj
 ┃ ┃ ┣ 📂project.xcworkspace
 ┃ ┃ ┃ ┣ 📂xcshareddata
 ┃ ┃ ┃ ┗ 📜contents.xcworkspacedata
 ┃ ┃ ┣ 📂xcshareddata
 ┃ ┃ ┃ ┗ 📂xcschemes
 ┃ ┃ ┗ 📜project.pbxproj
 ┃ ┣ 📂Runner.xcworkspace
 ┃ ┃ ┣ 📂xcshareddata
 ┃ ┃ ┗ 📜contents.xcworkspacedata
 ┃ ┗ 📜.gitignore
 ┣ 📂lib
 ┃ ┣ 📂model
 ┃ ┃ ┣ 📜groups.dart
 ┃ ┃ ┣ 📜meeting.dart
 ┃ ┃ ┣ 📜meetings.dart
 ┃ ┃ ┣ 📜meeting_form_model.dart
 ┃ ┃ ┣ 📜participants.dart
 ┃ ┃ ┣ 📜user.dart
 ┃ ┃ ┗ 📜users.dart
 ┃ ┣ 📂provider
 ┃ ┃ ┗ 📜date_provider.dart
 ┃ ┣ 📂test
 ┃ ┃ ┗ 📜test_data.dart
 ┃ ┣ 📂view
 ┃ ┃ ┣ 📂calender_view
 ┃ ┃ ┃ ┣ 📜day_calender.dart
 ┃ ┃ ┃ ┗ 📜week_month_calender.dart
 ┃ ┃ ┣ 📜add_meeting.dart
 ┃ ┃ ┣ 📜calendar_dialog.dart
 ┃ ┃ ┣ 📜calender_app_bar.dart
 ┃ ┃ ┣ 📜calender_menu.dart
 ┃ ┃ ┣ 📜detail_meeting.dart
 ┃ ┃ ┣ 📜sign_in.dart
 ┃ ┃ ┣ 📜sign_up.dart
 ┃ ┃ ┗ 📜update_meeting.dart
 ┃ ┣ 📂view_model
 ┃ ┃ ┣ 📜add_meeting_view_model.dart
 ┃ ┃ ┣ 📜day_calendar_view_model.dart
 ┃ ┃ ┣ 📜detail_meeting_view_model.dart
 ┃ ┃ ┣ 📜google_sign_view_model.dart
 ┃ ┃ ┣ 📜update_meeting_view_model.dart
 ┃ ┃ ┗ 📜week_month_calendar_view_model.dart
 ┃ ┣ 📜date_format.dart
 ┃ ┣ 📜generated_plugin_registrant.dart
 ┃ ┣ 📜google_sign_in_api.dart
 ┃ ┣ 📜main.dart
 ┃ ┗ 📜widget_style.dart
 ┣ 📜.flutter-plugins
 ┣ 📜.flutter-plugins-dependencies
 ┣ 📜.gitignore
 ┣ 📜.metadata
 ┣ 📜.packages
 ┣ 📜analysis_options.yaml
 ┣ 📜pubspec.lock
 ┣ 📜pubspec.yaml
 ┗ 📜README.md
```
