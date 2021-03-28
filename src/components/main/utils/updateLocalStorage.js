// Function update existing localStorage with value at a specific key
// Function create localstorage with value at a specific key
// Function initialize localStorage with empty array
export default function updateLocalStorage(key, value) {
	let destinationArray = []
	if (key in localStorage) {
		// Return is empty value
		if (!value) return

		// Updating existing localStorage
		try {
			destinationArray = JSON.parse(localStorage.getItem(key))
			destinationArray.push(value)
			localStorage.setItem(key, JSON.stringify(destinationArray))
		} catch (error) {}
	} else {
		if (value) {
			// Adding first value to localStorage
			try {
				destinationArray.push(value)
				localStorage.setItem(key, JSON.stringify(destinationArray))
			} catch (error) {}
		} else {
			// Initialize localStorage empty array
			localStorage.setItem(key, JSON.stringify(destinationArray))
		}
	}
}
