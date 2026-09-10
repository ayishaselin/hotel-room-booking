import { rooms } from "./data/rooms.js";
import { renderRooms } from "./ui/roomRenderer.js";

import { validateDates } from "./utils/validation.js";
import { getToday, calculateNights } from "./utils/dateUtils.js";
import { calculateTotal } from "./utils/bookingUtils.js";
import { showBookingSummary, hideBookingSummary } from "./ui/bookingSummary.js";


const roomList = document.querySelector("#room-list");
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const errorMessage = document.querySelector("#error-message");
const bookingSummary = document.querySelector("#booking-summary");

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
    updateBooking();
}

function updateBooking() {
    const checkIn = checkInInput.value;
    const checkOut = checkOutInput.value;

    const dateError = validateDates(
        checkIn,
        checkOut
    );

    if (dateError) {
        showError(dateError);
        hideBookingSummary(bookingSummary);
        return;
    }

    clearError();

    const selectedRoom = rooms.find(
        room => room.code === selectedRoomCode
    );

    if (!selectedRoom) {
        showError("Please select a room.");
        hideBookingSummary(bookingSummary);
        return;
    }

    const nights = calculateNights(
        checkIn,
        checkOut
    );

    const total = calculateTotal(
        nights,
        selectedRoom.pricePerNight
    );

    showBookingSummary({
        summaryElement: bookingSummary,
        room: selectedRoom,
        checkIn,
        checkOut,
        nights,
        total
    });
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

    updateBooking();
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add("visible");
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.classList.remove("visible");
}