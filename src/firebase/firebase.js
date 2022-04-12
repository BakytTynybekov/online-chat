import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeFlBEAh9U3fPmq2PZZ5KW16Ch6qp7V-Y",
  authDomain: "online-chat-bede3.firebaseapp.com",
  projectId: "online-chat-bede3",
  storageBucket: "online-chat-bede3.appspot.com",
  messagingSenderId: "370743586882",
  appId: "1:370743586882:web:1f90c6f5785cf207e97ddb",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
