import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

type HeaderPropsType = {
    setIsAuth: Dispatch<SetStateAction<boolean>>
}

const Header = ({ setIsAuth }: HeaderPropsType) => {
  const { totalItems, totalPrice } = useCart();
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLoginLogout = () => {
    if (auth.roles === 'guest') {
        setIsAuth(true);
    } else {
        logout();
    }
  }

  return (
    <div className="header">
        <header>
            <h2 className="logo">Eatme Co</h2>
            <div className="order-info">
                <ul className="cart-info">
                    <li>Total Items: { totalItems }</li>
                    <li>Total Price: Rp{ totalPrice }</li>
                </ul>
                <NavLink to="/place-cart" className="view-cart-button">View Cart</NavLink>
            </div>
        </header>
        <nav>
            <div className="user-info">
                <div className="profile-pic"></div>
                <p className="user-name">{auth.user_name}</p>
                <button onClick={() => handleLoginLogout()} className="logout-button">{auth.roles === 'guest' ? "Sign In" : "Logout"}</button>
            </div>
            <ul className="nav-link">
                <NavLink to="/" className="nav-item">Home</NavLink>
                { auth.roles === 'admin' && (
                    <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Header