export function renderRooms(rooms, container) {
    container.innerHTML = rooms.map(room => `
        <article class="room-card">
            <div class="room-info">
                <span class="room-code">${room.code}</span>
                <h3>${room.type}</h3>
                <p>Up to ${room.maxGuests} guests</p>
            </div>

            <div class="room-price">
                <strong>₹${room.pricePerNight.toLocaleString("en-IN")}</strong>
                <span>/ night</span>

                <button
                    type="button"
                    data-room-code="${room.code}"
                >
                    Select Room
                </button>
            </div>
        </article>
    `).join("");
}