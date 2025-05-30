require('dotenv').config()
import express from 'express'
const shopRoute = require('./routes/shops')
const clientRoute = require('./routes/clients')
const productRoute = require('./routes/products')
const historyRoute = require('./routes/histories')
const adminRoute = require('./routes/admins')


const start = async () => {
    const port = +process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';

    
    
    const app = express();
    app.use(express.json());

    app.use('/shop', shopRoute)
    app.use('/client', clientRoute)
    app.use('/product', productRoute)
    app.use('/history', historyRoute)
    app.use('/admin', adminRoute)


    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`) 
    })

}

start()
