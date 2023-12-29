const express = require('express')
const cors = require('cors')
// const fs = require('fs')
const { connectToDb, getDb } = require('./db')

//init app & middleware
const app = express()

app.use(cors())

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

// connectToDb((err) => {
//     if(!err){
//         app.listen(443, () =>{
//             console.log('app listening on port 443')
//         })
//         db = getDb()
//     }
// })

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://ofp-admin-panel.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

// routes
app.get('/.well-known/pki-validation/23BD35087EFF77D116FFF1B3494CC1C5.txt', (req, res) => {
    res.sendFile('/23BD35087EFF77D116FFF1B3494CC1C5.txt')
})

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