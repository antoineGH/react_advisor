export default async function fetchPlace(
  interestName,
  interestLat,
  interestLng,
  radius
) {
  const interestEncoded = encodeURIComponent(interestName.trim());
  const key = process.env.REACT_APP_MAP_API_KEY;
  const urlToFetch =
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
    interestEncoded +
    "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:" +
    radius +
    "@" +
    interestLat +
    "," +
    interestLng +
    "&key=" +
    key;
  const response = await fetch(urlToFetch);
  const responseJson = await response.json();

  return new Promise((resolve, reject) => {
    if (responseJson && response.status === 200) {
      resolve(responseJson);
    } else {
      reject();
    }
  });
}
