import React, { useState } from "react";
import "../Bootstarp.css";
import "./JoinRoom.css";
import { useParams } from "react-router-dom";
import id from "../GenId";

const JoinRoom = (props) => {
  let [roomId, setRoomId] = useState("");
  let { username } = useParams();
  //console.log(username);
  return (
    <>
      <div className="container-fluid">
        <div className="mt-5">
          <center>
            <h2>Tic Tac Toe</h2>
          </center>
        </div>
        <center>
          <div className="input-container">
            <input
              type="text"
              value={roomId}
              className="input"
              onChange={(e) => {
                setRoomId(e.target.value);
              }}
              placeholder="Enter Room ID.. "
            />
          </div>
        </center>
        <div className="mt-3">
          <center>
            <button
              className="btn next-btn"
              onClick={() => {
                if (typeof roomId === "undefined" || roomId.lengh <= 0) {
                  alert("Please Enter Room Id");
                } else {
                  props.history.push(`/${username}/${roomId}/${id}`);
                }
              }}
            >
              Join
            </button>
          </center>
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
