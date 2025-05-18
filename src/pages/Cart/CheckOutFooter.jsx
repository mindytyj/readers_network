import { useAtomValue } from "jotai";
import { useNavigate } from "react-router";
import { userAtom } from "../../handlers/userAtom";

export default function CheckOutFooter({ totalCartItems, cartTotal }) {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();

  return (
    <footer className="sticky-bottom bg-primary-subtle rounded">
      <div className="container-fluid">
        <div className="d-flex justify-content-end">
          <h5 className="navbar-brand mt-2">Total ${cartTotal}</h5>
        </div>
        <div className="d-flex justify-content-end">
          {user ? (
            <button
              className="btn btn-primary btn-sm mb-2"
              onClick={() => navigate(`/payment/${user.id}`)}
            >
              Check Out ({totalCartItems})
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm mb-2"
              onClick={() => navigate("/login")}
            >
              Check Out ({totalCartItems})
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
