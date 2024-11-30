import { NavLink } from "react-router-dom"
import useCart from "../hooks/useCart"

const Header = () => {
  const { totalItems, totalPrice } = useCart()

  return (
    <div className="header">
        <header>
            <NavLink to="/place-cart" className="view-cart-button">View Cart</NavLink>
            <ul className="cart-info">
                <li>Total Items: { totalItems }</li>
                <li>Total Price: Rp{ totalPrice }</li>
            </ul>
        </header>
        <nav>
            <h2 className="logo">Eatme Co</h2>
            <ul className="nav-link">
                <NavLink to="/" className="nav-item">Home</NavLink>
                <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
            </ul>
        </nav>
    </div>
  )
}

export default Header