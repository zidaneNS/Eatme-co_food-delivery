import useProducts from "../hooks/useProducts"
import useCart from "../hooks/useCart"
import { ProductType } from "../context/ProductsProvider"

const Home = () => {
  const { products } = useProducts()
  const { dispatch, REDUCER_ACTIONS } = useCart()

  const addItem = (product: ProductType): void => dispatch({ type: REDUCER_ACTIONS.ADD, payload: { id: product.id, name: product.name, price: product.price, qty: 1 } })
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