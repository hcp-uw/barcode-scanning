import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../_layout";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { handleSignIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.allerive}>Allerive</Text>
      <Text style={styles.title}>Sign in to continue</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="gray"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="gray"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSignIn(email, password)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  allerive: {
    fontSize: 32,
    fontWeight: "bold",
    position: "absolute",
    alignSelf: "center",
    top: 0,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold"
  },
  input: {
    width: "40%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    width: "40%",
    height: 40,
    backgroundColor: "teal",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    color: "#57B9FF",
    fontSize: 16,
    fontWeight: "bold",
  }
}); 