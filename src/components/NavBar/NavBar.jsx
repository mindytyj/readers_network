import * as usersTokenHandlers from "../../handlers/users-token-handlers";
import { useSetAtom, useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function NavBar() {
  const user = useAtomValue(userAtom);
  const setUser = useSetAtom(userAtom);

  function handleLogout() {
    usersTokenHandlers.logout();
    setUser(null);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Readers Network
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/books">
                Books
              </a>
            </li>
            {user ? (
              <li className="nav-item">
                <a className="nav-link" href="/social-feed">
                  Social Feed
                </a>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
          <div className="collapse navbar-collapse dropstart justify-content-end">
            {user ? (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-user" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropDownMenu">
                    <li>
                      <Link
                        to={`/account/${user.id}`}
                        className="dropdown-item"
                      >
                        Account Hub
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="dropdown-item"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-address-card" />
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropDownMenu">
                    <li>
                      <Link to="/login" className="dropdown-item">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item">
                        Register Account
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
