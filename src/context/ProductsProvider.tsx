import { createContext, useState, ReactElement, useEffect } from "react"

export type ProductType = {
    id: string,
    name: string,
    description: string,
    price: number
}

const initState: ProductType[] = []

export type UseProductsContextType = { products: ProductType[]}

const initContextState: UseProductsContextType = { products: [] }

const ProductsContext = createContext<UseProductsContextType>(initContextState)

export type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState)

    useEffect(() => {
        const fetchProducts = async (): Promise<ProductType[]> => {
            const data = fetch('http://localhost:3000/products').then(res => res.json()).catch(err => {
                if (err instanceof Error) console.log(err.message)
            })

            return data
        }

        fetchProducts().then(products => setProducts(products))
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            { children }
        </ProductsContext.Provider>
    )
}

export default ProductsContext