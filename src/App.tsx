import { useState, useEffect } from "react";
import { selectCart } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  decrementFromCart,
} from "./redux/cartSlice";
import { SHOP_ITEMS } from "./constants/items";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const addItemHandler = (item: any) => {
    dispatch(addToCart(item));
  };

  const decrementItemHandler = (item: any) => {
    dispatch(decrementFromCart(item));
  };

  const removeFromCartHandler = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const checkout = async () => {
    const result = await axios.post("http://localhost:3030/api/addCart", {
      cart: cart,
    });
    if (result.status === 200) {
      toast.success("Checkout placed successfully!");
      clearCartHandler();
    } else {
      toast.error("Checkout failed!");
    }
  };

  useEffect(() => {
    const recentlyPlacedCart = async () => {
      const result = await axios.get("http://localhost:3030/api/showCart");
      if (result.status === 200) {
        setShoppingCart(result.data);
      } else {
        toast.error("Failed to fetch checkout carts!");
      }
    };
    recentlyPlacedCart();
  }, [cart]);

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
              className="warning-button"
              onClick={() => decrementItemHandler(item)}
            >
              -
            </button>
            <button
              className="button"
              onClick={() => removeFromCartHandler(item)}
            >
              X
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

      {cart && cart.length > 0 && <button onClick={() => checkout()}>Checkout</button>}

      {shoppingCart && shoppingCart.length > 0 && <pre className="whitespace-pre-wrap">{JSON.stringify(shoppingCart)}</pre>}

      <Toaster />
    </div>
  );
}

export default App;
