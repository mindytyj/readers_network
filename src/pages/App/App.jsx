import { Route, Routes } from "react-router";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Registration from "../Registration/Registration";

export default function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </main>
  );
}
