import {useMutation, useQueryClient} from '@tanstack/react-query'
import { createProduct } from '../api/productsAPI'

export const ProductForm = () => {

    const queryClient = useQueryClient()

    const addProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: ()=> {
            console.log('Product added!')
            queryClient.invalidateQueries('products')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const product =Object.fromEntries(formData)
        addProductMutation.mutate({
            ...product,
            inStock:true
        })
    }

    return (
        <form 
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
        >
            <label>Name </label>
            <input type="text" id="name" name="name" />

            <label>Description </label>
            <input type="text" id="description" name="description" />


            <label>Price </label>
            <input type="number" id="price" name="price" />

            <button>Add product</button>
        </form>
    )
}