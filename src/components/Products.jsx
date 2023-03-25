import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct, updateProduct } from '../api/productsAPI'

export const Products = () => {

    const queryClient = useQueryClient()

    const { isLoading, data: products, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        select: products => products.sort((a, b) => new Date(b.created) - new Date(a.created))
    })

    const deleteProdutMutation = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })

    const updateProductMutation = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })

    if (isLoading) return <div>Loading</div>
    else if (isError) return <div>Error: {error}</div>

    return products.map(product => (
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button onClick={() => deleteProdutMutation.mutate(product.id)}>Delete</button>
            <input
                checked={product.inStock}
                type="checkbox"
                onChange={(e) => {
                    updateProductMutation.mutate({ ...product, inStock: e.target.checked })
                }
                } />
            <label htmlFor={product.id}>In Stock</label>
        </div>
    ))


}