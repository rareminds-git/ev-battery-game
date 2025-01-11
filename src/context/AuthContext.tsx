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
import { toast } from "react-toastify";
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
            id: firebaseUser.uid,
            username: String(firebaseUser.displayName),
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
      // throw new Error("Invalid email provided");
      toast.error("Invalid email provided");
    }
    if (!password || typeof password !== "string") {
      toast.error("Invalid password provided");
      // throw new Error("Invalid password provided");
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      toast.success("Login successful!");
    } catch (error: any) {
      // Handle specific Firebase Auth errors
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found. Please check your credentials.");
          break;
        case "auth/user-disabled":
          toast.error("This user account has been disabled.");
          break;
        case "auth/invalid-credential":
          toast.error("The provided credentials are invalid.");
          break;
        default:
          toast.error("An unknown error occurred. Please try again.");
          console.log("Error during login:", error.code, error.message);
      }
      // throw error; // Optional: Re-throw the error for further handling
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    if (!email || typeof email !== "string") {
      toast.error("Invalid email provided");
      // throw new Error("Invalid email provided");
    }
    if (!password || typeof password !== "string") {
      toast.error("Invalid password provided");
      // throw new Error("Invalid password provided");
    }
    if (!username || typeof username !== "string") {
      toast.error("Invalid username provided");
      // throw new Error("Invalid username provided");
    }

    try {
      // Create user with email and password
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password.trim()
        );

      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, { displayName: username });
      setAuthState({
        user: {
          username: username,
          id: auth?.currentUser?.uid || "",
          email: email,
        },
        isAuthenticated: true,
      });

      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date().toISOString(),
      });

      toast.success("User registered successfully");
      // console.log("User registered successfully");
    } catch (error: any) {
      toast.error("Error during signup:", error.message);
      // console.error("Error during signup:", error);
      // throw error; // Pass the error to the component for user feedback
    }
  };

  // Firebase logout
  const logout = async () => {
    try {
      await signOut(auth);
      setAuthState({ user: null, isAuthenticated: false });
      toast.success("Logged Out!");
    } catch (error: any) {
      toast.success("Error during logout:", error.message);
      // console.error("Error during logout:", error);
      // throw error;
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
