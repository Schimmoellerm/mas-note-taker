const express = require('express');
const fs = require('fs');
const DB = require('./db/db.json')
const app = express();
const path = require('path');

//sets port to whatever heroku assigns or local port 3000
const PORT = process.env.PORT || 3000;
//const { v4: uuidv4 } = require('uuid')

//index for generating id numbers
let index = 1;

//use middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


//get requests for different pages in application
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));


//get request for notes
app.get('/api/notes', (req, res) => res.json(DB));

//post request for new notes
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    
    //attach ids to posts
    newNote.id = index;
    index++;

    //attempt at unique ids
    // for (let i = 0; i < DB.length; i++) {
    //     console.log(newNote.id)
    //     index = newNote.id[i] + 1;
    // }

    //pushes new notes to the db.json file
    DB.push(newNote);
    console.log(DB)

    fs.writeFile('./db/db.json', JSON.stringify(DB), function(err){
        if (err) throw err;        
        
        console.log('Wrote to File')
    });
    res.json(newNote)
    
});

//listens for open port to start application
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));