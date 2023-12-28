const { MongoClient } = require('mongodb')

let dbConnection
let uri = 'mongodb+srv://zsoltdb:ofp1234@ofp-cluster.b7fnxnx.mongodb.net/OFP-DB?retryWrites=true&w=majority'

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri).then((client) => {
            dbConnection = client.db()
            return cb()
        }).catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}