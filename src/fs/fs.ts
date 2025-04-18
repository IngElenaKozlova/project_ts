const fs = require('fs').promises;
const path = require('path');
import {shopI, clientI, productI, historyI} from '../control/interface'
// import { v4 as uuidv4 } from 'uuid';

const FN = {
    CLIENTS : "/clients",
    PRODUCTS : "/products",
    HISTORIES : "/histories",
    SHOP : "/shop.json"
}


export const createStartPackShop = async (shopData: shopI) : Promise<{ok : boolean}>=> {
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

export const readFileShop = async (email: string) : Promise<{ok : boolean, data ? : shopI}> => {
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


export const editFileShop = async (shopData: shopI, email: string) : Promise<{ok : boolean}> => {
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


export const deleteFileShop = async (shopEmail: string) : Promise<{ok : boolean}> => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail
        await fs.rm(pathFile, { recursive: true, force: true })
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const isEmailExistInClient = async (email: string, shopEmail : string) : Promise<boolean> => { 
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + email + '.json'
        await fs.readFile(pathFile, 'utf8');
        return true
    } catch (e) {
        console.log(e)
        return false 
    }
}


export const checkShopExist = async (shopEmail : string) : Promise<{ok : boolean, error ? : number}> => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/shop.json'
        await fs.readFile(pathFile, 'utf8');
        return {ok: true}
    } catch (e) {
        console.log(e)
        return { error: 403, ok : false } 
    }
}


export const isEmailExistInShop = async (email: string) : Promise<boolean> => { 
    try {
        const pathFile = path.resolve('') + '/src/datas/' + email + '/shop.json'
        await fs.readFile(pathFile, 'utf8');
        return true
    } catch (e) {
        console.log(e)
        return false 
    }
}


export const createFileClient = async (clientData: clientI, shopEmail: string) : Promise<{ok : boolean}> => {
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


export const readFileClient = async (email: string, shopEmail: string) : Promise<{ok : boolean, data ? : clientI}> => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + email + '.json'
        const result = await fs.readFile(pathFile, 'utf8');
        const jsonData = JSON.parse(result);
        return { ok: true, data: jsonData }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const editFileClient = async (clientData: clientI, clientEmail: string, shopEmail: string) : Promise<{ok : boolean}> => {
    try {
        const clientDataJson = JSON.stringify(clientData, null, 2)
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + clientEmail + '.json'
        await fs.writeFile(pathFile, clientDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const deleteFileClient = async (emailClient: string, shopEmail: string) : Promise<{ok : boolean}> => { 
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/clients/' + emailClient + '.json'
        await fs.unlink(pathFile)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const createFileProduct = async (productData: productI, shopEmail: string) : Promise<{ok : boolean}> => {
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


export const readFileProduct = async (productId: string, shopEmail: string) : Promise<{ok : boolean, data ? : productI}> => {
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


export const deleteFileProduct = async (productId: string, shopEmail: string) : Promise<{ok : boolean}> => {
    try {
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/products/' + productId + '.json'
        await fs.unlink(pathFile)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}


export const createFileHistory = async (historyData: historyI, shopEmail: string) : Promise<{ok : boolean}> => {
    try {
        const historyDataJson = JSON.stringify(historyData, null, 2)
        const pathFile = path.resolve('') + '/src/datas/' + shopEmail + '/histories/' + historyData.date + '.json'
        await fs.writeFile(pathFile, historyDataJson)
        return { ok: true }
    } catch (e) {
        console.log(e)
        return { ok: false }
    }
}

