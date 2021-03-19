const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callBack) => {

    MongoClient.connect('mongodb+srv://node_complete_full:WDNiGegCADkLaKZv@node-complete-cluster.spnkn.mongodb.net/shop?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected !!')
            _db = client.db();
        })
        .catch(err => {
            console.log(err)
            throw err;
        });

};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found'
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;