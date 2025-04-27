import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function WishlistBookButton({ bookId }) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState([]);

  useEffect(() => {
    async function getWishlistStatus() {
      if (!user) {
        return;
      }

      try {
        const status = await requestHandler(
          `/api/wishlists/${bookId}/${user.id}`,
          "GET"
        );

        setWishlistStatus(status);
      } catch (error) {
        console.error("Unable to get user's book wishlist status.");
      }
    }
    getWishlistStatus();
  }, []);

  async function addToWishlist() {
    try {
      await requestHandler(`/api/wishlists/${user?.id}/add/${bookId}`, "POST");

      navigate(`/wishlist/${user?.id}`);
    } catch (error) {
      console.error(error.message);
      navigate(`/wishlist/${user?.id}`);
    }
  }

  return user ? (
    wishlistStatus > 0 ? (
      <Link
        className="text-decoration-none text-dark"
        to={`/wishlist/${user.id}`}
      >
        <i className="bi bi-bookmark-check-fill text-danger pe-2"></i>
      </Link>
    ) : (
      <Link className="text-decoration-none text-dark" onClick={addToWishlist}>
        <i className="bi bi-bookmark-heart-fill text-danger pe-2"></i>
      </Link>
    )
  ) : (
    <Link className="text-decoration-none text-dark" to={"/login"}>
      <i className="bi bi-bookmark-heart-fill text-danger pe-2"></i>
    </Link>
  );
}
