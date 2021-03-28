export default async function fetchImage(photoReference, maxWidth) {
	const key = process.env.REACT_APP_MAP_API_KEY
	const urlToFetch = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + maxWidth + '&photoreference=' + photoReference + '&key=' + key
	const response = await fetch(urlToFetch)

	return new Promise((resolve, reject) => {
		if (response && response.status === 200) {
			resolve(response)
		} else {
			reject()
		}
	})
}
