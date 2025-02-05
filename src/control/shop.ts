import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ROOLS, isAllValidation } from './validation'
import { createStartPackShop, isEmailExistInShop, createFileClient, readFileClient, isEmailExistInClient, checkShopExist, createFileProduct } from '../fs/fs';
import {shopI, createClientI, productI} from './interface'
import {responseControler} from '../interface/response'


// rools = [empty, ] rools

// const isHasErrorCheckData = (data : any, type : string) : boolean => {
//     if(type !== typeof data) return true;

//     if(type === 'string') {
//         if(data.trim() === '') return true;

//     }


//     return false
// }
// isCheckData('name', 'string')


// function test({ name, email, password }: any) {
//     console.log(arguments) // [{name : 'sada', email : 'sada', password : 'sad'}]
// }

// test({ name: 'sada', email: 'sada', password: 'sad' })

// const r = {
//     "function user": 'sadsa',
//     function: 'd'
// }
// const shopId = 'shopId'



// const createShop = () => {
//     return {
//         clients: {},
//         products: {},
//         histories: {},

//         createClient({ name, email, password }: createClientI) {

//             // if(isHasErrorCheckData(name, 'string')) return {ok : false}
//             // const isName = isHasErrorCheckData(name, ROOLS.text);
//             // const isEmail = isHasErrorCheckData(email, ROOLS.email, {min : 5});
//             // const isPassword = isHasErrorCheckData(password, ROOLS.password, {min : 6});


//             // const array = [
//             //     {rools : ROOLS.text, value : name}
//             // ]
//             const keys = {
//                 name: { rools: ROOLS.text },
//                 email: { rools: ROOLS.email, data: { min: 5 } },
//                 password: { rools: ROOLS.password, data: { min: 6 } }
//             }
//             const isValidationError = isAllValidation({ name, email, password }, keys)

//             if (isValidationError.ok) return isValidationError;
//             console.log(isValidationError, 'isValidationError')

//             //    const isAllValidation = (data : any, keys : any) : any => { //example name : Alex
//             //         for(const key in keys) {
//             //             const value = keys[key]; //keys[key] = name : {rools : ROOLS.text}
//             //             isHasErrorCheckData(data[key], value.rools, value?.data) //data[key] = name
//             //             return {ok : false}
//             //         }

//             //     const isName = isHasErrorCheckData(data?.name, ROOLS.text);
//             //     const isEmail = isHasErrorCheckData(email, ROOLS.email, {min : 5});
//             //     const isPassword = isHasErrorCheckData(password, ROOLS.password, {min : 6});



//             // }


//             const _id: string = uuidv4()
//             const newClient: any = {
//                 _id,
//                 history: [],
//                 name,
//                 email,
//                 password
//             }
//             this.clients[_id] = newClient;

//             console.log(newClient)

//         }
//     }
// }


// const shopA = createShop();
// shopA.createClient({ name: 'sada', email: 'user@gmail.com', password: 'sadA1@' })

export default {
    async createShop({shopName, email, password}) : Promise<responseControler>{ // Toys
        //TODO add email exist  module sistem
        const keys = {shopName: { rools: ROOLS.text }, email: { rools: ROOLS.email}, password: { rools : ROOLS.password}} 
        const isValidationError = isAllValidation({shopName, email, password}, keys)
        if (isValidationError.ok) return isValidationError;

        const isEmailExist = isEmailExistInShop(email)
        if (isEmailExist) return  { status: 409, ok: false }
        
        const shopId: string = uuidv4()
        const crypted_password : string = await bcrypt.hash(password, process.env.SECREAT_ID)
        const date_create : number = Date.now();
        const newShop: shopI = {
            shopId,
            shopName,
            email,
            password : crypted_password,
            date_create
        }

        await createStartPackShop(newShop)

        return {data : newShop, ok : true}
    },
    
    async createClient({ name, email, password }: createClientI, shopEmail: string) : Promise<responseControler> {
        //TODO add email exist  module sistem
        // const isShopExists = await checkShopExist(shopEmail)
        // if (!isShopExists) return { error: 404, ok : false }

        // if(isHasErrorCheckData(name, 'string')) return {ok : false}
        // const isName = isHasErrorCheckData(name, ROOLS.text);
        // const isEmail = isHasErrorCheckData(email, ROOLS.email, {min : 5});
        // const isPassword = isHasErrorCheckData(password, ROOLS.password, {min : 6});


        // const array = [
        //     {rools : ROOLS.text, value : name}
        // ]

        const keys = {
            name: { rools: ROOLS.text },
            email: { rools: ROOLS.email, data: { min: 5 } },
            password: { rools: ROOLS.password, data: { min: 6 } }
        }
        const isValidationError = isAllValidation({ name, email, password }, keys)

        if (isValidationError.ok) return isValidationError 

        const isEmailExist = await isEmailExistInClient(email, shopEmail);
        // console.log(isEmailExist, 'isEmailExist')
        if (isEmailExist) return  { status: 409, ok : false }



        //    const isAllValidation = (data : any, keys : any) : any => { //example name : Alex
        //         for(const key in keys) {
        //             const value = keys[key]; //keys[key] = name : {rools : ROOLS.text}
        //             isHasErrorCheckData(data[key], value.rools, value?.data) //data[key] = name
        //             return {ok : false}
        //         }

        //     const isName = isHasErrorCheckData(data?.name, ROOLS.text);
        //     const isEmail = isHasErrorCheckData(email, ROOLS.email, {min : 5});
        //     const isPassword = isHasErrorCheckData(password, ROOLS.password, {min : 6});



        // }


        const _id: string = uuidv4()
        const crypted_password : string = await bcrypt.hash(password, process.env.SECREAT_ID)
        const newClient: any = {
            _id,
            history: [],
            name,
            email,
            password : crypted_password
        }

        await createFileClient(newClient, shopEmail)

        return {data : newClient, ok : true}
    },

    async createProduct({ name, price, category, stock, description, isAvailable, type }: productI, shopEmail: string) : Promise<responseControler>  {
        // To do add email exist  module sistem
        
        const keys = {
            name: { rools: ROOLS.text },
            price: { rools: ROOLS.price },
            category: { rools: ROOLS.text },
            stock: { rools: ROOLS.number },
            description: { rools: ROOLS.text },
            isAvailable: { rools: ROOLS.boolean },
            // rating
            type: { rools: ROOLS.text }
        }
        const isValidationError = isAllValidation({ name, price, category, stock, description, isAvailable, type }, keys)

        if (isValidationError.ok) return isValidationError 

        const _id: string = uuidv4()
        const newProduct: any = {
            _id,
            name, 
            price, 
            category, 
            stock, 
            description, 
            isAvailable, 
            type
        }

        await createFileProduct(newProduct, shopEmail)

        return {data : newProduct, ok : true}
    }
}




//  

// const e = {
//     haha : 17
// }
// e.name = 'string'
// const ho = "haha"
// e[ho] = 17



// {
//     _id: 'sada',
//     sum: 100,
//     products: [
//         { _id: 1, count: 2, price: 20, name: 'aa' },
//         { _id: 2, count: 2, price: 30, name: 'aa' },
//     ],
//     date: 'UNIX'
// }



const data = {
    rool : 'has', name : 'Robert', age : 200, pass : '12345'
}


// const ct = (name, age, pass, rool) => {
const ct = ({name, age, pass, rool}
    
    
    ) => {

}

data.name

ct(data)
// ct(100, 'Alex', 'rool-1', 'paswwwww')


// const a = async (a : number) : Promise<number> => {
//     return a + 10;
// }

// const e = a(9); // Promise // .000000000000000000001