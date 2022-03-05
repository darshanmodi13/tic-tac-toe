const express = require("express");
const mongoose = require("mongoose");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("Hello World!");
  res.end();
});
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const Game = require("./GameSchema");

const environment = process.env.NODE_ENV || "development";
if (environment === "development") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on("connection", (socket) => {
  try {
    console.log("New Connection...");
    socket.on("join-room", async (props) => {
      let players = await room(props);

      socket.join(props.roomId);
      //console.log(io.sockets.adapter.rooms.get(props.roomId));
      if (Object.keys(players).length == 2) {
        io.to(props.roomId).emit("setPlayer", players);
      }

      socket.on("make-move", (data) => {
        //console.log(data.posArr);
        io.to(data.roomId).emit("move-made", {
          turn: data.turn,
          pos: data.pos,
        });
        if (data.turn >= 4) {
          if (
            data.posArr[0] + data.posArr[1] + data.posArr[2] == 144 ||
            data.posArr[0] + data.posArr[1] + data.posArr[2] == 32397 ||
            data.posArr[0] + data.posArr[3] + data.posArr[6] == 144 ||
            data.posArr[0] + data.posArr[3] + data.posArr[6] == 32397 ||
            data.posArr[0] + data.posArr[4] + data.posArr[8] == 144 ||
            data.posArr[0] + data.posArr[4] + data.posArr[8] == 32397
          ) {
            //console.log(data.posArr[0] + data.posArr[3] + data.posArr[6]);
            io.to(data.roomId).emit("gameFinished", { winner: data.posArr[0] });
          } else if (
            data.posArr[2] + data.posArr[5] + data.posArr[8] == 32397 ||
            data.posArr[2] + data.posArr[5] + data.posArr[8] == 144 ||
            data.posArr[2] + data.posArr[4] + data.posArr[6] == 32397 ||
            data.posArr[2] + data.posArr[4] + data.posArr[6] == 144
          ) {
            io.to(data.roomId).emit("gameFinished", { winner: data.posArr[2] });
          } else if (
            data.posArr[1] + data.posArr[4] + data.posArr[7] == 144 ||
            data.posArr[1] + data.posArr[4] + data.posArr[7] == 32397
          ) {
            io.to(data.roomId).emit("gameFinished", { winner: data.posArr[1] });
          } else if (
            data.posArr[3] + data.posArr[4] + data.posArr[5] == 144 ||
            data.posArr[3] + data.posArr[4] + data.posArr[5] == 32397
          ) {
            io.to(data.roomId).emit("gameFinished", { winner: data.posArr[3] });
          } else if (
            data.posArr[6] + data.posArr[7] + data.posArr[8] == 144 ||
            data.posArr[6] + data.posArr[7] + data.posArr[8] == 32397
          ) {
            io.to(data.roomId).emit("gameFinished", { winner: data.posArr[6] });
          }

          if (data.turn >= 9) {
            io.to(data.roomId).emit("gameFinished", { winner: -1 });
          }
        }
      });

      socket.on("disconnect", () => {
        io.to(props.roomId).emit("playerLeft", { err: "Player Left" });
      });
    });
  } catch (error) {
    console.log(error);
  }
});

let room = async (props) => {
  let room = await Game.findOne({ roomId: props.roomId });
  let user = {};
  user[props.userId] = props.user;
  if (!room) {
    let g = new Game({
      roomId: props.roomId,
      users: user,
    });
    //console.log("Created:", g);
    await g.save();
  } else {
    if (Object.keys(room.users).length <= 2) {
      let g = await Game.findOne({ roomId: props.roomId });
      let newUsers = { ...g.users, ...user };
      await Game.updateOne({ roomId: props.roomId }, { users: newUsers });
    }
  }

  let players = await Game.findOne({ roomId: props.roomId });
  return players.users;
};

app.get("/", (req, res) => {
  res.end("Tic Toe Server.");
});

const PORT = process.env.PORT || "8080";

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
