const express = require('express')
const request = require('request-parser')
require('dotenv').config()
const app = express()


const PORT = process.env.PORT || 7200

const baseUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API')
})



//Get Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${baseUrl(process.env.SCRAPERAPI_API_KEY)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(response)
    } catch (error) {
        console.error(error)
    }
})


//Get Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${baseUrl(process.env.SCRAPERAPI_API_KEY)}&url=https://www.amazon.com/product-previews/${productId}`)
        res.json(response)
    } catch (error) {
        console.error(error)
    }
})


//Get Product Offers
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const response = await request(`${baseUrl(process.env.SCRAPERAPI_API_KEY)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(response)
    } catch (error) {
        console.error(error)
    }
})


//Get Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params
    try {
        const response = await request(`${baseUrl(process.env.SCRAPERAPI_API_KEY)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(response)
    } catch (error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}....`))