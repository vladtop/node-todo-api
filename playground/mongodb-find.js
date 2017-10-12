const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
        return;
    }
    console.log('Connected to MongoDB server');

    db.collection('Todos').find({
        _id: new ObjectID('59de3f529ccd7e29ceb2e57e')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch items', err);
    });

    db.close()
});
