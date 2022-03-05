import io from "socket.io-client";

const ENDPOINT = "http://localhost:3300";

let socket = io(ENDPOINT);



export {socket};