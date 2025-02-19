const fs = require('fs').promises;
const path = require('path');
import {shopI, clientI, productI} from '../control/interface'
// import { v4 as uuidv4 } from 'uuid';

const FN = {
    CLIENTS : "/clients",
    PRODUCTS : "/products",
    HISTORIES : "/histories",
    SHOP : "/shop.json"
}

// const readFile = async (name) => {
//     try {
//         const pathFile = path.resolve('') + '/src' + '/datas/' + name + '.json'
//         const result = await fs.readFile(pathFile, 'utf8');
//         const jsonData = JSON.parse(result);
//         return { ok: true, data: jsonData }
//     } catch (e) {
//         console.log(e)
//         return { ok: false }
//     }
// }

// const createFile = async (name, data) => {
//     try {
//         const pathFile = path.resolve('') + '/datas/' + name + '.json'
//         const dataJson = JSON.stringify(data)
//         await fs.mkdir(path.resolve('') + '/data', { recursive: true });
//         await fs.writeFile(pathFile, dataJson)
//         return { ok: true }
//     } catch (e) {
//         console.log(e)
//         return { ok: false }
//     }
// }

export const createStartPackShop = async (shopData: shopI) => {
    try {

        const shopDataJson = JSON.stringify(shopData, null, 2)

        const pathFile = path.resolve('') + '/src/datas/' + shopData.email
        await fs.mkdir(pathFile + FN.CLIENTS, { recursive: true });
        await fs.mkdir(pathFile + FN.PRODUCTS, { recursive: true });
        await fs.mkdir(pathFile + FN.HISTORIES, { recursive: true });
        await fs.writeFile(pathFile + FN.SHOP, shopDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}

export const readFileShop = async (email: string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + email + '/shop.json'
        const result = await fs.readFile(pathFile, 'utf8');
        const jsonData = JSON.parse(result);
        return { ok: true, data: jsonData }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const editFileShop = async (shopData: shopI, email: string) => {
    try {
        const shopDataJson = JSON.stringify(shopData, null, 2)
        const pathFile = path.resolve('') + '/src/datas/' + email + '/shop.json'
        await fs.writeFile(pathFile, shopDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const isEmailExistInClient = async (email: string, shopEmail : string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + email + '.json'
        await fs.readFile(pathFile, 'utf8');
        return true
    } catch (e) {
        console.log(e)
        return false 
    }
}


export const checkShopExist = async (shopEmail : string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/shop.json'
        await fs.readFile(pathFile, 'utf8');
        return {ok: true}
    } catch (e) {
        console.log(e)
        return { error: 403, ok : false } 
    }
}


export const isEmailExistInShop = async (email: string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + email + '/shop.json'
        await fs.readFile(pathFile, 'utf8');
        return true
    } catch (e) {
        console.log(e)
        return false 
    }
}


export const createFileClient = async (clientData: clientI, shopEmail: string) => {
    try {
        const clientDataJson = JSON.stringify(clientData, null, 2)
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + clientData.email + '.json'
        await fs.writeFile(pathFile, clientDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const readFileClient = async (email: string, shopEmail: string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + email + '/shop.json'
        const result = await fs.readFile(pathFile, 'utf8');
        const jsonData = JSON.parse(result);
        return { ok: true, data: jsonData }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}

export const deleteFileClient = async (emailClient: string, shopEmail: string) => { 
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + emailClient + '.json'
        await fs.unlink(pathFile)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const createFileProduct = async (productData: productI, shopEmail: string) => {
    try {
        const productDataJson = JSON.stringify(productData, null, 2)
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/products/' + productData._id + '.json'
        await fs.writeFile(pathFile, productDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const readFileProduct = async (productId: string, shopEmail: string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/products/' + productId + '.json'
        const result = await fs.readFile(pathFile, 'utf8');
        const jsonData = JSON.parse(result);
        return { ok: true, data: jsonData }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const deleteFileProduct = async (productId: string, shopEmail: string) => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/products/' + productId + '.json'
        await fs.unlink(pathFile)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


// 1 create route for create shop
// post (shopName)  return new shop
