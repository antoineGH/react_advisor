// Function remove value from localStorage at a specific key
export default function removeValueLocalStorage(key) {
	if (key in localStorage) {
		localStorage.removeItem(key)
	} else {
	}
}
