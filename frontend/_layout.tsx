import AuthProvider, { useAuth } from "./contexts/AuthContext";
import { Stack } from "expo-router";

export function AppLayout () {
    const { currentUser } = useAuth();
    return (
      <Stack>
      <Stack.Protected guard={currentUser === null}>
        <Stack.Screen name="LoginScreen" />
      </Stack.Protected>

      <Stack.Protected guard={currentUser !== null}>
        <Stack.Screen name="private" />
      </Stack.Protected>
      {/* Expo Router includes all routes by default. Adding Stack.Protected creates exceptions for these screens. */}
    </Stack>
    )
}