import "./LevelBar.css";
import bronze from "../../assets/medaille.png";
import silver from "../../assets/badge.png";
import gold from "../../assets/coupe-dor.png";
import diamond from "../../assets/diamant.png";

const LevelBar = ({ level }) => {
  
  const transformationLogarithmique = (valeur, valeurMax) => {
    return Math.log1p(valeur) / Math.log1p(valeurMax) ;
  };
 
  console.log(level);
  return (
    <>
      <div className="level-bar" >
        <img className="bronze1" src={bronze} alt="" />
        <img className="silver1" src={silver} alt="" />
        <img className="gold1" src={gold} alt="" />
        <img className="diamond1" src={diamond} alt="" />
        <progress className={level?.name} style={{background:"bleu"}} value={transformationLogarithmique(level?.points,1000)} max={1}></progress>
       <p className="bronze1">0 </p> 
       <p className="silver1">10 </p>
       <p className="gold1">200 </p>
       <p className="diamond1">1000 </p>
 
      </div>
    </>
  );
};

export default LevelBar;
