import React, { useEffect, useState } from "react";
import "../Bootstarp.css";
import "./CreateRoom.css";
import randomInteger from "random-int";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { useParams } from "react-router-dom";
import id from "../GenId";

const CreateRoom = (props) => {
  let [roomId, setRoomId] = useState();
  let { username } = useParams();
  useEffect(() => {
    setRoomId(genNum());
  }, []);

  let genNum = () => {
    return randomInteger(1, 1000000000);
  };
  //console.log(roomId);
  return (
    <>
      <div className="container-fluid">
        <div className="mt-5">
          <center>
            <h2>Tic Tac Toe</h2>
          </center>
        </div>
        <div className="mt-3">
          <center>
            <div className="num-container">
              <span>{roomId}</span>
              <span>
                <FileCopyIcon
                  style={{
                    paddingLeft: "7px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                  }}
                />
              </span>
            </div>
            <div className="mt-2">Share this code to the second player</div>
          </center>
        </div>
      </div>
      <div className="mt-3">
        <center>
          <button
            className="btn next-btn"
            onClick={() => {
              props.history.push(`/${username}/${roomId}/${id}`);
            }}
          >
            Join
          </button>
        </center>
      </div>
    </>
  );
};

export default CreateRoom;
