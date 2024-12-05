import { createContext, useState, ReactElement, useEffect } from "react";
import axios from "../api/axios";
import { AxiosResponse } from "axios";

export type ProductType = {
    id: string,
    name: string,
    description: string,
    price: number
};

const initState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[]};

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

export type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
    const [products, setProducts] = useState<ProductType[]>(initState);

    useEffect(() => {
        const getProducts = async (): Promise<void> => {
            try {
                const response: AxiosResponse = await axios.get('/food');
                console.log(response.data.data);
            
                const data: ProductType[] = response.data.data;
                
                setProducts(data);
            } catch (err) {
                console.error(err);
            }
        }

        return () => {
            getProducts();
        }
    }, [])

    return (
        <ProductsContext.Provider value={{ products }}>
            { children }
        </ProductsContext.Provider>
    )
}

export default ProductsContext