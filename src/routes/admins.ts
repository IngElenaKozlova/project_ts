const {Router} = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error';
import { middlewarAccessToShop } from '../middlewar/middlewar';

router.post('/createAdmin', async (req, res) => {
    try {
        const { shopemail } = req.headers
        const response = await controlerShop.createAdmin(req.body, shopemail)

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


router.delete('/deleteAdmin', middlewarAccessToShop, async (req, res) => {
    try {
        const { shopemail } = req.headers
        const response = await controlerShop.deleteAdmin(req.body.adminEmail, shopemail)

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


router.post('/editAdmin', middlewarAccessToShop, async (req, res) => {
    try {
        const { shopemail } = req.headers
        const response = await controlerShop.editAdmin(req.body, shopemail)

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


module.exports = router


