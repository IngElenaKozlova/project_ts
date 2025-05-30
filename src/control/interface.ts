export interface clientI {
    _id: string,
    history: number[],

    name: string,
    email: string,
    password: string
}

export interface createClientI {
    name: string,
    email: string,   
    password: string,
}

export interface productI {
    _id: string,
    name: string,
    price: number,
    category: string,
    stock: number,
    description: string,
    isAvailable: boolean,
    rating: number, 
    type: string
}

export interface productHistoryI {
    _id: string,
    count: number,
    price: number
}

export interface productHistoryParamsI {
    _id: string,
    count: number
}

export interface historyI {
    clientEmail: string,
    date: number, // UNIX, use like nameFile
    products: productHistoryI[]
}

export interface historyParamsI {
    clientEmail: string,
    // date: number, // UNIX, use like nameFile
    products: productHistoryParamsI[]
}

export interface shopI {
    shopId: string,
    shopName: string,
    email: string,
    password: string,
    date_create: number,


}

export interface adminI {
    adminName: string,
    email: string,
    password: string,
    _id : string
  
}

export interface adminAccessI {
    email: string
}


// const shop = {
//     roots : ['0f96b062-d562-42f8-9975-162abfc97ded' = _id of adminI] 

// }