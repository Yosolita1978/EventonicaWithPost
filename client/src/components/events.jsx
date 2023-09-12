import { useState, useEffect } from "react";
import EventCard from "./event";
import FormEvent from './form';
import CardGroup from 'react-bootstrap/CardGroup';


function Events() {
    const [events, setEvents] = useState([]);

    const getRequest = () => {
      fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then(events => {
        setEvents(events); 
        console.log('Events fetched...', events);
        });
    }

    const handlePostRequest = (data) => {
      //console.log("Inside the App", data);
    fetch("http://localhost:8080/api/events", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log("Inside the post line 28", data)
      setEvents([...events, data])
    })
}
  
  useEffect(() => {getRequest()}, []);

  return (
    <>
    <div>
    <CardGroup className="Events">
            {events.map(event =>
            <EventCard key={event.id} title={event.title} location={event.location} time={event.eventtime}/>
            )}
    </CardGroup>
    </div>
    <div>
        <FormEvent  submit={handlePostRequest}/>
    </div>
    </>
  );
}

export default Events;