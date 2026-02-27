import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { auth } from "../firebase";

type AuthContext = {
  currentUser: User | null;
  loading: boolean;
  handleCreateUser: (email: string, password: string) => Promise<void>;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function handleCreateUser(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // currentUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Create user error:", error);
    }
  }

  async function handleSignIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // currentUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Sign in error:", error);
    }
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      // currentUser will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }
  
  return (
    <AuthContext.Provider value={{ currentUser, loading, handleCreateUser, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}