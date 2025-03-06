import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import * as argon2 from "argon2"
import { ROOLS, isAllValidation } from './validation'
import { createStartPackShop, editFileShop, deleteFileShop, readFileShop, isEmailExistInShop, createFileClient, readFileClient, isEmailExistInClient, editFileClient, createFileProduct, deleteFileClient, readFileProduct, deleteFileProduct } from '../fs/fs'
import {shopI, createClientI, productI} from './interface'
import {responseControler} from '../interface/response'


export default {
    async createShop({ shopName, email, password }): Promise<responseControler> {
        const keys = { shopName: { rools: ROOLS.text }, email: { rools: ROOLS.email }, password: { rools: ROOLS.password } }
        const isValidationError = isAllValidation({ shopName, email, password }, keys)
        if (isValidationError.ok) return isValidationError;

        const isEmailExist = isEmailExistInShop(email)
        if (isEmailExist) return { status: 409, ok: false }

        const shopId: string = uuidv4()
        const crypted_password: string = await bcrypt.hash(password, process.env.SECREAT_ID)
        const date_create: number = Date.now();
        const newShop: shopI = {
            shopId,
            shopName,
            email,
            password: crypted_password,
            date_create
        }

        await createStartPackShop(newShop)

        return { data: newShop, ok: true }
    },

    async editShop({shopName, email}) : Promise<responseControler>{ 
        const keys = {shopName: { rools: ROOLS.text }} 
        const isValidationError = isAllValidation({shopName}, keys)
        if (isValidationError.ok) return isValidationError

        const response = await readFileShop(email)
        if (!response.ok) return { status: 404, ok: false }

        const currentShop = response.data
        const editedShop = {...currentShop, shopName}
        await editFileShop(editedShop, email)

        return {data : editedShop, ok : true}
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
        // console.log(password, 'password')
        // console.log(process.env.SECREAT_ID, 'process.env.SECREAT_ID')

        // const crypted_password: string = await bcrypt.hash(password, +process.env.SECREAT_ID)

        const crypted_password: string = await argon2.hash(password);


        // argon2.hash(password)
        // .then(hash => console.log(hash))
        // .catch(err => console.error(err))


        console.log(JSON.stringify(crypted_password), 'crypted_password')
        const newClient: any = {
            _id,
            history: [],
            name,
            email,
            password: crypted_password
        }

        await createFileClient(newClient, shopEmail)

        return { data: newClient, ok: true }
    },

    async editClient({name, email}: {name: string, email: string}, shopEmail: string) : Promise<responseControler>{ 
        const keys = {name: { rools: ROOLS.text }} 
        const isValidationError = isAllValidation({name}, keys)
        if (isValidationError.ok) return isValidationError

        const response = await readFileClient(email, shopEmail)
        if (!response.ok) return { status: 404, ok: false }

        const currentClient = response.data
        //const password: string = await bcrypt.hash(response.data.password, process.env.SECREAT_ID)

        const password: string = await argon2.hash(response.data.password);

        const editedClient = {...currentClient, name}
        await editFileClient(editedClient, email, shopEmail)

        return {data : editedClient, ok : true}
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

        await createFileProduct(newProduct, shopEmail)
        return { data: newProduct, ok: true }
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

        if (responseFs.ok) return { data: editedProduct, ok: true}
    },

    async deleteProduct(productId: string, shopEmail: string): Promise<responseControler> {
        return await deleteFileProduct(productId, shopEmail)
    }
}

