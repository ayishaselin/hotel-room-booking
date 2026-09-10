import { rooms } from "./data/rooms.js";
import { renderRooms } from "./ui/roomRenderer.js";
import { getToday } from "./utils/dateUtils.js";
import { validateDates } from "./utils/validation.js";

const roomList = document.querySelector("#room-list");
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const errorMessage = document.querySelector("#error-message");


/* initial date setup */

const today = getToday();
renderRooms(rooms, roomList);
checkInInput.min = getToday();
checkOutInput.min = getToday();


checkInInput.addEventListener("change", handleDateChange);
checkOutInput.addEventListener("change", handleDateChange);



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



function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("visible");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");
}