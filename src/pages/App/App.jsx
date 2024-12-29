import { Route, Routes } from "react-router";
import { useAtomValue } from "jotai";
import { userAtom } from "../../handlers/userAtom";
import NavBar from "../../components/NavBar/NavBar";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";
import Auth from "../Auth/Auth";
import Account from "../Account/Account";
import AccountUpdate from "../Account/AccountUpdate";
import AddReadingTracker from "../AddReadingTracker/AddReadingTracker";
import Books from "../Books/Books";
import BookInfo from "../BookInfo/BookInfo";
import AddUserReview from "../BookReviews/AddUserReview";
import EditUserReview from "../BookReviews/EditUserReview";

export default function App() {
  const user = useAtomValue(userAtom);

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:bookId" element={<BookInfo />} />
        <Route element={<Auth user={user} />}>
          <Route path="/account/:userId" element={<Account />} />
          <Route
            path="account/:userId/update-profile"
            element={<AccountUpdate userState={user} />}
          />
          <Route
            path="/account/:userId/reading-tracker/:type/add"
            element={<AddReadingTracker />}
          />
          <Route path="/books/:bookId/review/add" element={<AddUserReview />} />
          <Route
            path="/books/:bookId/review/edit"
            element={<EditUserReview />}
          />
        </Route>
      </Routes>
    </main>
  );
}
