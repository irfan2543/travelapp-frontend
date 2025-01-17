const apiKeyWeather = '79bd65514dea072ce5a3b6d95da22e79';
let weatherData = [];
let weatherDiv = document.getElementById('weatherData');
let mostPlaceIndonesia = document.getElementById('mostPlace');
let routeDeparture = document.getElementById('routeDeparture')
let routeArrival = document.getElementById('routeArrival')
let dateDeparture = document.getElementById('date-picker')
let dataArray = []
let checkUser = localStorage.getItem("UserLogin")

const fetchCities = () =>{

    axios.get('http://localhost:3002/cities')
    .then((response) =>
        dataCities(response.data)
    )
}

const loadFooter = async () => {

    const footerPage = document.getElementById('footerPage')
    try{
        let footerResponse = await fetch('./components/footer.html')
        let footerHTML = await footerResponse.text()
        footerPage.innerHTML = footerHTML
    }catch(error){
        console.error("Message ===> ", error)
    }
}

const weatherDataMap = async () =>{

    try{
        const indonesiaCities = [

            {name: "Jakarta", id: 1},
            {name: "Palembang", id: 2},
            {name: "Surabaya", id: 3},
            {name: "Bandung", id: 4},
            {name: "Yogyakarta", id: 5},
            {name: "Bali", id: 6}
        ]


        for (let cities of indonesiaCities){
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cities.name}&appid=79bd65514dea072ce5a3b6d95da22e79&units=metric`)
            const data = await response.json()
            weatherData.push(data)
        }

        for (let i = 0; i < weatherData.length; i++){
            let imageWeather = ""
            if(parseInt(weatherData[i].main.temp)  >= 32){
                imageWeather = `<img src="./assets/img/icon/weather-icon-03.png" alt="Panas" width="100px">`
            }else if(parseInt(weatherData[i].main.temp) >= 26 && parseInt(weatherData[i].main.temp) <= 32){
                imageWeather = `<img src="./assets/img/icon/weather-icon-02.png" alt="Sedang" width="100px">`
            }else if (parseInt(weatherData[i].main.temp) <= 25){
                imageWeather = `<img src="./assets/img/icon/weather-icon-01.png" alt="Sedang" width="100px">`
            }

            let divNewWeather = document.createElement('div')
            divNewWeather.classList.add('swiper-slide')
            divNewWeather.innerHTML = 
            `
                <div class="flex flex-col flex-wrap bg-white bg-opacity-30 text-white w-[15rem] h-[20rem] space-y-8 mt-20 ml-80 hover:scale-125 transition hover:delay-300">
                    <div class="text-center text-2xl font-bold">
                        <p>${weatherData[i].name}</p>
                    </div>
                    <div class="flex justify-center">
                        ${imageWeather}
                    </div>
                    <div class="text-center font-semibold">
                        <p>${weatherData[i].main.temp}°C</p>
                    </div>
                    <div class="flex flex-row font-semibold">
                        <div class="flex-1 text-center">
                            <p>Max</p>
                            <p>${weatherData[i].main.temp_max}°C</p>
                        </div>
                        <div class="flex-1 text-center">
                            <p>Min</p>
                            <p>${weatherData[i].main.temp_min}°C</p>
                        </div>
                    </div>
                </div>
            
            `
            weatherDiv.appendChild(divNewWeather)

            setTimeout(() => {
                let swiper =  new Swiper(".slide-container-weather", {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    loop: true,
                    centeredSlides: true,
                    grabCursor: "true",
                    navigation: {
                    nextEl: ".swiper-button-next",
                    },
                });
            }, 500);
        }
    }catch(error){
        console.error("Message ===> ", error)
    }
}

const placeVisit = () =>{

    try{
        let mostPlace = [
            {name: "Pura Besakih", city: "Bali", img: "https://images.tokopedia.net/img/JFrBQq/2022/6/20/377b1745-2b01-42bb-a954-9604550daaa5.jpg"},
            {name: "Kepulauan Derawan", city: "Kalimantan Timur", img: "https://images.tokopedia.net/img/JFrBQq/2022/6/20/11879c35-5510-42b9-8bbf-b6f8943852aa.jpg"},
            {name: "Taman Nasional Way Kambas", city: "Lampung", img: "https://images.tokopedia.net/img/JFrBQq/2022/6/20/7119654e-2bc3-48cb-a74e-5a7355863467.jpg"},
            {name: "Danau Toba", city: "Sumatera Utara", img: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2018/11/danau-toba.jpg"},
            {name: "Nasi Dua", city: "Bali", img: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2020/06/Nusa-Dua-Bali.jpg"},
            {name: "Taman Laut Bunaken", city: "Sulawesi Utara", img: "https://images.tokopedia.net/img/JFrBQq/2022/10/13/e7147316-30dd-41ba-9abb-645d82e171af.jpg"},
            {name: "Kepulauan Raja Ampat", city: "Papua Barat", img: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2018/11/raja-ampat.jpg"},
            {name: "Pulau Komodo", city: "Nusa Tenggara Timur", img: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2018/11/pulau-komodo.jpg"},
            {name: "Kawah Ijen", city: "Jawa Timur", img: "https://images.tokopedia.net/blog-tokopedia-com/uploads/2018/11/kawah-ijen.jpg"},
        ]

        mostPlace.forEach((response) => {
            let mostPlaceDiv = document.createElement('div')
            mostPlaceDiv.classList.add('swiper-slide')
            mostPlaceDiv.innerHTML = 
                `
                <div class="flex flex-col w-[15rem] space-y-5 border rounded-lg pb-5 ml-6 mt-10 bg-[#f4f4f4]">
                    <div>
                        <img src="${response.img}" alt="${response.name}" class="hover:scale-125">
                    </div>
                    <div class="space-y-3 ml-3 ">
                        <p class="font-bold text-lg">${response.city}</p>
                        <p class="text-sm font-semibold text-[#4e6cf1]">${response.name}</p>
                    </div>
                </div>
                `
            mostPlaceIndonesia.appendChild(mostPlaceDiv)

            setTimeout(() => {
                let myswiper =  new Swiper(".slide-container-place", {
                    loop: true,
                    disableOnInteraction: true,
                    autoplay: {
                        delay: 3000,
                        
                    },
                    grabCursor: "true",
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                });
            }, 1000);
        })
    }catch(error) {
        console.error("Message ===> ", error)
    }
}

const userFeature = () =>{


    try{
        let userDiv = document.createElement('div')
        let userAuth = document.getElementById('userAuth')


        let getUser = localStorage.getItem("UserLogin")
        let jsonUser = JSON.parse(getUser)

        if(checkUser == null){
            userDiv.innerHTML = 
            `
            <div class="flex-1 flex flex-col items-center justify-center space-y-10">
                <div class="bg-gray-300 w-6/12 h-1/5 bg-opacity-50 tracking-widest text-white spa font-bold hover:bg-yellow-200 hover:bg-opacity-50 transition delay-100 hover:scale-125"><button class="w-full h-8" onclick="signUpBtn()">MENDAFTAR</button></div>
                <div class="bg-gray-300 w-6/12 h-1/5 bg-opacity-50 tracking-widest text-white spa font-bold hover:bg-yellow-200 hover:bg-opacity-50 transition delay-100 hover:scale-125"><button class="w-full h-8" onclick="signInBtn()">MASUK</button></div>
            </div>
            `
           
            userAuth.appendChild(userDiv)
        }else{
            userDiv.innerHTML = 
            `
            <div class="flex-1 flex flex-col items-center justify-center space-y-10">
                <div  class="text-xl text-white font-semibold"><p>${jsonUser.fullname}</p></div>
                <div class="bg-gray-300 w-6/12 h-1/5 bg-opacity-50 tracking-widest text-white spa font-bold hover:bg-yellow-200 hover:bg-opacity-50 transition delay-100 hover:scale-125"><button class="w-full h-8" onclick="historyPurchaseBtn()">RIWAYAT PEMBELIAN</button></div>
                <div class="bg-gray-300 w-6/12 h-1/5 bg-opacity-50 tracking-widest text-white spa font-bold hover:bg-yellow-200 hover:bg-opacity-50 transition delay-100 hover:scale-125"><button class="w-full h-8" onclick="logoutBtn()">KELUAR</button></div>
            </div>
            `
            userAuth.appendChild(userDiv)
        }
    }catch(error){
        console.error("Message ===> ", error)
    }

}

const dataCities = (data) =>{

    try{
        
    routeDeparture.innerHTML = data.map((response) =>`
        <option value="${response.id}">${response.alias_city} - ${response.airport_city}</option>
        `
    )

    routeArrival.innerHTML = data.map((response) =>` 
        <option value="${response.id}">${response.alias_city} - ${response.airport_city}</option>
        `
    )

    }catch(error) {
        console.error("Message ===> ", error)
    }

}

const signInBtn = () => {
 
    try {
        window.location.href = './pages/login.html'
        
    }catch(error) {
        console.error("Message", error)
    }
}

const signUpBtn = () => {
    try {
       window.location.href = './pages/register.html'
    }catch(error) {
        console.error("Message ===> ", error)
    }

}

const logoutBtn = () => {
    
    try{
        localStorage.removeItem("UserLogin")
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }catch(error){
        console.error("Message ===> ", error)
    }

    
}


const datePicker = () =>{

    const datepicker = flatpickr("#date-picker", {});
 
    // styling the date picker
    const calendarContainer = datepicker.calendarContainer;
    const calendarMonthNav = datepicker.monthNav;
    const calendarNextMonthNav = datepicker.nextMonthNav;
    const calendarPrevMonthNav = datepicker.prevMonthNav;
    const calendarDaysContainer = datepicker.daysContainer;
   
    calendarContainer.className = `${calendarContainer.className} bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal`;
   
    calendarMonthNav.className = `${calendarMonthNav.className} flex items-center justify-between mb-4 [&>div.flatpickr-month]:-translate-y-3`;
   
    calendarNextMonthNav.className = `${calendarNextMonthNav.className} absolute !top-2.5 !right-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
   
    calendarPrevMonthNav.className = `${calendarPrevMonthNav.className} absolute !top-2.5 !left-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
   
    calendarDaysContainer.className = `${calendarDaysContainer.className} [&_span.flatpickr-day]:!rounded-md [&_span.flatpickr-day.selected]:!bg-gray-900 [&_span.flatpickr-day.selected]:!border-gray-900`;
}

const historyPurchaseBtn = () => {
    try{
        window.location.href = './pages/history.html'
    }catch(error){
        console.error("Message ===> ", error)
    }
}

document.getElementById('flightRoute-btn').addEventListener('click', async (e) => {
    e.preventDefault()
    try{


        if(parseInt(routeDeparture.value) === parseInt(routeArrival.value)){
            Swal.fire({
                title : 'error',
                text: 'Tidak Bisa Memilih Kota Yang Sama',
                icon : 'error'
            })
        }
        else{
            dataAirline = {
    
                "date_departure" : dateDeparture.value,
                "city_departure" : parseInt(routeDeparture.value),
                "city_arrival" : parseInt(routeArrival.value)
            }
            const today = new Date();
            const formattedToday = today.toISOString().split('T')[0];
            if(!dateDeparture.value ){
                Swal.fire({
                    title : 'error',
                    text: 'Masukkan Tanggal Terlebih Dahulu',
                    icon : 'error'
                })
            }else if(dateDeparture.value < formattedToday){
                Swal.fire({
                    title : 'error',
                    text: 'Tanggal Telah Lewat',
                    icon : 'error'
                })
            }
            else{
                checkAirline = await axios.post('http://localhost:3002/schedule', dataAirline)
                if(checkAirline.status === 201){
    
                    let queryData = encodeURIComponent(JSON.stringify(dataAirline))
                    setTimeout(() => {
                        window.location.href = `./pages/booking-airline.html?data=${queryData}`;
                    }, 2000);
    
                    
                }else{
                    console.log("Maskapai Tidak Tersedia")
                }
            }
        }
    }catch(error){
        console.error("Message ===> ", error)
    }
})


fetchCities()
userFeature()
datePicker()
placeVisit()
weatherDataMap()
window.onload = loadFooter;

//Initizialitation AOS Animation
AOS.init()