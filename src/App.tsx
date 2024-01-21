import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import HomeSon from "./pages/Home/HomeSon";
import User from "./pages/User";
import Paper from "./pages/Paper";
import Check from "./pages/Paper/Check";
import IndexPg from "./pages/IndexPg";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<HomeSon />} />
          <Route index path="indexPg" element={<IndexPg />} />
          <Route path="user" element={<User />} />
          <Route path="paper">
            <Route index path="list" element={<Paper />} />
            <Route path="check" element={<Check />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
