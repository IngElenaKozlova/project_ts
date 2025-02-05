

// const products= [
//   {
//     id: 1,
//     name: "Laptop",
//     price: 1200,
//     category: "Electronics",
//     stock: 15,
//     description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
//     rating: 4.5,
//     isAvailable: true,
//     type: 'LAPTOP'
//   },
//   {
//     id: 2,
//     name: "Smartphone",
//     price: 800,
//     category: "Electronics",
//     stock: 30,
//     description: "Latest model with 128GB storage and high-quality camera.",
//     rating: 4.3,
//     isAvailable: true,
//     type: 'PHONE'
//   },
//   {
//     id: 3,
//     name: "Iphone 12",
//     price: 150,
//     category: "Accessories",
//     stock: 50,
//     description: "Noise-cancelling over-ear headphones.",
//     rating: 4.7,
//     isAvailable: true,
//     type: 'PHONE'
//   },
//   {
//     id: 4,
//     name: "Coffee Maker",
//     price: 75,
//     category: "Home Appliances",
//     stock: 20,
//     description: "Brews fresh coffee with an easy-to-use interface.",
//     rating: 4.0,
//     isAvailable: true,
//     type: 'OFFICE'
//   },
//   {
//     id: 5,
//     name: "Office Chair",
//     price: 300,
//     category: "Furniture",
//     stock: 10,
//     description: "Ergonomic office chair with adjustable height and lumbar support.",
//     rating: 4.8,
//     isAvailable: false,
//     type: 'OFFICE'
//   }
// ];


const createShop = () => {
    return {
        clients: [],

        products: [],


        statistics: [
            {
                _id: 'sada',
                sum: 100,
                products: [
                    { _id: 1, count: 2, price: 20, name: 'aa' },
                    { _id: 2, count: 2, price: 30, name: 'aa' },
                ],
                date: 'UNIX'
            }
        ]
        }
}




const createControlProduct = (products) => {
    return {
        data: products,

        test1() {
            console.log(this, '1')
        },
        test2: () => {
            console.log(this, '2')
        },
        test3: function () {
            console.log(this, '3')
        },

        adNewProduct() {
            this.data.push({
                id: Math.random(),
                name: "Laptop",
                price: 1200,
                category: "Electronics",
                stock: 15,
                description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
                rating: 4.5,
                isAvailable: true,
                type: 'LAPTOP'
            })
        },

        deleteProduct: function (id) {
            const idIndex = this.data.findIndex((element) => element.id === id)
            if (idIndex === -1) return { text: "_id not found", ok: false }
            this.data.splice(idIndex, 1)
            return { ok: true }
        },

        filterProductsPrice: (min_price, max_price) => products.filter(element => element.price >= min_price && element.price <= max_price),

        updateProduct: (product) => {
            const index = products.findIndex((element) => element.id === product.id);
            if (index === -1) return { text: "_id not found", ok: false }
            products[index] = product;
            return { ok: true }
        },

        productAvailability: (id, isAvailable) => {
            const currentProduct = products.find((elem) => elem.id = id)
            if (currentProduct === undefined) return { text: "_id not found", ok: false }
            currentProduct.isAvailable = isAvailable
            return { ok: true }
        },
        productChangeStock: (id, stock) => {
            const currentProduct = products.find((elem) => elem.id = id)
            if (currentProduct === undefined) return { text: "_id not found", ok: false }
            currentProduct.stock = stock
            if (currentProduct.stock <= 0) currentProduct.isAvailable = false;
            return { ok: true }
        }
    }
}



    // const controlProducts = createControlProduct(products)


    // controlProducts.test1()

    ; (function () {

        const controlProducts2 = createControlProduct([])
        const controlProducts3 = createControlProduct([])

        controlProducts2.adNewProduct()
        controlProducts2.adNewProduct()
        console.log(controlProducts3.data)
        console.log(controlProducts2.data)


    })();

