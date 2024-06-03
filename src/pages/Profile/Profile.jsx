import SideCard from "../../components/SideCard/SideCard";
import UserCard from "../../components/UserCard/UserCard";
import "./Profile.css";
import { IoHomeSharp } from "react-icons/io5";

export default function Profile() {
  const labels = [{ name: "home", link: "/", icon: <IoHomeSharp /> }];
  return (
    <div className="userprofile">
      <SideCard Labels={labels}></SideCard>
      <UserCard></UserCard>
    </div>
  );
}
