const {Router} = require("express")
const router = Router()
import controlerShop from '../control/shop'
import { responseError } from '../errors/error';
import { middlewarAccessToShop } from '../middlewar/middlewar';

router.post('/createAdmin', async (req, res) => {
    try {
        const { shopemail} = req.headers
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


module.exports = router


function interleave(...array) {
    const newArray = []
    const indexController = []
    for (let index = 0; index < array.length; index++) {
      const arrayInside = array[index] //[1, 2, 3]
      //const element2 = element1[index] //1
  
   
        for (let i = index; i < 3 + 1; i++) {
          const element = arrayInside[i]; //! 2 
          newArray.push(element)
          //newArray.splice( index + i, 0, element)
          // 1 + 1
      // [1,c, 2, 3]
        }  
    }
    return newArray;
  }
  
  const arr = [[1, 2, 3], [4, 5], [7, 8, 9], [10, 11]]
  // [1, 4]
  arr[0][1]


const aa = (...array) => {
    const newArray = []
    const maxLength = 3; // need to find
    let index = 0;
    let arrayIndex = 0 // 4

    while(array.length > index) {

        // for (let i = index; i <= index; i++) {
        //     const element = arrayInside[i];  
        // }
        // 
        newArray.push( array[arrayIndex][index] )
        arrayIndex++;

        if(arrayIndex >= array.length ){ // 1 > 3
            index++;
            arrayIndex = 0;
        }
    }



}