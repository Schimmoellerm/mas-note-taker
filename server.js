const express = require('express');
const fs = require('fs');
const DB = require('./db/db.json')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
//const { v4: uuidv4 } = require('uuid')

let index = 1

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req, res) => res.json(DB));

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    
    for (let i = 0; i < DB.length; i++) {
        newNote.id = index;
        console.log()
        index++;
    }

    DB.push(newNote);
    console.log(DB)

    fs.writeFile('./db/db.json', JSON.stringify(DB), function(err){
        if (err) throw err;        
        
        console.log('Wrote to File')
    });
    res.json(newNote)
    
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));