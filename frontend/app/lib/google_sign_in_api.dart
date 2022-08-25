import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInApi {
  static final _googleSignIn = GoogleSignIn();
  static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
  static Future<bool> logining() => _googleSignIn.isSignedIn();
  static Future<GoogleSignInAccount?> logout() => _googleSignIn.signOut();
  static GoogleSignInAccount? currentUser() => _googleSignIn.currentUser;
}
