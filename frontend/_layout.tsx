import { ActivityIndicator, View } from "react-native";
import { useAuth } from "./contexts/AuthContext";
import LoginScreen from "./pages/LoginScreen";

export function AppLayout() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (currentUser === null) {
    return <LoginScreen />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    </View>
  );
}