let urlParams = new URLSearchParams(window.location.search)
let getAirline = JSON.parse(decodeURIComponent(urlParams.get('data')))


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

const flightAirline = async () => {

    const checkAirline = {
        date_departure : getAirline.date_departure,
        city_departure : parseInt(getAirline.city_departure),
        city_arrival : parseInt(getAirline.city_arrival)
    }

    console.log(checkAirline)

    const response = await axios.post('http://localhost:3002/schedule', checkAirline)

    if(response.status === 201){
        
        axios.get('http://localhost:3002/schedule')
        .then(res => {
            const resultsAirline = res.data

            let filterAirline = resultsAirline.filter(data => {
                const dataDate = new Date(data.date_departure).toISOString().split('T')[0]
                return(
                    dataDate === checkAirline.date_departure && data.city_departure === checkAirline.city_departure && data.city_arrival === checkAirline.city_arrival
                )
                }
            )
            console.log(filterAirline)
            let dataAirlineDiv = document.getElementById('dataAirlineDiv')
            dataAirlineDiv.innerHTML = filterAirline.map((dataAirline) =>  {
                let dataDate = new Date(dataAirline.date_departure).toISOString().split('T')[0]

                
                let dataTimeDeparture = new Date(dataAirline.date_departure).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta", hour12: false, hour: '2-digit', minute:'2-digit'})
                let dataTimeArrival = new Date(dataAirline.date_arrival).toLocaleTimeString("en-US", {timeZone: "Asia/Jakarta", hour12: false, hour: '2-digit', minute:'2-digit'})

                let timeDifference = new Date(dataAirline.date_arrival) - new Date(dataAirline.date_departure)
                let minutesDifference = timeDifference / (1000 * 60)
                let cabinAirline = ""

                if(dataAirline.is_cabin === 1){
                    cabinAirline = `<p>Kabin Tersedia</p>`
                }else{
                    cabinAirline =  `<p>Kabin Tidak Tersedia</p>`
                }

                let imgAirline = ""

                if(dataAirline.id_maskapai === 1){
                    imgAirline = `<img src="../assets/img/airline_logo/garudaindonesia_logo.png" alt="${dataAirline.nama_maskapai}" width="100px">`
                }else if(dataAirline.id_maskapai === 2){
                    imgAirline = `<img src="../assets/img/airline_logo/lionair_logo.png" alt="${dataAirline.nama_maskapai}">`
                }else if(dataAirline.id_maskapai === 3){
                    imgAirline = `<img src="../assets/img/airline_logo/airasiaindonesia_logo.png" alt="${dataAirline.nama_maskapai}">`
                }else if(dataAirline.id_maskapai === 4){
                    imgAirline = `<img src="../assets/img/airline_logo/citilink_logo.png" alt="${dataAirline.nama_maskapai}">`
                }else if(dataAirline.id_maskapai === 5){
                    imgAirline = `<img src="../assets/img/airline_logo/batikair_logo.png" alt="${dataAirline.nama_maskapai}">`
                }
                return(`
                    <div class="my-10 bg-red-500 w-2/4 tracking-wider">
                        <div class="flex flex-col">
                            <div class="flex flex-row">
                                <div class="basis-1/4">
                                ${imgAirline}
                                </div>
                                <div class="basis-2/4 bg-blue-500 flex flex-row font-semibold">
                                    <div class="flex flex-col justify-center items-center basis-1/4 text-sm">
                                        <p>${dataTimeDeparture}</p>
                                        <p>${dataAirline.city_from}</p>
                                    </div>
                                    <div class="basis-2/4 flex flex-col items-center justify-center text-xs">
                                        <p>${minutesDifference} Menit</p>
                                        <img src="../assets/img/airline_linelogo.png" alt="Airline Line" class="w-full">
                                    </div>
                                    <div class="flex flex-col justify-center items-center basis-1/4 text-sm text-sp">
                                        <p>${dataTimeArrival}</p>
                                        <p>${dataAirline.city_to}</p>
                                    </div>
                                </div>
                                <div class="basis-1/4 flex flex-col justify-center items-center">
                                    <p>${dataAirline.price}</p>
                                    <button class="">Pilih Penerbangan</button>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                        <p>${dataDate}</p>
                        <p>${dataTimeDeparture}</p>
                        <p>${dataTimeArrival}</p>
                        <p>${dataAirline.nama_maskapai}</p>
                        <p>${dataAirline.city_from}</p>
                        <p>${dataAirline.city_to}</p>
                        <p>${dataAirline.price}</p>
                        <p>${dataAirline.baggage}</p>
                        ${cabinAirline}
                        <button>Pilih Penerbangan</button>
                    </div>
                `
                )
            }).join('')
        })
        .catch(err => {
            console.error(err); 
        })
    }else{
        console.log("Maskapai Tidak Tersedia")
    }
}

flightAirline()
window.onload = loadHeader;

