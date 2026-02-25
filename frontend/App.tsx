import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './LoginScreen';
import AuthProvider, { useAuth } from "./contexts/AuthContext";
import { AppLayout } from "./_layout"

export default function App() {
  return (
    <AuthProvider>
      <AppLayout/>

    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
