import { checkShopExist } from "../fs/fs"
import { responseError } from '../errors/error';

export const middlewarAccessToShop = async (req, res, next) => {
    try {
        const {shopemail} = req.headers
        const response = await checkShopExist(shopemail)
        if (response.error) {
            const error = responseError(response.error)
            return res.status(error.status).json({text : error.text, ok : false})
        }
        return next()
    } catch (e) {
        return res.status(500).json({ message: 'server error' });
    }
}

