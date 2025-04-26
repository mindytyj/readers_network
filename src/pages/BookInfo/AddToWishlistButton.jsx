import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import requestHandler from "../../handlers/request-handler";
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function AddToWishlistButton() {
  const { bookId } = useParams();
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
      <div>
        <Link
          className="text-decoration-none text-dark"
          to={`/wishlist/${user.id}`}
        >
          <p>
            <i className="bi bi-bookmark-check-fill text-danger"></i> In
            Wishlist
          </p>
        </Link>
      </div>
    ) : (
      <div>
        <Link
          className="text-decoration-none text-dark"
          onClick={addToWishlist}
        >
          <p>
            <i className="bi bi-bookmark-heart-fill text-danger"></i> Add to
            Wishlist
          </p>
        </Link>
      </div>
    )
  ) : (
    <div>
      <Link className="text-decoration-none text-dark" to={"/login"}>
        <p>
          <i className="bi bi-bookmark-heart-fill text-danger"></i> Add to
          Wishlist
        </p>
      </Link>
    </div>
  );
}
