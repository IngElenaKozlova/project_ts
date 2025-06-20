const {Router} = require("express")
const router = Router()
import bcrypt from 'bcrypt'
import * as argon2 from "argon2"
import controlerShop from '../control/shop'
import {readFileShop} from '../fs/fs'
import { responseError } from '../errors/error'


router.post('/createShop', async (req, res) => {
    try {
        const response = await controlerShop.createShop(req.body)
        console.log(response)
        
        if (response.status) {
            const error = responseError(response.text || response.status)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})


router.post('/loginShop', async (req, res) => {
    try {
        const {email, password} = req.body
        const response = await readFileShop(email)
        if (response.ok === false) return res.status(404).json({ text: 'shop with this email doesn not exist', ok : false})

        const currentShop = response.data;

        const ispassword = await argon2.verify(password, currentShop.password)

        if (!ispassword) return res.status(409).json({ text: 'password is not correct', ok : false})

        const shopResponse = { ...currentShop }
        delete shopResponse.password

        return res.status(200).json(shopResponse)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})


router.post('/editShop', async (req, res) => {
    try {       
        const response = await controlerShop.editShop(req.body)
        if (response.status) {
            const error = responseError(response.text || response.status)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})


router.delete('/deleteShop', async (req, res) => {
    try {
        const { shopemail } = req.headers
        const response = await controlerShop.deleteShop(shopemail)
        if (!response.ok) {
            const { status, text } = responseError(404)
            return res.status(status).json({ text, ok: false })
        }
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ text: 'server error', ok: false })
    }
})



module.exports = router