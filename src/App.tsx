import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import HomeSon from "./pages/Home/HomeSon";
import User from "./pages/User";
import Paper from "./pages/Paper";
import Manage from "./pages/Paper/Manage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<HomeSon />} />
          <Route path="user" element={<User />} />
          <Route path="paper">
            <Route index path="list" element={<Paper />} />
            <Route index path="manage" element={<Manage />} />
            <Route index path="check" element={<Paper />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
