let urlParams = new URLSearchParams(window.location.search)
let getAirline = JSON.parse(decodeURIComponent(urlParams.get('dataBooking')))


// console.log(getAirline)

const fetchSeat = async () => {

    let coba = {
        flight_id : 3
    }

    let response = await axios.get(`http://localhost:3002/seat?flight_id=${coba.flight_id}`)
    .then(res => {
        seatDisplay(res.data)
    })
    .catch(err => {
        console.error(err); 
    })
}

const seatDisplay = (data) => {
    
    let seats = data.seats

    let seatPassanger = document.getElementById('seat-passanger')

    seatPassanger.innerHTML = seats.map((dataSeats)  => {
        
        return(
            `
            <div class="seat">
                <button onclick="chooseSeats(${dataSeats.flight_id}, ${dataSeats.id}, '${dataSeats.number_seat}', ${dataSeats.is_booked})">${dataSeats.number_seat}</button>
            </div>
            `
        )
    }).join('')

}

document.getElementById('button-back').addEventListener('click', (e) => {
    e.preventDefault()

    setTimeout(() => {
        window.location.href = "./booking-airline.html"
    }, 2000);
})

// document.getElementById('button-finish').addEventListener('click', (e) => {

// })

const chooseSeats = (flight_id, id, number_seat, is_booked) => {

    let seatSelect = {
        id,
        flight_id,
        number_seat,
        is_booked
    }
    console.log(seatSelect)
}

fetchSeat()