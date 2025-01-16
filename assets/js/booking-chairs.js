let urlParams = new URLSearchParams(window.location.search)
let getAirline = JSON.parse(decodeURIComponent(urlParams.get('dataBooking')))
let seatBooking = []
let seatDiv = document.getElementById("seatDiv");

console.log(getAirline)

const loadHeader = async () => {
    const headerPage = document.getElementById("header-page");
    try {
      let headerResponse = await fetch("../components/header.html");
      let headerHTML = await headerResponse.text();
      headerPage.innerHTML = headerHTML;
    } catch (error) {
      console.error("Message ===> ", error);
    }
  };
loadHeader()

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
            <div class="seat-div flex justify-center items-center w-8 h-8 bg-gray-200 text-gray-700 text-sm py-1 px-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <button onclick="chooseSeats('${JSON.stringify(dataSeats).replace(/"/g, '&quot;')}')">${dataSeats.number_seat}</button>
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

document.getElementById('button-finish').addEventListener('click', (e) => {
    e.preventDefault()

    setTimeout(() => {
        window.location.href = "./booking-airline.html"
    }, 2000);
})


const chooseSeats = (dataSeats) => {

    let getData = JSON.parse(dataSeats)
    console.log(seatBooking)
    // let seatSelect = {
    //     id,
    //     flight_id,
    //     number_seat,
    //     is_booked
    // }

    let price = 1000000;
    let priceDiv = document.getElementById('priceDiv')

    let divSeat = event.target.closest(".seat-div");

    if (divSeat.classList.contains("bg-blue-500")) {
        divSeat.classList.remove("bg-blue-500", "hover:bg-blue-600");
        divSeat.classList.add("bg-gray-200", "hover:bg-gray-300");

        seatBooking = seatBooking.filter(seat => seat.number_seat !== getData.number_seat);
        console.log("Kursi dihapus: ", getData.number_seat);
        removeSeatFromBooked(getData.number_seat);
    } else {

        if (!seatBooking.some(seat => seat.number_seat === getData.number_seat)) {
            seatBooking.push(getData);
            console.log("Kursi ditambahkan: ", getData.number_seat);
            addSeatToDiv(getData);
        }
        else {
            console.log("Kursi sudah dipilih sebelumnya: ", getData.number_seat);
        }
        divSeat.classList.remove("bg-gray-200", "hover:bg-gray-300");
        divSeat.classList.add("bg-blue-500", "hover:bg-blue-600");
    }

    const totalPrice = seatBooking.reduce((total) => total + price, 0);
    document.getElementById("priceDiv").value = totalPrice;

}

const addSeatToDiv = (seat) => {
   
    const seatElement = document.createElement("div");
    seatElement.innerHTML = `
        <div class="selected-seat bg-blue-100 p-1 m-2 rounded-md w-10 text-center">
            <span class="text-xs font-semibold">${seat.number_seat}</span><br>
        </div>
    `;
    seatDiv.appendChild(seatElement);
};

const removeSeatFromBooked = (seatNumber) => {
    const seatElements = document.querySelectorAll(".selected-seat");
    seatElements.forEach(seatElement => {
        if (seatElement.innerText.includes(seatNumber)) {
            seatElement.remove();
        }
    });
};

fetchSeat()
