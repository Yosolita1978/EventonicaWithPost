//This is the minimal express server. 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./db/db-connection.js'); 

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
    res.json("Hello Techtonica 2023 H2 to your Server for Eventonica");
  });


app.get('/api/events', async (req, res) =>{

    //real connection with the DB eventonica
    try{
        const { rows: events } = await db.query('SELECT * FROM events');
        console.log("In the server", events)
        res.send(events);

    } catch(error){
        console.log(error);
        return res.status(400).json({error});

    }

})

app.post('/api/events', async (req, res) =>{
    /*
    INSERT INTO events (title, location, eventtime) VALUES ('Women in Tech Techtonica Panel', 'Overland Park Convention Center', '2023-04-21');
    */

    try {
        // const userData = req.body;
        // console.log("In the server", userData);
        const { title, location, eventtime } = req.body;
        // syntax = await db.query("", [])
        const result = await db.query(
        "INSERT INTO events (title, location, eventtime) VALUES ($1, $2, $3) RETURNING *",
            [title, location, eventtime]
        );
        let dbResponse = result.rows[0];
        console.log(dbResponse)
        res.json(dbResponse);
    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
})

//DELETE FROM events WHERE id=5;
app.delete('/api/events/:id', async (req, res) =>{
    //TODO - make this delete request work
    try{
    const eventId = req.params.id;
    const deleteOperation = await db.query("DELETE FROM events WHERE id=$1", [eventId]);
    console.log(deleteOperation);
    res.status(200).end()

    } catch(error){
        console.log(error);
        res.status(400).json({error});
    }
})

//UPDATING something in the DB
// app.put('/api/events/:id', async (req, res) =>{

// })


app.listen(PORT, () => console.log(`Hola! Server running on Port http://localhost:${PORT}`));