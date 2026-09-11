import { rooms } from "./data/rooms.js";
import { renderRooms } from "./ui/roomRenderer.js";
import { getToday, calculateNights } from "./utils/dateUtils.js";
import { calculateTotal } from "./utils/bookingUtils.js";
import { validateDates } from "./utils/validation.js";

const roomTypeFilter = document.querySelector("#room-type-filter");
const guestFilter = document.querySelector("#guest-filter");
const noRoomsMessage = document.querySelector("#no-rooms-message");
const roomList = document.querySelector("#room-list");
const roomsSection = document.querySelector("#rooms-section");
const checkInInput = document.querySelector("#check-in");
const checkOutInput = document.querySelector("#check-out");
const searchRoomsButton = document.querySelector("#search-rooms");
const errorMessage = document.querySelector("#error-message");

let selectedRoomCode = null;

let visibleRooms = [];

/* Initial Setup */

const today = getToday();
checkInInput.min = today;
checkOutInput.min = today;

roomsSection.classList.add("hidden");
checkInInput.addEventListener("change", handleDateChange);
checkOutInput.addEventListener("change", handleDateChange);
searchRoomsButton.addEventListener("click", handleSearchRooms);
roomList.addEventListener("click", handleRoomSelection);
roomTypeFilter.addEventListener("change", handleFilterChange);
guestFilter.addEventListener("change", handleFilterChange);


function handleDateChange() {
  const checkIn = checkInInput.value;

  if (checkIn) {
    checkOutInput.min = checkIn;
  } else {
    checkOutInput.min = getToday();
  }

  clearError();
  roomsSection.classList.add("hidden");
  selectedRoomCode = null;
}

function handleSearchRooms() {
  const checkIn = checkInInput.value;
  const checkOut = checkOutInput.value;

  const dateError = validateDates(checkIn, checkOut);

  if (dateError) {
    showError(dateError);

    roomsSection.classList.add("hidden");

    return;
  }

  clearError();

  selectedRoomCode = null;
  visibleRooms = rooms;
  roomTypeFilter.value = "all";
  guestFilter.value = "all";

  renderRooms(visibleRooms, roomList, selectedRoomCode);

  roomsSection.classList.remove("hidden");


}


function getBookingDetails() {
  const checkIn = checkInInput.value;
  const checkOut = checkOutInput.value;

  const error = validateDates(checkIn, checkOut);

  if (error) {
    return {
      error,
      checkIn,
      checkOut,
      nights: 0,
      total: 0,
    };
  }

  const nights = calculateNights(checkIn, checkOut);

  const selectedRoom = rooms.find((room) => room.code === selectedRoomCode);

  const total = selectedRoom
    ? calculateTotal(nights, selectedRoom.pricePerNight)
    : 0;

  return {
    error: null,
    checkIn,
    checkOut,
    nights,
    total,
  };



}
function handleRoomSelection(event) {
  const button = event.target.closest("[data-room-code]");

  if (!button) {
    return;
  }

  const roomCode = button.dataset.roomCode;

  if (roomCode === selectedRoomCode) {
    selectedRoomCode = null;

    renderRooms(visibleRooms, roomList, selectedRoomCode);

    return;
  }

  selectedRoomCode = roomCode;

  renderRooms(visibleRooms, roomList, selectedRoomCode, getBookingDetails());
}

function handleFilterChange() {
  const roomType = roomTypeFilter.value;
  const guests = guestFilter.value;

  visibleRooms = rooms.filter((room) => {
    const matchesRoomType = roomType === "all" || room.type === roomType;

    const matchesGuests = guests === "all" || room.maxGuests >= Number(guests);

    return matchesRoomType && matchesGuests;
  });

  const selectedRoomStillVisible = visibleRooms.some(
    (room) => room.code === selectedRoomCode,
  );

  if (!selectedRoomStillVisible) {
    selectedRoomCode = null;
  }

  renderRooms(visibleRooms, roomList, selectedRoomCode, getBookingDetails());

  if (visibleRooms.length === 0) {
    noRoomsMessage.classList.remove("hidden");
  } else {
    noRoomsMessage.classList.add("hidden");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add("visible");
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.classList.remove("visible");
}
