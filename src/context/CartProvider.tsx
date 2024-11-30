import { useReducer, ReactElement, useMemo, createContext } from "react";

export type CartItemType = {
    id: string,
    name: string,
    price: number,
    qty: number
}

export type CartStateType = { cart: CartItemType[] }

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE =  {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    QUANTITY: 'QUANTITY',
    SUBMIT: 'SUBMIT'
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction = {
    type: string,
    payload?: CartItemType
}

const reducer = (state: CartStateType, action: ReducerAction): CartStateType => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.ADD: {
            if (!action.payload) throw new Error('action.payload missing in ADD action')
            
            const { id, name, price } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)
            const itemExist: CartItemType | undefined = state.cart.find(item => item.id === id)
            const qty: number = itemExist ? itemExist.qty + 1 : 1

        return { ...state, cart: [...filteredCart, { id, name, price, qty }] }
        }

        case REDUCER_ACTION_TYPE.REMOVE: {
            if (!action.payload) throw new Error('action.payload missing in REMOVE action')
            
            const { id } = action.payload
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

        return { ...state, cart: [...filteredCart] }
        }

        case REDUCER_ACTION_TYPE.QUANTITY: {
            if (!action.payload) throw new Error('action.payload missing in QUANTITY action')
            
            const { id, qty } = action.payload
            const itemExist: CartItemType | undefined = state.cart.find(item => item.id === id)

            if (!itemExist) throw new Error('item not found')

            const updatedItem: CartItemType = { ...itemExist, qty }
            const filteredCart: CartItemType[] = state.cart.filter(item => item.id !== id)

        return { ...state, cart: [...filteredCart, updatedItem] }
        }

        case REDUCER_ACTION_TYPE.SUBMIT: {
        return { ...state, cart: [] }
        }

        default: {
        throw new Error('undefined action type')
        }
    }
}

const useCartContext = (initCartState: CartStateType) => {
    const [state, dispatch] = useReducer(reducer, initCartState)

    const REDUCER_ACTIONS = useMemo(() => {
        return REDUCER_ACTION_TYPE
    }, [])

    const totalItems = state.cart.reduce((prev, curr) => prev + curr.qty, 0)

    const totalPrice = state.cart.reduce((prev, curr) => prev + (curr.price * curr.qty), 0)

    const cart = state.cart.sort((a, b) => parseInt(a.id) - parseInt(b.id))

    return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }
}

export type UseCartContextType = ReturnType<typeof useCartContext>

const initContextState: UseCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: 0,
    cart: []
}

const CartContext = createContext<UseCartContextType>(initContextState)

export type ChildrenType =  {
    children: ReactElement | ReactElement[]
}

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={ useCartContext(initCartState) }>
            { children }
        </CartContext.Provider>
    )
}

export default CartContext