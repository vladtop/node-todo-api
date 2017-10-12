const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
        return;
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         console.log('Unable to insert todo', err);
    //         return;
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // });

    db.collection('Users').insertOne({
        name: 'Vladislav Dimitrov',
        age: 32,
        location: 'Plovdiv, Bulgaria'
    }, (err, result) => {
        if (err) {
            console.log('Unable to insert todo', err);
            return;
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    db.close()
});
