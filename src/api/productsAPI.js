import axios from "axios";

const productsApi = axios.create({
    baseURL: 'http://localhost:8090/api/collections/products/records'
})

export const getProducts = async () => {
    const res = await productsApi.get('/')
    return res.data.items
}

export const createProduct = (product) =>
    productsApi.post('/', product)

export const deleteProduct = (id) =>
    productsApi.delete(`/${id}`)

export const updateProduct = (product) =>
    productsApi.patch(`/${product.id}`,product)


