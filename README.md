# WeatherDashboard


## Weather-Dashboard
This application is a weather dashboard that allows user to view the city's current  and future forecast.

### Purpose
The purpose of this application was to build application using API, do a GET from API and display the results on an HTML page. Demonstrate my ability to use javascript, html and bootstrap/css to make the application experience interactive, mobile responsive and user friendly.

### Functionality
The main functionality behind this application lies within the getWeatherData,getForecast and getUVIndex functions. The getWeatherData function takes in the city as the input which is used as a parameter to call the OpenWeather API. The getForecast function takes in the city to get more info on the weather as in future weather forecast. Both getWeatherData and getForecast functions results are used to build out the HTML page to display the current weather portal and forecast displayed by the 5 cards. The function accesses the API and for every data point with 12:00:00 as the time stamp it then appends the weather data from that object. The data is appended and when the user searches again, the data that is currently on the page is emptied and the new city's data is then appended. The page also retains the most recently searched city data in local storage, so the weather data for previous cities is only a click away.

## Application Image
![WeatherDashboardApp](https://user-images.githubusercontent.com/63619744/97121800-5f81b000-16f7-11eb-8b47-58e803dd9878.PNG)

### Technologies Used
HTML,
CSS,
JavaScript,
Openweather API

#### Links
View the application : https://purilisa.github.io/WeatherDashboard/
My github link: https://github.com/purilisa/

