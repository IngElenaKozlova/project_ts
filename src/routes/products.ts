// POST /create  
// POST /update  
// delete /delete  

const {Router} = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error'
import { middlewarAccessToShop } from '../middlewar/middlewar'

router.post('/createProduct', middlewarAccessToShop, async (req, res) => {
    try{
        // product = {
        //         _id: 1,
        //         name: "Laptop",
        //         price: 1200,
        //         category: "Electronics",
        //         stock: 15,
        //         description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
        //         isAvailable: true,
        //         type: 'LAPTOP'
        //}

       
        const { name, price, category, stock, description, isAvailable, type } = req.body;
        const { shopid, shopemail } = req.headers;
        // console.log(shopid, shopemail)
        const response = await controlerShop.createProduct(req.body, shopemail)
        // console.log(response)

        if (response.status) {
            const {status, text} = responseError(response.text || response.status)
            return res.status(status).json({text, ok : false})
        };

        return res.status(200).json(response)

    } catch (e){
        console.log(e)
        return res.status(500).json({ text: 'server error', ok : false })
    }

})


module.exports = router