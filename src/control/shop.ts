import { v4 as uuidv4 } from 'uuid'
// import bcrypt from 'bcrypt'
import * as argon2 from "argon2"
import { ROOLS, isAllValidation } from './validation'
import { createStartPackShop, editFileShop, deleteFileShop, readFileShop, isEmailExistInShop, createFileClient, readFileClient, isEmailExistInClient, editFileClient, createFileProduct, deleteFileClient, readFileProduct, deleteFileProduct, createFileHistory, readFileAdmin, deleteFileHistory, deleteHistoryFromClient, readFileHistory, createFileAdmin} from '../fs/fs'
import { shopI, createClientI, clientI, productI, historyI, productHistoryParamsI, productHistoryI, historyParamsI} from './interface'
import { responseControler } from '../interface/response'


export default {
    async createShop({ shopName, email, password }): Promise<responseControler> {
        const keys = { shopName: { rools: ROOLS.text }, email: { rools: ROOLS.email }, password: { rools: ROOLS.password } }
        const isValidationError = isAllValidation({ shopName, email, password }, keys)
        if (isValidationError.ok) return isValidationError;

        const isEmailExist = isEmailExistInShop(email)
        if (isEmailExist) return { status: 409, ok: false }

        const shopId: string = uuidv4()

        const crypted_password: string = await argon2.hash(password);
        const date_create: number = Date.now();
        const newShop: shopI = {
            shopId,
            shopName,
            email,
            password: crypted_password,
            date_create
        }

        const result = await createStartPackShop(newShop)

        return { data: newShop, ok: result.ok }
    },

    async editShop({shopName, email}) : Promise<responseControler>{ 
        const keys = {shopName: { rools: ROOLS.text }} 
        const isValidationError = isAllValidation({shopName}, keys)
        if (isValidationError.ok) return isValidationError

        const response = await readFileShop(email)
        if (!response.ok) return { status: 404, ok: false }

        const currentShop = response.data
        const editedShop = {...currentShop, shopName}
        const result = await editFileShop(editedShop, email)

        return {data : editedShop, ok : result.ok}
    }, 

    async deleteShop(shopEmail: string): Promise<responseControler> { 
        return await deleteFileShop(shopEmail)
    },
    
    async createClient({ name, email, password }: createClientI, shopEmail: string): Promise<responseControler> {
        const keys = {
            name: { rools: ROOLS.text },
            email: { rools: ROOLS.email, data: { min: 5 } },
            password: { rools: ROOLS.password, data: { min: 6 } }
        }
        const isValidationError = isAllValidation({ name, email, password }, keys)

        if (isValidationError.ok) return isValidationError

        const isEmailExist = await isEmailExistInClient(email, shopEmail);

        if (isEmailExist) return { status: 409, ok: false }

        const _id: string = uuidv4()

        const crypted_password: string = await argon2.hash(password);

        const newClient: any = {
            _id,
            history: [],
            name,
            email,
            password: crypted_password
        }

        const result = await createFileClient(newClient, shopEmail)
        delete newClient.password

        return { data: newClient, ok: result.ok }
    },

    async editClient({name, email}: {name: string, email: string}, shopEmail: string) : Promise<responseControler>{ 
        const keys = {name: { rools: ROOLS.text }} 
        const isValidationError = isAllValidation({name}, keys)
        if (isValidationError.ok) return isValidationError

        const response = await readFileClient(email, shopEmail)
        if (!response.ok) return { status: 404, ok: false }

        const currentClient = response.data

        const editedClient = {...currentClient, name}
        const result = await editFileClient(editedClient, email, shopEmail)
        delete editedClient.password

        return {data : editedClient, ok : result.ok}
    }, 
    
     async deleteClient(emailClient: string, shopEmail: string): Promise<responseControler> { 
        return await deleteFileClient(emailClient, shopEmail)
    },

    async createProduct({ name, price, category, stock, description, isAvailable, rating, type }: productI, shopEmail: string): Promise<responseControler> {

        const keys = {
            name: { rools: ROOLS.text },
            price: { rools: ROOLS.price },
            category: { rools: ROOLS.text },
            stock: { rools: ROOLS.number },
            description: { rools: ROOLS.text },
            isAvailable: { rools: ROOLS.boolean },
            rating: { rools: ROOLS.number },
            type: { rools: ROOLS.text }
        }
        const isValidationError = isAllValidation({ name, price, category, stock, description, isAvailable, rating, type }, keys)

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
            rating,
            type
        }

        const result = await createFileProduct(newProduct, shopEmail)
        return { data: newProduct, ok: result.ok }
    },

    async editProduct({ name, price, category, stock, description, isAvailable, rating, type }: productI, productId: string, shopEmail: string): Promise<responseControler> {

        const keys = {
            name: { rools: ROOLS.text },
            price: { rools: ROOLS.price },
            category: { rools: ROOLS.text },
            stock: { rools: ROOLS.number },
            description: { rools: ROOLS.text },
            isAvailable: { rools: ROOLS.boolean },
            rating: { rools: ROOLS.number },
            type: { rools: ROOLS.text }
        }
        const isValidationError = isAllValidation({ name, price, category, stock, description, isAvailable, rating, type }, keys)
        if (isValidationError.ok) return isValidationError

        const result = await readFileProduct(productId, shopEmail)
        if (!result.ok) return { status: 404, ok: false }
        const productData = result.data

        const editedProduct = { ...productData, name, price, category, stock, description, isAvailable, rating, type }

        const responseFs = await createFileProduct(editedProduct, shopEmail)

        if (responseFs.ok) return { data: editedProduct, ok: responseFs.ok}
    },

    async deleteProduct(productId: string, shopEmail: string): Promise<responseControler> {
        return await deleteFileProduct(productId, shopEmail)
    },

    async createHistory({ clientEmail, products }: historyParamsI, shopEmail: string): Promise<responseControler> {
        
        let isValidationError : boolean | {text ? : string, status ? : number, ok : boolean} = false 

        const keys = {
            count: { rools: ROOLS.number }
        }

        products.forEach((product : productHistoryParamsI) => { 
            const validationError = isAllValidation({ count : product.count }, keys)
            if (validationError.ok) {
                isValidationError = validationError;
            }
        })

        if (isValidationError) return isValidationError

        const isEmailExist = await isEmailExistInClient(clientEmail, shopEmail)
        if (!isEmailExist) return { status: 409, ok: false }

        let historyProducts = []
        let updatedProducts = []

        for (let index = 0; index < products.length; index++) {
            const product = products[index]
            const result = await readFileProduct(product._id, shopEmail)
            if (!result.ok) return { status: 404, ok: false }
            
            const productData = result.data
            const productWithPrice : productHistoryI = {
                _id : productData._id,
                count : product.count,
                price : productData.price * product.count
            }
            historyProducts.push(productWithPrice)

            const stock = productData.stock - product.count
            const updatedProduct = {...productData, stock}

            updatedProducts.push(updatedProduct)
        }

        
        await Promise.all(updatedProducts.map(async (product : productI) => await createFileProduct(product, shopEmail))) // update product in json
    
        const newHistory: historyI = { 
            clientEmail,
            date: Date.now(),
            products : historyProducts 
        }

        const result = await createFileHistory(newHistory, shopEmail) // create new history

        const currentClient = await readFileClient(clientEmail, shopEmail)
        const currentClientData = currentClient.data

        const updatedClient: clientI = {
            _id: currentClient.data._id,
            history: currentClientData.history, 
            name: currentClientData.name,
            email: currentClientData.email,
            password: currentClientData.password
        }

        updatedClient.history.push(newHistory.date)

        const result2 = await editFileClient(updatedClient, clientEmail, shopEmail) // update existing client
        if (!result2) return {status : 500, ok: false}

        return { data: newHistory, ok: result.ok }
    },

    async editHistory({ clientEmail, products }: historyParamsI, shopEmail: string, historyId: number): Promise<responseControler> {
        let isValidationError : boolean | {text ? : string, status ? : number, ok : boolean} = false 
        const keys = {
            count: { rools: ROOLS.number }
        }
        products.forEach((product : productHistoryParamsI) => { 
            const validationError = isAllValidation({ count : product.count }, keys)
            if (validationError.ok) {
                isValidationError = validationError;
            }
        })

        if (isValidationError) return isValidationError

        const isEmailExist = await isEmailExistInClient(clientEmail, shopEmail)
        if (!isEmailExist) return { status: 409, ok: false }

        let historyProducts = []
        let updatedProducts = []

        const resultHist = await readFileHistory(historyId, shopEmail)
        if (!resultHist.ok) return { status: 404, ok: false }
        const historyData = resultHist.data

        for (let index = 0; index < products.length; index++) {
            const product = products[index]
            const resultProd = await readFileProduct(product._id, shopEmail)
            if (!resultProd.ok) return { status: 404, ok: false }
           
            const productData = resultProd.data
            const count = product.count

            const historyProdCount = historyData.products.find((elem) => elem._id === product._id)

            const stock = productData.stock + (historyProdCount.count - count)


            //  c = 4 h = 5  all = 10
            // r= h - c // all + r

            //  c = 5 h = 4  all = 10
            // r= h - c // all + r

            //  c = 5 h = 4  all = -10
            // r= h - c // all + r

            //  c = 4 h = 5  all = -10
            // r= h - c // all + r

            
            const updatedProdHist: productHistoryI = {
                _id: product._id,
                count: count,
                price: count * productData.price
            }

            historyProducts.push(updatedProdHist)

            const updatedProduct = {...productData, stock}
            updatedProducts.push(updatedProduct)
        }

        const createUpdatedProduct = await Promise.all(updatedProducts.map(async (product : productI) => await createFileProduct(product, shopEmail)))     


        // const errorCreate = createUpdatedProduct.find((elem) => elem.ok === false)
        // const errorCreate = createUpdatedProduct.find(({ok}) => !ok)
        // if (errorCreate) return {data: errorCreate, ok: false}

        // const errorCreate = createUpdatedProduct.filter(({ok}) => !ok)
        // if (errorCreate.length) return {data: errorCreate, ok: false}     
        
        // const resultCreateProd = await createFileProduct(updatedProduct, shopEmail)
        // if (!resultCreateProd) return {status : 500, ok: false}

        
        const editedHistory: historyI = { 
            clientEmail,
            date: historyData.date,
            products : historyProducts
        }

        const resultCreateHist = await createFileHistory(editedHistory, shopEmail)
        if (!resultCreateHist) return {status : 500, ok: false}

        return { data: editedHistory, ok: resultCreateHist.ok }


        // create plan for editHistory
        //? 1 add validation
        //? 1.1 check exist user
        //? 1.2 check exist shop 
        //? 1.3 check validation data
        
        //? 2 get all need products
        //? 2.1 check exist product 

        //? 3 get one need history
        //? 3.1 check exist history 

        //? 4 logical change
        //? 4.1 change products
        //? 4.2 change history

        //? 5 save products
        //? 6 save history

        //? 7 return history 

    },

    async deleteHistory(shopEmail: string, clientEmail: string, historyId: number): Promise<responseControler> {
       const res1 = await deleteFileHistory(shopEmail, historyId)
       const res2 = await deleteHistoryFromClient(shopEmail, clientEmail, historyId)
        if (!res1) return {status : 500, ok: false, text : "deleteFileHistory"}
        if (!res2) return {status : 501, ok: false, text : "deleteHistoryFromClient"}
        return {ok: true}
    },

    async createAdmin({adminEmail, adminRools} : {adminEmail: string, adminRools: number[]}, shopEmail: string): Promise<responseControler> {

        const isEmailExist = isEmailExistInShop(shopEmail)
        if (!isEmailExist) return { status: 404, ok: false }

        const keys = { adminEmail: { rools: ROOLS.email } }
        const isValidationError = isAllValidation({adminEmail}, keys)
        if (isValidationError.ok) return isValidationError

        for (let index = 0; index < adminRools.length; index++) {
            const rool = adminRools[index]
            if (typeof rool !== 'number') return { status: 422, ok: false }
            if (!(rool >= 100 && rool <= 108)) return { status: 422, ok: false }                  
        }

        const newAdmin: any = {
            email: adminEmail,
            rools: adminRools
        }

        const result = await readFileAdmin(shopEmail)
        console.log(result, 'result aaa-----------------------')
        if (result.ok) {
            const adminsData = result.data
            const findAdminEmail = adminsData.find(({email}) => email === adminEmail)
            if (findAdminEmail) return { status: 409, ok: false }

            adminsData.push(newAdmin)   
            const rewriteFileAdmin = await createFileAdmin(adminsData, shopEmail)
            return { data: newAdmin, ok: rewriteFileAdmin.ok }
        } else {
            const createAdminResult = await createFileAdmin([newAdmin], shopEmail)
            if (!createAdminResult.ok) return { status: 500, ok: false }
            return { data: newAdmin, ok: createAdminResult.ok }
        }





        
        //? 1 validation adminEmail and shopEmail +
        //? 2 add rools (in route too) +
        //? 3 add rools json description +
        //? 4 validation rools +
        //? 5 adminRools send isnt array check -
        
    },
}

console.log(n) // undefined
var n = 1;
console.log(n) // 1

