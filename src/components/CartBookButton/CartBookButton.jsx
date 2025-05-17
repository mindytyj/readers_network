import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function CartBookButton({ bookId }) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [cartStatus, setCartStatus] = useState([]);
  const [access, setAccess] = useState([]);

  useEffect(() => {
    async function getCartStatus() {
      if (!user) {
        return;
      }

      try {
        const status = await requestHandler(
          `/api/carts/${bookId}/${user?.id}`,
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
    async function geteBookAccess() {
      if (!user) {
        return;
      }

      try {
        const eBookAccess = await requestHandler(
          `/api/ebooks/${bookId}/access/${user?.id}`,
          "GET"
        );

        setAccess(eBookAccess);
      } catch (error) {
        console.error("Unable to get user's ebook access.");
      }
    }
    geteBookAccess();
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
      access > 0 ? (
        <Link
          className="text-decoration-none text-dark"
          to={`/ebook-read/${bookId}`}
        >
          <i className="bi bi-book-fill text-primary"></i>
        </Link>
      ) : (
        <Link
          className="text-decoration-none text-dark"
          to={`/cart/${user.id}`}
        >
          <i className="bi bi-cart-check-fill text-primary"></i>
        </Link>
      )
    ) : access > 0 ? (
      <Link
        className="text-decoration-none text-dark"
        to={`/ebook-read/${bookId}`}
      >
        <i className="bi bi-book-fill text-primary"></i>
      </Link>
    ) : (
      <Link className="text-decoration-none text-dark" onClick={addToCart}>
        <i className="bi bi-cart-plus-fill text-primary"></i>
      </Link>
    )
  ) : (
    <Link className="text-decoration-none text-dark" to={"/login"}>
      <i className="bi bi-cart-plus-fill text-primary"></i>
    </Link>
  );
}
