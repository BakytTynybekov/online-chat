import "./dashboard.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { child, push, ref, set } from "firebase/database";
import * as firebaseApp from "../../firebase/firebase";

function Dashboard() {
  const { logOut, registeredUsers, user, messages } = useContext(AuthContext);
  const [messageTxt, setMessageTxt] = useState("");

  const sendMsg = (e) => {
    e.preventDefault();
    if (messageTxt === "") {
      alert("Type the message");
    } else {
      let message = {
        text: messageTxt,
        createdAt: moment().format("Do MMM, HH:mm"),
        sender: user.displayName ?? user.email,
      };
      let key = push(child(ref(firebaseApp.database), "messages")).key;
      set(ref(firebaseApp.database, `messages/${key}`), message);
    }

    setMessageTxt("");
  };

  const sendLocation = (e) => {
    e.preventDefault();
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let latitude = position?.coords?.latitude;
        let longitude = position?.coords?.longitude;
        let mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let message = {
          url: mapUrl,
          createdAt: moment().format("Do MMM, HH:mm"),
          sender: user.displayName ?? user.email,
        };
        let key = push(child(ref(firebaseApp.database), "messages")).key;
        set(ref(firebaseApp.database, `messages/${key}`), message);
        console.log(position);
      },
      (error) => {
        console.log(error);
      },
      options
    );
  };
  return user ? (
    <div className="chat">
      <div className="users">
        <header>
          <button className="logout" onClick={() => logOut()}>
            Log out
          </button>
        </header>
        <h1>Peoples</h1>
        <ul>
          {registeredUsers.map((user) => {
            return <li key={user.id}>{user.name ? user.name : user.email}</li>;
          })}
        </ul>
      </div>
      <div className="messages">
        <div className="messagesFromUsers">
          {messages?.map((msg) => {
            return (
              <div className="message" key={msg.id}>
                <div className="messageInfo">
                  <h3>
                    {" "}
                    {msg.sender} <span>{msg.createdAt}</span>
                  </h3>
                  <p>
                    {msg.text ?? (
                      <a target={"_blank"} href={msg.url}>
                        My location
                      </a>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <footer>
          <form action="">
            <div className="messagesInput">
              <input
                type="text"
                value={messageTxt}
                onChange={(e) => setMessageTxt(e.target.value)}
              />
              <button type="submit" onClick={(e) => sendMsg(e)}>
                Sent
              </button>
              <button onClick={(e) => sendLocation(e)}>Sent Location</button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  ) : (
    <Navigate to="login" />
  );
}

export default Dashboard;
