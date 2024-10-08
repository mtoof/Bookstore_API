const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db.js')
// init app & middleware
const app = express()
app.use(express.json())
let db

// db connection
connectToDb((err)=> {
    if (!err) {
        app.listen(3000, () => {
            console.log('app listen on port 3000')
        })
        db = getDb()
    }
})

// routes

app.get('/books', (req, res) => {
    let books = []
    db.collection('books')
        .find()  //return cursor toArray forEach
        .sort({author: 1})
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch the documents'})
        });
});
app.get('/books/:id', (req, res) => {
    const bookId = req.params.id;
    
    if (ObjectId.isValid(bookId)){
        db.collection('books')
            .findOne({_id: new ObjectId(bookId)})
            .then(doc => {
                if (!doc)
                    res.status(404).json({error : 'Document not found'});
                else{
                    res.status(200).json(doc);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not fetch the document' });
            })
    }
    else {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

app.post('/books/', (req, res) => {
    const data = req.body;
    db.collection('books')
        .insertOne(data)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not create a new document' });
        })
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    
    if (ObjectId.isValid(bookId)){
        db.collection('books')
            .findOne({_id: new ObjectId(bookId)})
            .then(data => {
                if (!data)
                    res.status(404).json({error : 'Document not found'});
                else{
                db.collection('books')
                .deleteOne({_id: new ObjectId(bookId)})
                .then(result => {
                    res.status(200).json(result);
                })}
            })
    }
    else {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});

app.patch('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const updateData = req.body
    
    if (ObjectId.isValid(bookId)){
        db.collection('books')
            .updateOne({_id: new ObjectId(bookId)}, {$set: updateData})
            .then(result => {
                if (!result)
                    res.status(404).json({error : 'Document not found'});
                else{
                res.status(202).json(doc);
                }
            })
            .catch(err => {
                res.status(500).json({ error: 'Could not update the document' });
            })
    }
    else {
        res.status(400).json({ error: 'Invalid ID format' });
    }
});