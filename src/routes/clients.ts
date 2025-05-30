// POST /create  
// POST /update  
// delete /delete  

const {Router} = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error';
import { middlewarAccessToShop, middlewarAdminAccess } from '../middlewar/middlewar';

// client = {
//     name: "Arnol",
//     email: "user@dasda.com",
//     password: "1234"
// }

router.post('/createClient', middlewarAccessToShop, middlewarAdminAccess, async (req, res) => {
    try{     
        const { name, email, password } = req.body;
        const { shopid, shopemail } = req.headers;
        const response = await controlerShop.createClient(req.body, shopemail)

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


router.post('/editClient', middlewarAccessToShop, async (req, res) => {
    try {
        const { shopemail } = req.headers

        const response = await controlerShop.editClient(req.body, shopemail)
        if (response.status) {
            const { status, text } = responseError(response.text || response.status)
            return res.status(status).json({ text, ok: false })
        }
        return res.status(200).json(response)

    } catch (e) {
        console.log(e)
        return res.status(500).json({ text: 'server error', ok: false })
    }
})


router.delete('/deleteClient', middlewarAccessToShop, async (req, res) => { 
    try {
        const { emailclient, shopemail } = req.headers
        const response = await controlerShop.deleteClient(emailclient, shopemail)
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