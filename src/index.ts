const dotenv = require('dotenv')
import express from 'express'
const shopRoute = require('./routes/shops')
const clientRoute = require('./routes/clients')
const productRoute = require('./routes/products')

const start = async () => {
    const app = express();
    app.use(express.json());

    app.use('/shop', shopRoute)
    app.use('/client', clientRoute)
    app.use('/product', productRoute)

    const port = +process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';

    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`) 
    })

}

start()
