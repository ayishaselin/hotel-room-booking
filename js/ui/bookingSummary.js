export function showBookingSummary({
  summaryElement,
  room,
  checkIn,
  checkOut,
  nights,
  total,
}) {
  document.querySelector("#summary-room").textContent =
    `${room.code} - ${room.type}`;

  document.querySelector("#summary-check-in").textContent = formatDate(checkIn);

  document.querySelector("#summary-check-out").textContent =
    formatDate(checkOut);

  document.querySelector("#summary-nights").textContent =
    `${nights} ${nights === 1 ? "night" : "nights"}`;

  document.querySelector("#summary-price").textContent = formatCurrency(
    room.pricePerNight,
  );

  document.querySelector("#summary-total").textContent = formatCurrency(total);

  summaryElement.classList.remove("hidden");
}

export function hideBookingSummary(summaryElement) {
  summaryElement.classList.add("hidden");
}

function formatCurrency(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
