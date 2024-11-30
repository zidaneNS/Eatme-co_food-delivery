import useCart from "../hooks/useCart"
import { CartItemType } from "../context/CartProvider"
import { useState } from "react"

const PlaceCart = () => {
  const { dispatch, totalItems, totalPrice, REDUCER_ACTIONS, cart } = useCart()
  const [success, setSuccess] = useState<boolean>(false)

  const handleSubmit = () => {
      dispatch({ type: REDUCER_ACTIONS.SUBMIT })
      setSuccess(true)
  }

  const handleChange = (cart: CartItemType, qty: number) => {
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: {...cart, qty} })
  }

  const handleClear = (cart: CartItemType) => {
    dispatch({ type: REDUCER_ACTIONS.REMOVE, payload: cart })
  }

  return (
    <main className="place-cart">
        {success ? (
            <h2>Success</h2>
        ) : (
            <form className="cart-form">
                <h2>Edit your order</h2>
                {cart.map((item, i) => (
                    <div className="item-option" key={i}>
                        <label htmlFor={item.id} className="item-name">{item.name}</label>
                        <input type="number" min={0} id={item.id} value={item.qty} onChange={(e) => handleChange(item, parseInt(e.target.value))} className="total-item" />
                        <p>price: Rp{item.price*item.qty}</p>
                        <button type="button" className="clear-item" onClick={() => handleClear(item)}>Clear</button>
                    </div>
                ))}
                <div className="submit-cart">
                    <p>Total Item: { totalItems }</p>
                    <p>Total Price: Rp{ totalPrice }</p>
                    <button type="button" onClick={() => handleSubmit()} className="submit-cart-button">Place Order</button>
                </div>
            </form>
        )}
    </main>
  )
}

export default PlaceCart