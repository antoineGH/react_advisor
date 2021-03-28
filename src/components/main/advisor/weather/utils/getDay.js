export default function getDay(day) {
    const d = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
    if ((d.getDay() + day) === 7) return "Sunday"
    if ((d.getDay() + day) === 8) return "Monday"
    if ((d.getDay() + day) === 9) return "Thursday"
    if ((d.getDay() + day) === 10) return "Friday"
    if ((d.getDay() + day) === 11) return "Saturday"
    if ((d.getDay() + day) === 12) return "Sunday"
    if ((d.getDay() + day) === 13) return "Monday"
    if ((d.getDay() + day) === 14) return "Tuesday"
    if ((d.getDay() + day) === 15) return "Wednesday"
    return days[d.getDay() + day]
}
