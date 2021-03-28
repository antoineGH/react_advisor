export default function getDatetime(dt) {

    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime
}
