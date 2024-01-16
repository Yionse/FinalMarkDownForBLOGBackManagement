import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Data from "./pages/Paper/Data";
import Views from "./pages/Paper/Views";
import HomeSon from "./pages/Home/HomeSon";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<HomeSon />} />
          <Route path="user">
            <Route index path="list" element={<Data />} />
            <Route path="add" element={<Views />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
