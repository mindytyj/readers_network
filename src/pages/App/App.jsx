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

export default function App() {
  const user = useAtomValue(userAtom);

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Auth user={user} />}>
          <Route path="/account/:userId" element={<Account />} />
          <Route
            path="account/:userId/update-profile"
            element={<AccountUpdate userState={user} />}
          />
        </Route>
      </Routes>
    </main>
  );
}
