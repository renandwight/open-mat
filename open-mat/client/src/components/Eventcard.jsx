
function Eventcard({eventsData}) {
    // {id: 5, event_date: '2026-01-16T18:30:00Z', gi: true, fee: '10.00', open_class: false}
    const { id, event_date, gi, fee, open_class} = eventsData
    // console.log(eventsData)
    
    return (

        <div>
        <ul>
            <li>Event Date: {event_date}</li>
            <li>Gi: {gi===true ? "Suit Up" : "Spandex is fine"}</li>
            <li>Fee: {fee === 0.00 ? "Free" : fee}</li>
            <li>Open Class: {open_class===true ? "Yes" : "No"}</li>
        </ul>
        </div>
    );
}
export default Eventcard;