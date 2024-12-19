import { Route, Routes } from "react-router";
import Home from "../Home/Home";
import Login from "../Login/Login";

export default function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}
