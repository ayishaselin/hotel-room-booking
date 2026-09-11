import { formatDate } from "../utils/dateUtils.js";
export function renderRooms(
  rooms,
  container,
  selectedRoomCode = null,
  bookingDetails = {},
) {
  container.innerHTML = rooms
    .map((room) => {
      const isSelected = room.code === selectedRoomCode;

      return `
            <article class="room-card ${isSelected ? "selected" : ""}">

                <div class="room-info">
                    <span class="room-code">${room.code}</span>
                    <h3>${room.type}</h3>
                    <p>Up to ${room.maxGuests} guests</p>
                </div>

                <div class="room-price">
                    <strong>
                        ₹${room.pricePerNight.toLocaleString("en-IN")}
                    </strong>

                    <span>/ night</span>

                    <button
                        type="button"
                        class="select-room-btn ${isSelected ? "selected" : ""}"
                        data-room-code="${room.code}"
                    >
                        ${isSelected ? "Selected" : "Select Room"}
                    </button>
                </div>

                ${
                  isSelected
                    ? `
    <div class="room-summary">
        <div class="room-summary-content">

            <h4>Booking Summary</h4>

            ${
              bookingDetails.error
                ? `<p class="room-summary-error">${bookingDetails.error}</p>`
                : `
                        <div class="summary-row">
                            <span>Check-in</span>
                            <strong>
    ${bookingDetails.checkIn ? formatDate(bookingDetails.checkIn) : "-"}
</strong>
                        </div>

                        <div class="summary-row">
                            <span>Check-out</span>
                            <strong>
    ${bookingDetails.checkOut ? formatDate(bookingDetails.checkOut) : "-"}
</strong>
                        </div>

                        <div class="summary-row">
                            <span>Nights</span>
                            <strong>${bookingDetails.nights || 0}</strong>
                        </div>

                        <div class="summary-row">
                            <span>Price per night</span>
                            <strong>
                                ₹${room.pricePerNight.toLocaleString("en-IN")}
                            </strong>
                        </div>

                        <div class="room-summary-total">
                            <span>Total</span>
                            <strong>
                                ₹${(bookingDetails.total || 0).toLocaleString("en-IN")}
                            </strong>
                        </div>
                    `
            }

        </div>
    </div>
`
                    : ""
                }

            </article>
        `;
    })
    .join("");
}
