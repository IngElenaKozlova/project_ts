const client = {
    name: "Arnol",
    _id: "asdsada",
    email: "user@dasda.com",
    password: "1234",
    history: ['asda']
}

const product = {
    _id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    stock: 15,
    description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
    isAvailable: true,
    type: 'LAPTOP'
}

const statistic = {
    _id: 'asda',
    date: "UNIX",
    products: [
        { _id: 1, count: 5, price: 1200 }
    ]
}





const shop = {
    shop : {
        

        "shopId": "8b800481-5cee-4c46-9c19-244af824e4d5",
        "shopName": "shop010",
        "email": "shop010@gmail.com",
        "crypted_password": "$2b$12$thwu/r0DirfmNIWYUVeDfOgkV0y05vI5R0k9I5FnwtUdSyhzfxghS",
        "date_create": 1736449270388
    
    },

    clients: {
        'dsadsafa': {
            name: "Arnol",
            _id: "dsadsafa",
            email: "user@dasda.com",
            password: "1234",
            history: ['1932132131']
        }
    },
    products: {
        1: {
            _id: 1,
            name: "Laptop",
            price: 1200,
            category: "Electronics",
            stock: 15,
            description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
            isAvailable: true,
            type: 'LAPTOP'
        }
    },
    histories: { // every history is different json file with UNIX-name
        'UNIX': {
            clientEmail: "dsadsa@fa.com",
            date: 2345678976, // UNIX, number
            products: [
                { _id: 1, count: 5, price: 1200 }, // do not forget to update stock in product !!!
                { _id: 2, count: 5, price: 1200 }
            ]
        },
        1932132131: {
            clientEmail: "dsadsafa",
            date: 1932132131,
            products: [
                { _id: 1, count: 5, price: 1200 }
            ]
        },
    }
}

products: [
    { "_id": "c1531c89-b0c1-4c14-afdc-a588dfb33833", count: 5}
]

products: [
    {
        "_id": "c1531c89-b0c1-4c14-afdc-a588dfb33833",
        "name": "Laptop1",
        "price": 1201,
        "category": "Electronics",
        "stock": 11,
        "description": "High-performance laptop with 16GB RAM and 512GB SSD storage.",
        "isAvailable": true,
        "rating": 4.9,
        "type": "LAPTOP"
      }
]
// clientEmail  [{_id: 1, count: 5}]

// 1 registration


// 


// const res = {
//     clientEmail : 'user@gma@sad',
//     products : [

//     ]
// }

