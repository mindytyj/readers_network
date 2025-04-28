import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AddToCartButton() {
  const { bookId } = useParams();
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [cartStatus, setCartStatus] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    async function getCartStatus() {
      if (!user) {
        return;
      }

      try {
        const status = await requestHandler(
          `/api/carts/${bookId}/${user.id}`,
          "GET"
        );

        setCartStatus(status);
      } catch (error) {
        console.error("Unable to get user's book cart status.");
      }
    }
    getCartStatus();
  }, []);

  useEffect(() => {
    async function getOrderHistory() {
      if (!user) {
        return;
      }

      try {
        const order = await requestHandler(
          `/api/orders/${bookId}/${user.id}`,
          "GET"
        );

        setOrderHistory(order);
      } catch (error) {
        console.error("Unable to get user's order history.");
      }
    }
    getOrderHistory();
  }, []);

  async function addToCart() {
    try {
      await requestHandler(`/api/carts/${user?.id}/add/${bookId}`, "POST");

      navigate(`/cart/${user?.id}`);
    } catch (error) {
      console.error(error.message);
      navigate(`/cart/${user?.id}`);
    }
  }

  return user ? (
    cartStatus > 0 ? (
      orderHistory === 0 ? (
        <div>
          <Link
            className="text-decoration-none text-dark"
            to={`/ebook-read/${bookId}`}
          >
            <button className="btn btn-primary btn-sm">Read eBook</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link
            className="text-decoration-none text-dark"
            to={`/cart/${user.id}`}
          >
            <button className="btn btn-primary btn-sm">In Cart</button>
          </Link>
        </div>
      )
    ) : orderHistory === 0 ? (
      <div>
        <Link
          className="text-decoration-none text-dark"
          to={`/ebook-read/${bookId}`}
        >
          <button className="btn btn-primary btn-sm">Read eBook</button>
        </Link>
      </div>
    ) : (
      <div>
        <Link className="text-decoration-none text-dark" onClick={addToCart}>
          <button className="btn btn-primary btn-sm">Rent eBook</button>
        </Link>
      </div>
    )
  ) : (
    <div>
      <Link className="text-decoration-none text-dark" to={"/login"}>
        <button className="btn btn-primary btn-sm">Rent eBook</button>
      </Link>
    </div>
  );
}
