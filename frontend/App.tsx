import AuthProvider from "./contexts/AuthContext";
import { AppLayout } from "./_layout";

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}
