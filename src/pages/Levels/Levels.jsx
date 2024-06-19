import "./Levels.css";
import bronze from "../../assets/medaille.png";
import silver from "../../assets/badge.png";
import gold from "../../assets/coupe-dor.png";
import diamond from "../../assets/diamant.png";
import { useState } from "react";
import { useEffect } from "react";
import { getUserLevelInfos } from "../../services/usersServices";
import { useParams } from "react-router-dom";

const Levels = () => {
  const [levelData, setLeveldata] = useState();
  const { userId } = useParams();
  useEffect(() => {
    getUserLevelInfos(userId)
      .then((res) => setLeveldata(res.data.level))
      .catch(console.log("error"));
  }, []);
  return (
    <>
      <div className="levels">
        <div className="level-explain">
          <div className="level" data-hover-text="réduction 1%">
            <h1>Bronze</h1>
            <img src={bronze} alt="" />
          </div>

          <div className="level" data-hover-text="réduction 3%">
            <h1>Silver</h1>
            <img src={silver} alt="" />
          </div>
          <div className="level" data-hover-text="réduction 5%">
            <h1>Gold</h1>
            <img src={gold} alt="" />
          </div>
          <div className="level" data-hover-text="réduction 8%">
            <h1>Diamond</h1>
            <img src={diamond} alt="" />
          </div>
          <div className="progress-bar"></div>
        </div>
      </div>
    </>
  );
};

export default Levels;
