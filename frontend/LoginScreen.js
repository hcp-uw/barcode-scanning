import { View, Button, Text, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri, ResponseType } from "expo-auth-session";

import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuth } from "./contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const auth = useAuth();
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
            onPress={auth.handleSignInWithGoogle}
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