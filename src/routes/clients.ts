// POST /create  
// POST /update  
// delete /delete  

const {Router} = require("express")
const router = Router()
import controlerShop from '../control/shop'
import {readFileClient} from '../fs/fs'
import { responseError } from '../errors/error';
import { middlewarAccessToShop } from '../middlewar/middlewar';


router.post('/createClient', middlewarAccessToShop, async (req, res) => {
    try{
        // client = {
        //     name: "Arnol",
        //     email: "user@dasda.com",
        //     password: "1234"
        // }
        // shopEmail
        // shopId

        
        const { name, email, password } = req.body;
        const { shopid, shopemail } = req.headers;
        // console.log(shopid, shopemail)
        const response = await controlerShop.createClient(req.body, shopemail)
        // console.log(response)

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