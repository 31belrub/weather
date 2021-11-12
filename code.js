let input = document.getElementsByTagName("input")[0];

input.addEventListener("keyup", (e)=>{
    if (e.key == "Enter") {
        getWeather(input.value);
        input.value = null;
    }
})

async function getWeather(location) {
    const url =`https://api.worldweatheronline.com/premium/v1/weather.ashx?key=bf9d673488df4611ad6162034212710&q=${location}&num_of_days=5&format=json`;
    const res = await fetch(url);
    const data = await res.json(); 
    render(data.data);
}

function render(data) {
    document.querySelector("body > div > div.weatherContainer > div.place").innerHTML = data.request[0].query.split(",")[0];
    document.querySelector("body > div > div.weatherContainer > div.temp").innerHTML = `${data.current_condition[0].temp_C} <span class="cels">°C</span>`;
    document.querySelector("body > div > div.weatherContainer > div.statsGrid > div:nth-child(1) > p:nth-child(2)").innerHTML = `${data.weather[0].maxtempC} C`;
    document.querySelector("body > div > div.weatherContainer > div.statsGrid > div:nth-child(2) > p:nth-child(2)").innerHTML = `${data.weather[0].mintempC} C`;
    document.querySelector("body > div > div.weatherContainer > img").src = `./pic/${data.current_condition[0].weatherCode}.png`
    setDate();
}

function setDate() {
    let date = new Date();
    document.querySelector("body > div > div.weatherContainer > div.date").innerHTML = date.toLocaleDateString("en-GB", {weekday:"short", day:"numeric", month:"numeric", year:"2-digit"});
}

getWeather("Minsk");