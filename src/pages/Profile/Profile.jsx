import { Helmet } from "react-helmet";
import UserCard from "../../components/UserCard/UserCard";
import "./Profile.css";

export default function Profile() {
  return (
    <>
        <Helmet>
            <title>Profil</title>
        </Helmet>
      <div className="userprofile">
        <UserCard></UserCard>
      </div>
    </>
  );
}
