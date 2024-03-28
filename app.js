const express = require('express')
const cors = require('cors')
const fs = require('fs')
const https = require('https')
const { connectToDb, getDb } = require('./db')

const key = fs.readFileSync('private.key')
const cert = fs.readFileSync('certificate.crt')

//const file = fs.readFileSync('./4504A4A86BC2F2BCE64F2CD788A331F7.txt')

//init app & middleware
const app = express()

app.use(cors())

const cred = {
    key,
    cert
}

//db connection
let db

connectToDb((err) => {
    if(!err){
        app.listen(3000, () =>{
            console.log('app listening on port 3000')
        })
        db = getDb()
    }
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ofp-admin-panel.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//https test route

// app.get('/.well-known/pki-validation/4504A4A86BC2F2BCE64F2CD788A331F7.txt', (reg, res) => {
//     res.sendFile('/home/ubuntu/node-express/4504A4A86BC2F2BCE64F2CD788A331F7.txt');
// })

// routes
app.get('/reports', (req, res) => {
    let energyReports = []

    db.collection('energy_reports')
       .find()
       .forEach(data => energyReports.push(data))
       .then(() => {
        res.status(200).json(energyReports)
       })
       .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
       })
})

app.get('/production-forecast', (req, res) => {
    let productionForecast = []

    db.collection('energy_forecasting_production')
       .find()
       .forEach(data => productionForecast.push(data))
       .then(() => {
        res.status(200).json(productionForecast)
       })
       .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
       })
})

app.get('/consumption-forecast', (req, res) => {
    let consumptionForecast = []

    db.collection('energy_forecasting_consumption')
       .find()
       .forEach(data => consumptionForecast.push(data))
       .then(() => {
        res.status(200).json(consumptionForecast)
       })
       .catch(() => {
        res.status(500).json({error: 'Could not fetch the documents'})
       })
})

const httpsServer = https.createServer(cred,app)
httpsServer.listen(8443)