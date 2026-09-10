import { rooms } from "./data/rooms.js";
import { renderRooms } from "./ui/roomRenderer.js";
import { getToday } from "./utils/dateUtils.js";
import { validateDates } from "./utils/validation.js";


const roomList = document.querySelector("#room-list");
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const errorMessage = document.querySelector("#error-message");

let selectedRoomCode = null;

/* initial date setup */

const today = getToday();

checkInInput.min = today;
checkOutInput.min = today;
renderRooms(rooms, roomList, selectedRoomCode);


checkInInput.addEventListener("change", handleDateChange);
checkOutInput.addEventListener("change", handleDateChange);
roomList.addEventListener("click", handleRoomSelection);


function handleDateChange() {

    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;

    const error = validateDates(
        checkIn,
        checkOut
    );

    if (error) {
        showError(error);
        return;
    }

    clearError();
}

function handleRoomSelection(event) {
    const button = event.target.closest("[data-room-code]");

    if (!button) {
        return;
    }

    selectedRoomCode = button.dataset.roomCode;

    renderRooms(
        rooms,
        roomList,
        selectedRoomCode
    );
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("visible");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");
}