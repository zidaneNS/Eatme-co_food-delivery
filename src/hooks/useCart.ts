import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UseCartContextType } from "../context/CartProvider";

const useCart = (): UseCartContextType => useContext(CartContext)

export default useCart