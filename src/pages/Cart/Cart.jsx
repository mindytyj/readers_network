import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import CartItem from "./CartItem";
import CheckOutFooter from "./CheckOutFooter";

export default function Cart() {
  const user = useAtomValue(userAtom);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [cartUpdate, setCartUpdate] = useState(false);

  useEffect(() => {
    async function getCart() {
      try {
        const books = await requestHandler(`/api/carts/${user.id}`, "GET");

        let cartTotal = 0;

        if (books.length > 0) {
          books.map((book) => (cartTotal += parseFloat(book.rental_price)));
        }

        setCart(books);
        setCartTotal(cartTotal);
      } catch {
        console.error("Failed to retrieve cart items.");
      }
    }
    getCart();
  }, [cartUpdate]);

  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>My Cart</h4>
      </div>
      <div className="container">
        <div className="list-group mt-3 mb-3 rounded-0">
          {cart?.length > 0 ? (
            cart.map((book) => {
              return (
                <div key={book?.id}>
                  <CartItem book={book} setCartUpdate={setCartUpdate} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">Cart is empty.</h6>
            </div>
          )}
        </div>
      </div>
      <CheckOutFooter totalCartItems={cart.length} cartTotal={cartTotal} />
    </div>
  );
}
