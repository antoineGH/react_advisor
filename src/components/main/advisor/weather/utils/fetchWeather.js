const weatherURL = 'https://api.openweathermap.org/data/2.5/forecast'
const openWeatherKey = process.env.REACT_APP_OPENWEATHER_API_KEY

export default async function fetchWeather(lat, lng) {
	const urlToFetch = `${weatherURL}?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=metric&appid=${openWeatherKey}`
	const response = await fetch(urlToFetch)
	const responseJson = await response.json()

	return new Promise((resolve, reject) => {
		if (responseJson && response.status === 200) {
			resolve(responseJson)
		} else {
			reject()
		}
	})
}
