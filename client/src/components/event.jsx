import Card from 'react-bootstrap/Card';

const EventCard = (props) => {

    // const handleDelete = () => {
    //     // TODO = Make this work
    // }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Date: {!props.time ? "TBD" : null}</Card.Subtitle>
                <Card.Text>
                    Location: {props.location}
                </Card.Text>
                <button>Delete</button>
            </Card.Body>
        </Card>
    )
}

export default EventCard;