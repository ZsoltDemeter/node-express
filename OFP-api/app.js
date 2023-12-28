const express = require('express')
const { connectToDb, getDb } = require('./db')

//init app & middleware
const app = express()

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