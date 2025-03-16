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
import SocialFeed from "../SocialFeed/SocialFeed";
import PostComments from "../PostComments/PostComments";
import ReviewComments from "../ReviewComments/ReviewComments";
import Chat from "../Chat/Chat";

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
          <Route path="/account/:userId/chat/:friendId" element={<Chat />} />
          <Route path="/books/:bookId/review/add" element={<AddUserReview />} />
          <Route
            path="/books/:bookId/review/edit"
            element={<EditUserReview />}
          />
          <Route path="/community/:reviewId" element={<ReviewComments />} />
          <Route path="/social-feed" element={<SocialFeed />} />
          <Route path="/social-feed/:postId" element={<PostComments />} />
        </Route>
      </Routes>
    </main>
  );
}
