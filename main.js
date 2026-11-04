let currentLang = "arBtn";
let languageBtn = document.getElementById("langBtn");
let serBtn = document.getElementById("searchBtn");
let cityInput = document.getElementById("cityInput");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temperature");
let cond = document.getElementById("condition");
let weatherCard = document.getElementById("weatherCard");
let message = document.getElementById("message");
let langMenu = document.getElementById("langMenu");
let enBtn = document.getElementById("enBtn");
let arBtn = document.getElementById("arBtn");
let title = document.getElementById("title");
let date = document.getElementById("date");
let apiKey ="6c5d703581c838f8b6a90187321c2528";
let texts = {
    enBtn: {title:"Weather", placeholder:"Enter City name",search:"search", message:"Search for a city to see its weather" },
    arBtn: {title:"الطقس", placeholder:"اكتب اسم المدينة",search:"بحث", message:"ابحث عن مدينة لمعرفة حالة الطقس"}
};
function setLanguage(lang){
    currentLang = lang
    title.textContent = texts[lang].title;
    cityInput.placeholder = texts[lang].placeholder;
    serBtn.textContent = texts[lang].search;
    message.textContent = texts[lang].message;
};
languageBtn.addEventListener("click", function () {
    langMenu.classList.toggle("hidden");
})
arBtn.addEventListener("click" , function(){
  setLanguage("arBtn");  
   langMenu.classList.add("hidden");
})
enBtn.addEventListener("click", function () {
   langMenu.classList.add("hidden");  
   setLanguage("enBtn");
});
async function getWeather(city,lang ) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&`;
    let response = await fetch(url);
    if (!response.ok){
     alert("يرجي ادخال اسم المدينة بشكل صحيح");
        return;
    }
    let data = await  response.json();
    let today = new Date();
    let currentLocale = (currentLang === "arBtn") ? "ar-EG" : "en-US";
    date.textContent = today.toLocaleDateString(currentLocale,{dateStyle:"full"});
    cityName.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)}C`
    cond.textContent = data.weather[0].description;
    weatherCard.classList.remove("hidden");
}

serBtn.addEventListener("click", function(){
    let city = cityInput.value;
    getWeather(city);
});


