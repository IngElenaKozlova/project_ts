export interface clientI {
    _id: string,
    history: string[],

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
    _id: number,
    name: string,
    price: number,
    category: string,
    stock: number,
    description: string,
    isAvailable: boolean,
    rating: number, 
    type: string
}

export interface historyI {
    _id: string,
    clientId: string,
    date: string, // use like nameFile
    products: productI[]
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

// const shop = {
//     roots : ['0f96b062-d562-42f8-9975-162abfc97ded' = _id of adminI] 

// }