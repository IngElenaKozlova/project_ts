const { Router } = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error'
import { middlewarAccessToShop } from '../middlewar/middlewar'


router.post('/createProduct', middlewarAccessToShop, async (req, res) => {
    try {
        const { shopemail } = req.headers
        const response = await controlerShop.createProduct(req.body, shopemail)

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


router.post('/editProduct/:productid', middlewarAccessToShop, async (req, res) => {
    try {
        const productToEdit = req.params.productid
        const { shopemail } = req.headers

        const response = await controlerShop.editProduct(req.body, productToEdit, shopemail)
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


router.delete('/deleteProduct/:productid', middlewarAccessToShop, async (req, res) => {
    try {
        const productToDel = req.params.productid
        const { shopemail } = req.headers
        const response = await controlerShop.deleteProduct(productToDel, shopemail)
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