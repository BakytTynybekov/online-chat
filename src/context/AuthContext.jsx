import { createContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { set, ref, onValue } from "firebase/database";
import * as firebaseApp from "../firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const loginWithEmailAndPassword = async (email, password) => {
    try {
      let response = await signInWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
      storeUser(response?.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signUpWithEmail = async (email, password) => {
    try {
      let response = await createUserWithEmailAndPassword(
        firebaseApp.auth,
        email,
        password
      );
      storeUser(response?.user);
    } catch (error) {
      alert(error?.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let res = await signInWithPopup(firebaseApp.auth, provider);
      storeUser(res?.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  onAuthStateChanged(firebaseApp.auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  });

  const getUsers = () => {
    onValue(ref(firebaseApp.database, "users"), (snapshot) => {
      const data = snapshot.val();
      let arr = [];

      Object.keys(data).map((key) =>
        arr.push({
          id: key,
          ...data[key],
        })
      );

      setRegisteredUsers(arr);
    });
  };

  const getMessages = () => {
    onValue(ref(firebaseApp.database, "messages"), (snapshot) => {
      const data = snapshot.val();
      let arr = [];

      Object.keys(data).map((key) =>
        arr.push({
          id: key,
          ...data[key],
        })
      );

      setMessages(arr);
    });
  };

  useEffect(() => {
    getUsers();
    getMessages();
  }, []);
  const logOut = async () => {
    try {
      await signOut(firebaseApp.auth);
      setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const storeUser = (userData) => {
    let data = {
      name: userData?.displayName,
      email: userData?.email,
      photoUrl: userData?.photoURL,
    };

    set(ref(firebaseApp.database, `users/${userData.uid}`), data);
  };

  const data = {
    loginWithEmailAndPassword: loginWithEmailAndPassword,
    user: user,
    logOut: logOut,
    registeredUsers: registeredUsers,
    signInWithGoogle: signInWithGoogle,
    messages: messages,
    signUpWithEmail: signUpWithEmail,
  };
  return (
    <AuthContext.Provider value={data}>
      {isLoading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};
