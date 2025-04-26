import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import requestHandler from "../../handlers/request-handler";
import { userAtom } from "../../handlers/userAtom";
import WishlistItem from "./WishlistItem";

export default function Wishlist() {
  const user = useAtomValue(userAtom);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistUpdate, setWishlistUpdate] = useState(false);

  useEffect(() => {
    async function getWishlist() {
      try {
        const books = await requestHandler(`/api/wishlists/${user.id}`, "GET");

        setWishlist(books);
      } catch {
        console.error("Failed to retrieve wishlist.");
      }
    }
    getWishlist();
  }, [wishlistUpdate]);

  return (
    <div className="container mt-4 mb-4">
      <div className="mb-4">
        <h4>My Wishlist</h4>
      </div>
      <div className="container border border-primary rounded">
        <div className="list-group mt-3 mb-3 overflow-y-auto groupsContainer rounded-0">
          {wishlist?.length > 0 ? (
            wishlist.map((book) => {
              return (
                <div key={book?.id}>
                  <WishlistItem
                    book={book}
                    setWishlistUpdate={setWishlistUpdate}
                  />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center mt-2">
              <h6 className="">Wishlist is empty.</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
