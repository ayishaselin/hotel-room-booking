import { rooms } from "./data/rooms.js";
import { renderRooms } from "./ui/roomRenderer.js";

const roomList = document.querySelector("#room-list");

renderRooms(rooms, roomList);