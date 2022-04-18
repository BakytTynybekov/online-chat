import "./dashboard.scss";
function Dashboard() {
  const listItemStyle = {
    background: "#727085",
    height: "60px",
    borderRadius: "10px",
  };
  return (
    <div className="chat">
      <div className="users">
        <header>
          <button className="logout">Log out</button>
        </header>
        <h1>Peoples</h1>
        <ul>
          <li className="user">Bakyt Tynybekov</li>
          <li className="user">Bakyt Tynybekov</li>
        </ul>
      </div>
      <div className="messages">
        <div className="messagesFromUsers">
          <div className="message">
            <div className="messageInfo">
              <h3>
                {" "}
                bakyt.tynybekov@gmail.com <span>15th April 15:20</span>
              </h3>
              <p>Hello</p>
            </div>
          </div>
        </div>
        <footer>
          <form action="">
            <div className="messagesInput">
              <input type="text" />
              <button type="submit">Sent</button>
              <button>Sent Location</button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
