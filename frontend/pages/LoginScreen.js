import { View, Button, Text, StyleSheet } from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
  const { handleSignInWithGoogle, loading } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Scanning App</Text>
      <>
        <Text style={styles.subtitle}>Sign in to continue</Text>
        <Button 
          title={loading ? "Signing in..." : "Sign in with Google"} 
          onPress={handleSignInWithGoogle}
          disabled={loading}
        />
      </>
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