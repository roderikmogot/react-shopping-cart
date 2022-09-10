import { selectCart } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, removeFromCart } from "./redux/cartSlice";
import { SHOP_ITEMS } from "./constants/items";

function App() {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const addItemHandler = (item: any) => {
    dispatch(addToCart(item));
  };

  const removeFromCartHandler = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="grid grid-cols-3 gap-4">
        {SHOP_ITEMS.map((item) => (
          <div
            className="cursor-pointer"
            key={item.id}
            onClick={() => addItemHandler(item)}
          >
            <div>{item.name}</div>
            <div>{item.price}</div>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {cart.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.quantity}</div>
            <button
              className="button"
              onClick={() => removeFromCartHandler(item)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart && cart.length > 0 && (
        <button className="delete-button" onClick={clearCartHandler}>
          Clear Cart
        </button>
      )}

      {cart && cart.length > 0 && <div>Total Amount: {total}</div>}
    </div>
  );
}

export default App;
