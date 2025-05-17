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
import SocialFeed from "../SocialFeed/SocialFeed";
import PostComments from "../PostComments/PostComments";
import ReviewComments from "../ReviewComments/ReviewComments";
import Chat from "../Chat/Chat";
import Groups from "../Groups/Groups";
import GroupInfo from "../GroupInfo/GroupInfo";
import DiscussionPostComments from "../DiscussionPostComments/DiscussionPostComments";
import GroupTopicPosts from "../GroupTopicPosts/GroupTopicPosts";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";
import Payment from "../Payment/Payment";
import OrderHistory from "../OrderHistory/OrderHistory";
import EBooks from "../EBooks/EBooks";
import ReadEBook from "../ReadEBook/ReadEBook";
import Profiles from "../Profiles/Profiles";

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
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:groupId" element={<GroupInfo />} />
        <Route
          path="/groups/:groupId/topics/:topicId"
          element={<GroupTopicPosts />}
        />
        <Route
          path="/groups/:groupId/topic/:topicId/:postId"
          element={<DiscussionPostComments />}
        />
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
          <Route path="/community/:reviewId" element={<ReviewComments />} />
          <Route path="/social-feed" element={<SocialFeed />} />
          <Route path="/social-feed/:postId" element={<PostComments />} />
          <Route path="/wishlist/:userId" element={<Wishlist />} />
          <Route path="/cart/:userId" element={<Cart />} />
          <Route path="/payment/:userId" element={<Payment />} />
          <Route path="/orders/:userId" element={<OrderHistory />} />
          <Route path="/ebooks/:userId" element={<EBooks />} />
          <Route path="/ebook-read/:bookId" element={<ReadEBook />} />
          <Route path="/profile/:profileId" element={<Profiles />} />
        </Route>
      </Routes>
    </main>
  );
}
