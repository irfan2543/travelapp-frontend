let filterDiv = document.querySelectorAll('.filterrDiv')
let airlineDiv = document.querySelectorAll('.airlineDiv')
let baggageFirst = document.getElementById('baggageFirst')
let baggageSecond = document.getElementById('baggageSecond')
let filterAirline = []
let stateeButton = 0;
let flightId = 0
let statee = 0;

const loadHeader = async () => {

    const headerPage = document.getElementById('header-page')
    try{
        let headerResponse = await fetch('../components/header.html')
        let headerHTML = await headerResponse.text()
        headerPage.innerHTML = headerHTML
    }catch(error){
        console.error("Message ===> ", error)
    }
}

const rupiahPrice = (number) => {
    return new Intl.NumberFormat("id-ID", {
        style : "currency",
        currency : "IDR",
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    }).format(number)
}

const flightAirline = async () => {

        axios.get('http://localhost:3002/schedule')
        .then(res => {
            filterAirline = res.data
           renderAirline(filterAirline)
        })
        .catch(err => {
            console.error(err); 
        })
}

const renderAirline = (filterCompany) => {
   
    let dataAirlineDiv = document.getElementById('dataAirlineDiv')
    dataAirlineDiv.innerHTML = ""
    dataAirlineDiv.innerHTML = filterCompany.map((dataAirline) =>  {
       
        let dataDate = new Date(dataAirline.date_departure).toISOString().split('T')[0]
        let getDay = new Date(dataAirline.date_departure).getDate();
        let getMonth = new Date(dataAirline.date_departure).toLocaleString('id-ID', { month: 'long' });
        let getYear = new Date(dataAirline.date_departure).getFullYear();

        let dataTimeDeparture = new Date(dataAirline.date_departure).toLocaleTimeString("id-ID", {timeZone: "Asia/Jakarta", hour12: false, hour: '2-digit', minute:'2-digit'})
        let dataTimeArrival = new Date(dataAirline.date_arrival).toLocaleTimeString("id-ID", {timeZone: "Asia/Jakarta", hour12: false, hour: '2-digit', minute:'2-digit'})

        let timeDifference = new Date(dataAirline.date_arrival) - new Date(dataAirline.date_departure)
        let minutesDifference = timeDifference / (1000 * 60)
        let cabinAirline = ""

        if(dataAirline.is_cabin === 1){
            cabinAirline = `<img src="../assets/img/cabin.png" alt="Cabin" class="w-7 h-5">`
        }else{
            cabinAirline =  `<img src="../assets/img/nocabin.png" alt="No Cabin" class="w-7 h-3">`
        }

        let imgAirline = ""

        if(dataAirline.id_maskapai === 1){
            imgAirline = `<img src="../assets/img/airline_logo/garudaindonesia_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
        }else if(dataAirline.id_maskapai === 2){
            imgAirline = `<img src="../assets/img/airline_logo/lionair_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
        }else if(dataAirline.id_maskapai === 3){
            imgAirline = `<img src="../assets/img/airline_logo/airasiaindonesia_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
        }else if(dataAirline.id_maskapai === 4){
            imgAirline = `<img src="../assets/img/airline_logo/citilink_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
        }else if(dataAirline.id_maskapai === 5){
            imgAirline = `<img src="../assets/img/airline_logo/batikair_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
        }
   
        return(`
            <div class="airlineDiv my-10 w-11/12 bg-[#8b8a8a6c] rounded-xl">
                <div class="flex flex-col space-y-10 space-x-2">
                    <div class="flex flex-row tracking-wider mt-3">
                        <div class="basis-1/4">
                        ${imgAirline}
                        </div>
                        <div class="basis-2/4 flex flex-row font-semibold">
                            <div class="flex flex-col justify-center items-center basis-1/4 text-sm">
                                <p>${dataTimeDeparture}</p>
                                <p>${dataAirline.city_from}</p>
                            </div>
                            <div class="basis-2/4 flex flex-col items-center justify-center text-xs">
                                <p>${minutesDifference} Menit</p>
                                <img src="../assets/img/airline_linelogo.png" alt="Airline Line" class="w-full h-5">
                            </div>
                            <div class="flex flex-col justify-center items-center basis-1/4 text-sm text-sp">
                                <p>${dataTimeArrival}</p>
                                <p>${dataAirline.city_to}</p>
                            </div>
                        </div>
                        <div class="basis-1/4 flex flex-col justify-center items-center">
                            ${rupiahPrice(dataAirline.price)}
                        </div>
                    </div>
                    <div class="flex flex-row text-sm pb-2">
                        <div class="flex-1 flex flex-row">
                            <div class="flex flex-row items-center justify-center">
                                <p>${getDay} ${getMonth} ${getYear}</p>
                            </div>
                            <div class="flex flex-row items-center justify-center ml-7">
                                <img src="../assets/img/baggage.png" alt="Baggage" class="w-8 h-5">
                                <p class="text-[12px]">${dataAirline.baggage}</p>
                                <div class="ml-7">${cabinAirline}</div>
                            </div>
                        </div>
                        <div class="flex-1 flex items-end justify-end">
                            <button class="border rounded-xl bg-yellow-300 w-24 h-7 hover:scale-105 mr-3" 
                            onclick="handleUpdate('${JSON.stringify(dataAirline).replace(/"/g, '&quot;')}')">Update</button>
                        </div>      
                    </div>
                </div>
            </div>
        `
        )
    }).join('')
}

const updateBooking = () => {

    try{
        id_airline = document.getElementById('id_airline').value
        let date_departure = document.getElementById('date_departure').value
        let date_arrival = document.getElementById('date_arrival').value

        let city_departure = document.getElementById('city_from').value
        let city_arrival = document.getElementById('city_to').value

        if(city_departure === city_arrival){
            Swal.fire({
                title: "Gagal Mengubah",
                text: "Tidak Bisa Memilih Penerbangan Yang Sama",
                icon: "error"
              })
              setTimeout(() => {
                window.location.reload()
              }, 2000);
        }else{
            let dateDepartureFinal = moment(date_departure).format("yyyy-MM-DD HH:mm:ss")
            let dateArrivalFinal = moment(date_arrival).format("yyyy-MM-DD HH:mm:ss")
            let updateFlight = {
                
               "id_maskapai" : document.getElementById('airlineCompany').value, 
               "date_departure" : dateDepartureFinal,
               "date_arrival" : dateArrivalFinal,
               "city_departure" : city_departure,
               "city_arrival" : city_arrival,
               "price" : document.getElementById('priceFlight').value,
               "baggage" : parseInt(document.getElementById('baggage').value),
               "is_cabin" : document.getElementById('isCabin').value,
            }
           
            axios.put(`http://localhost:3002/schedule/${id_airline}`, updateFlight)
            .then((results) => {
                Swal.fire({
                    title: "Success",
                    text: "Penerbangan Berhasil Diubah",
                    icon: "success"
                  })
                  setTimeout(() => {
                    window.location.reload()
                  }, 1000);
            }).catch((err) =>{
                console.error(err)
            })
        }  
    }catch(err){
        console.error(err)
    }

}

