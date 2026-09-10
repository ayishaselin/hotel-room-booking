export function renderRooms(rooms, container, selectedRoomCode = null) {
    
    container.innerHTML = rooms.map(room => {
         const isSelected = room.code === selectedRoomCode;

        return `
    

        <article class="room-card ${isSelected ? "selected" : " "}>

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
                    ${isSelected ? "Selected ✓" : "Select Room"}
                </button>
            </div>
        </article>
    `;}).join("");
}