import { productI } from "./productType";


const products: productI[] = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    stock: 15,
    description: "High-performance laptop with 16GB RAM and 512GB SSD storage.",
    rating: 4.5,
    isAvailable: true,
    type: 'LAPTOP'
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    stock: 30,
    description: "Latest model with 128GB storage and high-quality camera.",
    rating: 4.3,
    isAvailable: true,
    type: 'PHONE'
  },
  {
    id: 3,
    name: "Iphone 12",
    price: 150,
    category: "Accessories",
    stock: 50,
    description: "Noise-cancelling over-ear headphones.",
    rating: 4.7,
    isAvailable: true,
    type: 'PHONE'
  },
  {
    id: 4,
    name: "Coffee Maker",
    price: 75,
    category: "Home Appliances",
    stock: 20,
    description: "Brews fresh coffee with an easy-to-use interface.",
    rating: 4.0,
    isAvailable: true,
    type: 'OFFICE'
  },
  {
    id: 5,
    name: "Office Chair",
    price: 300,
    category: "Furniture",
    stock: 10,
    description: "Ergonomic office chair with adjustable height and lumbar support.",
    rating: 4.8,
    isAvailable: false,
    type: 'OFFICE'
  }
];

interface responseProductI {
  text?: string
  ok: boolean
}




const createControlProduct = (products: productI[]) => {
  return {
    data : products,

    deleteProduct: (id: number): responseProductI => {
      const idIndex: number = products.findIndex((element) => element.id === id)
      if (idIndex === -1) return { text: "_id not found", ok: false }
      products.splice(idIndex, 1)
      return { ok: true }
    },

    filterProductsPrice: (min_price: number, max_price: number): productI[] => products.filter(element => element.price >= min_price && element.price <= max_price),

    updateProduct: (product: productI) => {
      const index: number = products.findIndex((element) => element.id === product.id);
      if (index === -1) return { text: "_id not found", ok: false }
      products[index] = product;
      return { ok: true }
    },

    productAvailability: (id: number, isAvailable: boolean): responseProductI => {
      const currentProduct: productI | undefined = products.find((elem) => elem.id = id)
      if (currentProduct === undefined) return { text: "_id not found", ok: false }
      currentProduct.isAvailable = isAvailable
      return { ok: true }
    },
    productChangeStock: (id: number, stock: number): responseProductI => {
      const currentProduct: productI | undefined = products.find((elem) => elem.id = id)
      if (currentProduct === undefined) return { text: "_id not found", ok: false }
      currentProduct.stock = stock
      if (currentProduct.stock <= 0) currentProduct.isAvailable = false;
      return { ok: true }
    }
  }
}



const controlProducts = createControlProduct(products)

