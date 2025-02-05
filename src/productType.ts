export type typeProduct =  "LAPTOP" | 'PHONE' | 'OFFICE';

export interface productI {
    id : number
    name : string
    price : number
    category : string
    stock : number
    description : string
    rating : number
    isAvailable : boolean
    type : typeProduct
}
