import {
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // Firebase config
import { AuthState, User } from "../types/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  // Observe Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Map FirebaseUser to your User type
          const user: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
          };
          setAuthState({ user, isAuthenticated: true });
        } else {
          setAuthState({ user: null, isAuthenticated: false });
        }
      }
    );

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Firebase login
  const login = async (email: string, password: string) => {
    if (!email || typeof email !== "string") {
      console.log(email);
      throw new Error("Invalid email provided");
    }
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password provided");
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Pass the error to the component for user feedback
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    if (!email || typeof email !== "string") {
      throw new Error("Invalid email provided");
    }
    if (!password || typeof password !== "string") {
      throw new Error("Invalid password provided");
    }
    if (!username || typeof username !== "string") {
      throw new Error("Invalid username provided");
    }
  
    try {
      // Create user with email and password
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
  
      const user = userCredential.user;
  
      // Update user profile with username
      await updateProfile(user, { displayName: username });
  
      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date().toISOString(),
      });
  
      console.log("User registered successfully");
    } catch (error) {
      console.error("Error during signup:", error);
      throw error; // Pass the error to the component for user feedback
    }
  };

  // Firebase logout
  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
