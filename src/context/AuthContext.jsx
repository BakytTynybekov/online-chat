import { createContext } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import * as firebaseApp from "../firebase/firebase";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseApp.auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

  onAuthStateChanged(firebaseApp.auth, (user) => {
    if (user) {
      setUser(user);
    }
  });

  const data = {
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    user: user,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
