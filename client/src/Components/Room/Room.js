import React from "react";
import { useParams } from "react-router-dom";
import "../Bootstarp.css";
import "./Room.css";

const Room = (props) => {
  let params = useParams();
  return (
    <>
      <div className="container-fuild">
        <div className="mt-5">
          <center>
            <h2>Tic Tac Toe</h2>
          </center>
        </div>
        <div className="mt-5">
          <center>
            <button
              className="btn create-btn"
              onClick={() => {
                props.history.push(`/${params.username}/create-room`);
              }}
            >
              Create Room
            </button>
            <p className="mt-1">Or</p>
            <button
              className="btn join-btn"
              onClick={() => {
                props.history.push(`/${params.username}/join-room`);
              }}
            >
              Join Room
            </button>
          </center>
        </div>
      </div>
    </>
  );
};

export default Room;
