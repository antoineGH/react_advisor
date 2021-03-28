// Function getLocalStorage for a specific key
export default function getLocalStorage(key) {
	try {
		return JSON.parse(localStorage.getItem(key))
	} catch (error) {}
}
