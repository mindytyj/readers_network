import { useAtomValue } from "jotai";
import { Link } from "react-router";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";

export default function RemoveCartItemButton({ bookId, setCartUpdate }) {
  const user = useAtomValue(userAtom);

  async function removeBookFromCart() {
    try {
      setCartUpdate(false);

      await requestHandler(`/api/carts/${user.id}/remove/${bookId}`, "DELETE");

      setCartUpdate(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <Link>
      <i
        className="bi bi-cart-dash-fill text-danger"
        onClick={removeBookFromCart}
      ></i>
    </Link>
  );
}
