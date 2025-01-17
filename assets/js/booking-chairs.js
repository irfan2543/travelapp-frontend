let urlParams = new URLSearchParams(window.location.search)
let getAirline = JSON.parse(decodeURIComponent(urlParams.get('dataBooking')))

let dataAirline = {
    id : getAirline.id,
    flight_id : getAirline.flight_id,
    baggage : getAirline.baggage,
    city_from : getAirline.city_from,
    city_to : getAirline.city_to,
    email : getAirline.email,
    is_cabin : getAirline.is_cabin,
    price : getAirline.price
}
let seatsChoose = []
let seatBooking = []
let seatDiv = document.getElementById("seatDiv");
let totalPrice = 0

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

    let response = await axios.get(`http://localhost:3002/seat?flight_id=${dataAirline.flight_id}`)
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
        let isBook = dataSeats.is_booked === 0;
        
        return(
            `
                <div class="seat-div flex justify-center items-center w-8 h-8 ${isBook ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} text-sm py-1 px-2 rounded-md 
                ${isBook ? "" : "hover:bg-gray-300"} focus:outline-none focus:ring-2 
                ${isBook ? "" : "focus:ring-blue-400"}">
                <button class="buttonSeats" onclick="${isBook ? "" : `chooseSeats('${JSON.stringify(dataSeats).replace(/"/g, "&quot;")}')`}" 
                        ${isBook ? "disabled" : ""}
                        style="${isBook ? "cursor: not-allowed;" : ""}">${dataSeats.number_seat}</button>
                </div>
            `
        )
    }).join('')

}


document.getElementById('button-back').addEventListener('click', (e) => {
    e.preventDefault()
    
    setTimeout(() => {
        window.location.href =  `../index.html`
    }, 2000);
})

document.getElementById('button-finish').addEventListener('click', (e) => {
    e.preventDefault()

    let displaySeat = seatBooking.map((seat) => ({
        id : seat.id,
        flight_id : seat.flight_id
    }))

    console.log(displaySeat)
    let newData = {

        "flight_id" : dataAirline.flight_id,
        "baggage" : dataAirline.baggage,
        "city_from" : dataAirline.city_from,
        "city_to" : dataAirline.city_to,
        "email" : dataAirline.email,
        "is_cabin" : dataAirline.is_cabin,
        "total_price" : parseInt(document.getElementById("priceDiv").value),
        "flight_seats" : displaySeat,
    }
    try{
        axios.put(`http://localhost:3002/Ticket/${dataAirline.id}`, newData)
        .then(res => {
            Swal.fire({
                title: "Berhasil",
                text: "Kamu Berhasil Mendaftar Ke Penerbangan",
                icon: "success"
              });
              let takeDataUser = localStorage.getItem('UserLogin')
              let jsonUser = JSON.parse(takeDataUser)

              let sendSeat = {
                id : dataAirline.id,
                flight_id : dataAirline.flight_id,
                full_name : jsonUser.fullname,
                city_from : dataAirline.city_from,
                city_to : dataAirline.city_to,
                price : parseInt(document.getElementById("priceDiv").value),
                email : dataAirline.email,
                baggage : dataAirline.baggage,
                is_cabin : dataAirline.is_cabin,
                status : "Process",
                flight_seats : seatsChoose
                }
              let queryData = encodeURIComponent(JSON.stringify(sendSeat))
            setTimeout(() => {
                window.location.href = `./transaction.html?seatBooking=${queryData}`
            }, 2000);
        })
    }catch(err){
        console.error(err)
    }

})


const chooseSeats = (dataSeats) => {

    let getData = JSON.parse(dataSeats)
    
    let seatID = {
        id : getData.id,
        flight_id : getData.flight_id
    }

    let priceDiv = document.getElementById('priceDiv')
    let priceData = parseInt(dataAirline.price)
    let divSeat = event.target.closest(".seat-div");

    if (divSeat.classList.contains("bg-blue-500")) {
        divSeat.classList.remove("bg-blue-500", "hover:bg-blue-600");
        divSeat.classList.add("bg-gray-200", "hover:bg-gray-300");

        seatBooking = seatBooking.filter(seat => seat.number_seat !== getData.number_seat);
        seatsChoose = seatsChoose.filter(seat => seat.number_seat !== getData.number_seat);
        removeSeatFromBooked(getData.number_seat);
        seatBooking.pop();
    } else {

        if (!seatBooking.some(seat => seat.number_seat === getData.number_seat)) {
            seatsChoose.push(dataSeats)
            seatBooking.push(seatID);
            addSeatToDiv(getData);
        }
        divSeat.classList.remove("bg-gray-200", "hover:bg-gray-300");
        divSeat.classList.add("bg-blue-500", "hover:bg-blue-600");
    }
        totalPrice = seatBooking.length * dataAirline.price;
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
