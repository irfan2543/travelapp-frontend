const apiKeyWeather = '79bd65514dea072ce5a3b6d95da22e79';
let weatherData = []
let weatherDiv = document.getElementById('weatherData')
let mostPlaceIndonesia = document.getElementById('mostPlace')
let flightRouteBtn = document.getElementById('flightRoute-btn')

const fetchCities = () =>{

    axios.get('http://localhost:3002/city')
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
        console.error("Footer Tidak Terload !", error)
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
        console.error(error)
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
        console.error(error)
    }
}

// const userFeature = () =>{

//     let checkUser = localStorage.getItem()
    
//     try{
//         if()
//     }catch(error){
//         console.error("message ===> ", error)
//     }

// }

const dataCities = (data) =>{

    let routeDeparture = document.getElementById('routeDeparture')
    let routeArrival = document.getElementById('routeArrival')

    console.log(data)

    try{
        
    routeDeparture.innerHTML = data.map((response) =>`
        <option value="${response.id}">${response.alias_kota} - ${response.kota}</option>
        `
    )

    routeArrival.innerHTML = data.map((response) =>` 
        <option value="${response.id}">${response.alias_kota} - ${response.kota}</option>
        `
    )
    }catch(error) {
        console.error("Message => ", error)
    }

}

let signInBtn = document.getElementById('signIn-btn').addEventListener('click', () =>{
    window.location.href = './pages/login.html'
})

let signUpBtn = document.getElementById('signUp-btn').addEventListener('click', () =>{
    window.location.href = './pages/register.html'
})

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

fetchCities()
datePicker()
placeVisit()
weatherDataMap()
window.onload = loadFooter;