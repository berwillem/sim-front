import "./AdminMiniCard.css";

const AdminMiniCard = ({ icon, title, stat }) => {
  return (
    <>
      <div className="mini-card">
        <div className="icon-container">{icon}</div>
        <h2>{title}</h2>
        <p>{stat}</p>
      </div>
    </>
  );
};

export default AdminMiniCard;
