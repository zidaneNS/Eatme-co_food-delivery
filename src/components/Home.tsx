import { Dispatch, SetStateAction } from "react";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { ProductType } from "../context/ProductsProvider";

type HomePropsType = {
  setIsAuth: Dispatch<SetStateAction<boolean>>
}

const Home = ({ setIsAuth }: HomePropsType) => {
  const { products } = useProducts();
  const { auth } = useAuth();
  const { dispatch, REDUCER_ACTIONS } = useCart();

  const addItem = (product: ProductType): void => {
    if (auth.roles === 'guest') {
      setIsAuth(true);
    } else {
      dispatch({ type: REDUCER_ACTIONS.ADD, payload: { id: product.id, name: product.name, price: product.price, qty: 1 } });
    }
  }
  return (
    <main className="home">
      <h2>Please Order</h2>
      <section className="display-menu">
        {products.map((product, i) => (
          <div className="card" key={i}>
            <div className="card-header">
              <h3>{product.name}</h3>
              <p>Rp{product.price}</p>
            </div>
            <div className="card-body">
              <p className="card-decs">{product.description}</p>
              <button onClick={() => addItem(product)} className="order-button">Add to cart</button>
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}

export default Home