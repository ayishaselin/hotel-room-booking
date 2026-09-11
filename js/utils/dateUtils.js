const MS_PER_DAY = 1000 * 60 * 60 * 24;


export function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/* Calculation of nights b/w 2 dates */

export function calculateNights(checkIn, checkOut) {
    const startDate = new Date(`${checkIn}T00:00:00`);
    const endDate = new Date(`${checkOut}T00:00:00`);

    return Math.round(
        (endDate - startDate) / MS_PER_DAY
    );
}

export function formatDate(dateString) {
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}