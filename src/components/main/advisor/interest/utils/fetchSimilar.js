const clientId = process.env.REACT_APP_FOURSQUARE_API_CLIENT_ID
const clientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET
const url = 'https://api.foursquare.com/v2/venues/'

// Number of similar interests, 1 for programming purpose, 3 for production
const limit = '3'

// Language for API Response
const language = 'en'

export default async function fetchSimilar(venueID) {
	const urlToFetch = `${url}${venueID}/similar?limit=${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=20200921`
	const response = await fetch(urlToFetch, {
		headers: {
			'Accept-Language': language,
		},
	})
	const responseJson = await response.json()

	return new Promise((resolve, reject) => {
		if (responseJson && response.status === 200) {
			const venues = responseJson.response.similarVenues.items
			resolve(venues)
		} else {
			reject()
		}
	})
}
