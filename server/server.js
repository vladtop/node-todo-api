const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

// Add new todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// Get all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

// Get todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    console.log(id);

    if (!ObjectId.isValid(id)) {
        console.log('Invalid ID');
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            console.log('ID not found');
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((error) => {
        console.log(error);
        res.status(404).send();
    })
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        console.log('Invalid ID');
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            console.log('ID not found');
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((error) => {
        console.log(error);
        res.status(404).send();
    })
});

// Update todo
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectId.isValid(id)) {
        console.log('Invalid ID');
        return res.status(404).send();
    }

    var body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            console.log('ID not found');
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((error) => {
        console.log(error);
        res.status(404).send();
    })
});

app.listen(port, () => {
    console.log(`Started at port ${port}`);
})