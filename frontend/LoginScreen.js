import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, ResponseType } from "expo-auth-session";

import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configure the redirect URI for web
  const redirectUri = makeRedirectUri({
    scheme: 'frontend',
    path: 'redirect'
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    // Web client ID from Google Cloud Console
    webClientId: "923252135141-an9veump6lv2d1l99pgef77bu876v5if.apps.googleusercontent.com",
    // iOS client ID (optional, if you have one)
    iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
    // Android client ID (optional, if you have one)  
    androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
    // Scopes for the permissions you need
    scopes: ['profile', 'email'],
    responseType: ResponseType.IdToken,
    // Redirect URI
    redirectUri: redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setLoading(true);
      const { id_token, access_token } = response.params;

      // Use the ID token to sign in to Firebase
      const credential = GoogleAuthProvider.credential(id_token);
      
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUser(userCredential.user);
          Alert.alert("Success", `Welcome ${userCredential.user.email}!`);
        })
        .catch((error) => {
          console.error("Firebase sign-in error:", error);
          Alert.alert("Error", `Failed to sign in: ${error.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (response?.type === "error") {
      Alert.alert("Error", "Authentication failed. Please try again.");
      console.error("Auth error:", response.error);
    }
  }, [response]);

  const handleGoogleSignIn = () => {
    if (!request) {
      Alert.alert("Error", "Google Sign-In is not ready yet. Please wait.");
      return;
    }
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanning App</Text>
      
      {user ? (
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
      ) : (
        <>
          <Text style={styles.subtitle}>Sign in to continue</Text>
          <Button 
            title={loading ? "Signing in..." : "Sign in with Google"} 
            onPress={handleGoogleSignIn}
            disabled={!request || loading}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#666",
  },
  userInfo: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
  },
  infoBox: {
    marginTop: 40,
    padding: 15,
    backgroundColor: "#fff3cd",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#856404",
  },
  infoText: {
    fontSize: 12,
    color: "#856404",
    lineHeight: 18,
  },
});