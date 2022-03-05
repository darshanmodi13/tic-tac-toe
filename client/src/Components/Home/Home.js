import React, { useState } from "react";
import "../Bootstarp.css";
import "./Home.css";

const Home = (props) => {
  //console.log(props);
  let [username, setUsername] = useState("");
  return (
    <>
      <div className="container-fluid">
        <div className="mt-5">
          <center>
            <h2>Tic Tac Toe</h2>
          </center>
        </div>
        <div className="mt-5">
          <center>
            <input
              type="text"
              placeholder="Enter Username.."
              value={username}
              style={{
                paddingLeft: "8px",
              }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </center>
        </div>
        <div className="mt-3">
          <center>
            <button
              className="btn next-btn"
              onClick={() => {
                if (username.length > 0) {
                  props.history.push(`/room/${username}`);
                } else {
                  alert("Please Fill Username");
                }
              }}
            >
              Next
            </button>
          </center>
        </div>
      </div>
    </>
  );
};

export default Home;
