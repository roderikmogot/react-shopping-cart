import { useState, useEffect } from "react";
import { selectCart } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
  decrementFromCart,
} from "../redux/cartSlice";

import { SHOP_ITEMS } from "../constants/items";

import axios from "axios";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Item from "../components/Item";

interface ShoppingCartItem {
  id: string;
  createdAt: string;
  item: string;
}

function App() {
  const [loading, setLoading] = useState(true);
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
    const result = await axios.post("api/addCart", {
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
      const result = await axios.get("api/showCart");
      if (result.status === 200) {
        setShoppingCart(result.data);
        setLoading(false);
      } else {
        toast.error("Failed to fetch checkout carts!");
      }
    };
    recentlyPlacedCart();
  }, []);

  const timeFormatter = (time: string) => {
    return moment(time).format("DD/MM/YYYY hh:mm:ss");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 mt-4">
      <div className="grid grid-cols-3 gap-4">
        {SHOP_ITEMS.map((item, index) => (
          <Item
            key={index}
            name={item.name}
            price={item.price}
            id={item.id}
            image={item.image}
            addItemHandler={addItemHandler}
          />
        ))}
      </div>

      <div className="flex flex-col gap-4">
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

        {cart && cart.length > 0 && (
          <button className="green-button" onClick={() => checkout()}>
            Checkout
          </button>
        )}
      </div>

      <div>
        <span className="text-2xl">Recent 20 Placed Carts</span>
        {loading && <div>Loading...</div>}
        <div className="grid grid-cols-2 gap-4">
          {shoppingCart &&
            shoppingCart.length > 0 &&
            shoppingCart.slice().splice(0, 20).map((item: ShoppingCartItem, index) => (
              <div key={item.id}>
                <div className="font-bold">
                  Created at: {timeFormatter(item.createdAt)}
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {JSON.parse(item.item).map((item: any, index: number) => (
                    <div key={index}>
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                      <div>{item.quantity}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
