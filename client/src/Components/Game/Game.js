import React, { useEffect, useRef, useState } from "react";
import "../Bootstarp.css";
import "./Game.css";
import { useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
const ENDPOINT = "https://tictactoe-mern.herokuapp.com/";

const style = {
  height: "60px",
  width: "60px",
  fontSize: "20px",
};

var socket;
const Game = () => {
  const { username, roomId, userId } = useParams();
  let turn = useRef(0);
  let [players, setPlayers] = useState({});
  let [pos, setPos] = useState([]);
  let [col, setCol] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  let history = useHistory();
  //let changeInpos = 0;
  //functions
  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("join-room", {
      user: username,
      roomId: roomId.toString(),
      userId: userId,
    });

    socket.on("setPlayer", async (p) => {
      await setPlayers(() => {
        return p;
      });
    });

    socket.once("playerLeft", (data) => {
      alert(data.err);
      history.push(`/room/${username}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on("move-made", (data) => {
      turn.current = data.turn;
      let p = data.pos;
      let postions = pos;
      if ((data.turn - 1) % 2 === 0) {
        postions[p] = 48;
        setPos(postions);
        setCol((oldCol) => {
          return [...oldCol, 1];
        });
      } else {
        postions[p] = 10799;
        setPos(postions);
        setCol((oldCol) => {
          return [...oldCol, 1];
        });
      }
    });
    socket.on("gameFinished", (data) => {
      if (data.winner === -1) {
        alert("No one won the game..");
        //console.log(data);
      } else if (data.winner === 48) {
        alert("Player 1 win");
      } else if (data.winner === 10799) {
        alert("Player 2 win");
      }
      history.push(`/room/${username}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn.current]);

  let btnClick = async (e) => {
    if (!e.target.readOnly) {
      if (Object.keys(players)[turn.current % 2] === userId) {
        let posArr = pos;
        posArr[parseInt(e.target.name)] = await (turn.current % 2 === 0
          ? 48
          : 10799);
        turn.current += 1;
        socket.emit("make-move", {
          turn: turn.current,
          roomId: roomId,
          pos: e.target.name,
          posArr: posArr,
        });
      } else {
        alert("Another Players Turn");
      }
    } else {
      alert("Already Played by other player");
    }
  };

  return (
    <>
      {Object.keys(players).length === 2 ? (
        <div className="container-fuild">
          <div className="mt-5">
            <center>
              <h2>Tic Tac Toe</h2>
            </center>
          </div>

          <div className="details-container">
            <p>Room ID : {roomId}</p>
            {Object.keys(players).map((val, i) => {
              return (
                <SetPlayerName key={i} index={i} val={val} players={players} />
              );
            })}
          </div>
          <center>
            <div className="game-container">
              {col.map((p, index) => {
                //console.log(index);
                return (
                  <Box
                    key={index}
                    pos={index}
                    sign={pos[index]}
                    btnclk={btnClick}
                  ></Box>
                );
              })}
            </div>
          </center>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

let SetPlayerName = (props) => {
  return (
    <>
      <p>
        Player {props.index + 1} : {props.players[props.val]}
        <span
          style={{
            marginLeft: "2%",
          }}
        >
          Sign :{" "}
          {props.index === 0
            ? String.fromCharCode(48)
            : String.fromCharCode(10799)}
        </span>
      </p>
    </>
  );
};

const Loader = () => {
  return (
    <>
      <center>
        <h2>Please Wait For Anothor Player...</h2>
      </center>
    </>
  );
};

const Box = (props) => {
  //console.log(props.sign);
  if (props.pos <= 8) {
    return (
      <>
        <input
          type="button"
          value={String.fromCharCode(props.sign)}
          name={props.pos}
          className="box"
          style={style}
          onClick={(e) => {
            props.btnclk(e);
          }}
          readOnly={props.sign ? true : false}
        />
      </>
    );
  } else {
    return null;
  }
};

export default Game;
