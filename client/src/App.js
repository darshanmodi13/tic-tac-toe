import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Room from "./Components/Room/Room";
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import JoinRoom from "./Components/JoinRoom/JoinRoom";
import Game from "./Components/Game/Game";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:username" component={Room} />
        <Route exact path="/:username/create-room" component={CreateRoom} />
        <Route exact path="/:username/join-room" component={JoinRoom} />
        <Route exact path="/:username/:roomId/:userId" component={Game} />
      </Switch>
    </>
  );
}

export default App;
