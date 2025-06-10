const { Router } = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error'
import { middlewarAccessToShop } from '../middlewar/middlewar'

router.post('/createHistory', middlewarAccessToShop, async (req, res) => {
    try{     
        const {shopemail} = req.headers
        const response = await controlerShop.createHistory(req.body, shopemail)

        if (response.status) {
            const error = responseError(response.text || response.status)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return res.status(200).json(response)

    } catch (e){
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})


router.post('/editHistory', middlewarAccessToShop, async (req, res) => { // for admins only
    try{     
        const {shopemail, historyid} = req.headers
        const response = await controlerShop.editHistory(req.body, shopemail, historyid)

        if (response.status) {
            const error = responseError(response.text || response.status)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return res.status(200).json(response)

    } catch (e){
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})


router.delete('/deleteHistory', middlewarAccessToShop, async (req, res) => {
    try{     
        const {shopemail, clientemail} = req.headers;
        const response = await controlerShop.deleteHistory(shopemail, clientemail, req.body.historyId)

        if (response.status) {
            const error = responseError(response.text || response.status)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return res.status(200).json(response)

    } catch (e){
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }
})




module.exports = router