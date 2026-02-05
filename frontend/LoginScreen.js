import { View, Button } from "react-native";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "923252135141-an9veump6lv2d1l99pgef77bu876v5if.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="Sign in with Google" onPress={() => promptAsync()} />
    </View>
  );
}