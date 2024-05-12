document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var city = document.getElementById("city").value;
    fetchWeather(city);
});

function fetchWeather(city) {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},IR&appid=f1bad747285341adb2ef020ec59586a0&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            var weatherInfo = document.getElementById("weatherInfo");
            if (data.cod == 200) {
                var html = `
                    <h2>وضعیت آب و هوا در ${city}:</h2>
                    <p>توصیف: ${data.weather[0].description}</p>
                    <p>دما: ${data.main.temp} درجه سانتیگراد</p>
                    <p>رطوبت: ${data.main.humidity}%</p>
                    <p>سرعت باد: ${data.wind.speed} متر بر ثانیه</p>
                `;
                weatherInfo.innerHTML = html;
            } else {
                weatherInfo.innerHTML = "<p class='error-message'>متاسفانه اطلاعات هواشناسی برای این شهر یافت نشد.</p>";
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}