import "./LevelBar.css";
import bronze from "../../assets/medaille.png";
import silver from "../../assets/badge.png";
import gold from "../../assets/coupe-dor.png";
import diamond from "../../assets/diamant.png";

const LevelBar = ({ level }) => {
  const calculateProgress = (points) => {
    if (points <= 100) {
      // Bronze level (0-100): First 33% of the bar
      return points / 300; // 100 is 1/3 of the total
    } else if (points <= 500) {
      // Silver level (100-500): Second 33% of the bar
      return 1 / 3 + (points - 100) / 1200; // 100-500 maps to 33%-66%
    } else if (points <= 1000) {
      // Gold level (500-1000): Final 33% of the bar
      return 2 / 3 + (points - 500) / 1500; // 500-1000 maps to 66%-100%
    } else {
      // Diamond level (above 1000): Full bar
      return 1;
    }
  };

  const progressValue = calculateProgress(level?.points);

  return (
    <div className="level-bar">
      <img className="bronze1" src={bronze} alt="Bronze level" />
      <img className="silver1" src={silver} alt="Silver level" />
      <img className="gold1" src={gold} alt="Gold level" />
      <img className="diamond1" src={diamond} alt="Diamond level" />

      <progress
        className={level?.name}
        value={progressValue}
        max={1}
        style={{ background: "bleu" }}
      ></progress>

      <p className="bronze1">0</p>
      <p className="silver1">100</p>
      <p className="gold1">500</p>
      <p className="diamond1">1000</p>
    </div>
  );
};

export default LevelBar;
