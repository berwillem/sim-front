import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Swiper from "../components/Swiper/Swiper";

export default function MainLayout() {
  return (
    <>
      <Navbar /> <Swiper></Swiper>
      <Outlet></Outlet>
    </>
  );
}
