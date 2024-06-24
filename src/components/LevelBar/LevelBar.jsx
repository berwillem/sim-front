import "./LevelBar.css";
const LevelBar = ({ level }) => {
  return (
    <>
      <div className="level-bar">
        <progress value={30} max={100}></progress>
      </div>
    </>
  );
};

export default LevelBar;
