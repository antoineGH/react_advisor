const clientId = process.env.REACT_APP_FOURSQUARE_API_CLIENT_ID
const clientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET
const url = 'https://api.foursquare.com/v2/venues/explore?ll='

// Language for API Response
const language = 'en'

export default async function fetchInterestCategory(gps, categoryId, limit) {
	const latLng = `${gps.lat},${gps.lng}`
	const urlToFetch = `${url}${latLng}&categoryId=${categoryId}&limit=${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=20200921`
	const response = await fetch(urlToFetch, {
		headers: {
			'Accept-Language': language,
		},
	})
	const responseJson = await response.json()

	return new Promise((resolve, reject) => {
		if (responseJson) {
			const venues = responseJson.response.groups[0].items.map((item) => item.venue)
			resolve(venues)
		} else {
			reject()
		}
	})
}
