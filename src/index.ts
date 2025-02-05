// const express = require('express')
const dotenv = require('dotenv');
import express from 'express'
const shopRoute = require('./routes/shops')
const clientRoute = require('./routes/clients')
const productRoute = require('./routes/products')
// import { createStartPackShop } from './fs/fs';

const start = async () => {
    const app = express();
    app.use(express.json());

    app.use('/shop', shopRoute)
    app.use('/client', clientRoute)
    app.use('/product', productRoute)

    // app.get('/test', async (req : any, res : any) => {  
    //     try{
    //         createStartPackShop()
    //         return res.status(200).json({ok : Date.now()})
    //     } catch (e){
    //     }
    // })
 
    const port = +process.env.PORT || 3000;
    const host = process.env.HOST || '127.0.0.1';

    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}`) 
    })

}

start()