const handleSubmit = () => {
    if(stateeButton == 0){
        makeFlight()
    }else{
        updateBooking()
    }
}

const makeFlight = () => {

    let date_departure = document.getElementById('date_departure').value
    let date_arrival = document.getElementById('date_arrival').value

    let dateDepartureFinal = moment(date_departure).format("yyyy-MM-DD HH:mm:ss")
    let dateArrivalFinal = moment(date_arrival).format("yyyy-MM-DD HH:mm:ss")

    let newFlight = {
                
        "id_maskapai" : document.getElementById('airlineCompany').value, 
        "date_departure" : dateDepartureFinal,
        "date_arrival" : dateArrivalFinal,
        "city_departure" : document.getElementById('city_from').value,
        "city_arrival" : document.getElementById('city_to').value,
        "price" : document.getElementById('priceFlight').value,
        "baggage" : parseInt(document.getElementById('baggage').value),
        "is_cabin" : document.getElementById('isCabin').value,
     }

     console.log(newFlight)

     axios.post('http://localhost:3002/flights', newFlight)
     .then((results) => {
        Swal.fire({
            title: "Penerbangan",
            text: "Penerbangan Telah Dibuat",
            icon: "Success"
          })
          setTimeout(() => {
            window.location.reload()
          }, 2000);

     }).catch((err) => {
        console.error(err)
        
     })
}

const handleUpdate = (dataAirline) => {

    let jsonAirline = JSON.parse(dataAirline)
    date_departure = moment(jsonAirline.date_departure).local()
    date_arrival = moment(jsonAirline.date_arrival).local()

    if(stateeButton == 0){
        stateeButton = 1
        document.getElementById('btn-process').innerHTML = "Update"
        
        if(jsonAirline !== null) {

            flightId = dataAirline.id
            document.getElementById('id_airline').value = jsonAirline.id
            document.getElementById('airlineCompany').value = jsonAirline.id_maskapai
            document.getElementById('date_departure').value = date_departure.format('yyyy-MM-DD HH:mm');
            document.getElementById('date_arrival').value = date_arrival.format('yyyy-MM-DD HH:mm');
            document.getElementById('city_from').value = jsonAirline.city_departure
            document.getElementById('city_to').value = jsonAirline.city_arrival
            document.getElementById('priceFlight').value = jsonAirline.price
            document.getElementById('baggage').value = jsonAirline.baggage
            document.getElementById('isCabin').value = jsonAirline.is_cabin
        }else{
            stateeButton = 0
            document.getElementById('btn-process').innerHTML = "Kirim"
        }
    }
}

const filterAllAirline = () => {

    let minPrice = parseInt(document.getElementById('firstPrice').value) || 0
    let maxPrice = parseInt(document.getElementById('secondPrice').value) || Infinity

    let selectBaggage = Array.from(document.querySelectorAll('.baggageCheckbox:checked')).map(checkbox => parseInt(checkbox.value))

    let selectCabin = document.getElementById('cabin')?.checked ? parseInt(document.getElementById('cabin').value) : null

    let filterCompany = filterAirline.filter(airline => {
        let selectedBaggage =  selectBaggage.length === 0 || selectBaggage.includes(airline.baggage)
        let selectedCabin = selectCabin === null || selectCabin === airline.is_cabin
        let selectPrice = airline.price >= minPrice && airline.price <= maxPrice

       return selectedBaggage && selectedCabin && selectPrice
    })
    console.log(filterCompany)
    renderAirline(filterCompany)
}

document.querySelectorAll('.baggageCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', filterAllAirline)
})

document.getElementById('cabin').addEventListener('change', filterAllAirline)

document.getElementById('firstPrice').addEventListener('input', filterAllAirline)

document.getElementById('secondPrice').addEventListener('input', filterAllAirline)

document.getElementById('filterBtn').addEventListener('click', (e) => {
    e.preventDefault()

    if(statee === 0){
        statee = 1

        filterDiv.forEach((div) => {
            div.classList.add('hidden')
            document.getElementById('filterComponent').setAttribute("style" , "height:30px")
        })
    }else{
        statee = 0
        filterDiv.forEach((div) => {
            div.classList.remove('hidden')
            document.getElementById('filterComponent').setAttribute("style" , "height:320px")
        })
    }
})


flightAirline()
window.onload = loadHeader;

