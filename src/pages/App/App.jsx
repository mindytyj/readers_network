import { Route, Routes } from "react-router";
import Home from "../Home/Home";

export default function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  );
}
