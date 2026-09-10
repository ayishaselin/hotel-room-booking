import { getToday } from "./dateUtils.js";


/* Validates check-in and check-out dates */

export function validateDates(checkIn, checkOut) {

    if (!checkIn) {
        return "Please select a check-in date.";
    }

    if (!checkOut) {
        return "Please select a check-out date.";
    }

    if (checkIn < getToday()) {
        return "Check-in date cannot be in the past.";
    }

    if (checkOut <= checkIn) {
        return "Check-out date must be after check-in date.";
    }

    return null;
}