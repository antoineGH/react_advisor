// Function return distinct value of inputArray
export default function uniqueRecentSearch(inputArray) {
    
    let flags = [], uniqueRecentSearch = [];
    for( let i = 0; i < inputArray.length; i++) {
        if( flags[inputArray[i].city]) continue;
        flags[inputArray[i].city] = true;
        const obj = {city: inputArray[i].city, lat: inputArray[i].lat, lng: inputArray[i].lng}
        uniqueRecentSearch.push(obj);
    }
    while (uniqueRecentSearch.length > 10) {
        uniqueRecentSearch.shift()
    }
    return uniqueRecentSearch
}