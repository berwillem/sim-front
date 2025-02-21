import { IoArrowForward } from "react-icons/io5";
import "./ValidationPage.css";
import { useNavigate } from "react-router-dom";
export default function ValidationPage() {
  const navigate = useNavigate();
  return (
    <main className="wait-page">
      <h2>
        Your account is awaiting validation and a message <br /> will be sent to
        you as soon as possible.
      </h2>
      <div className="buttons">
        <button onClick={() => navigate("/contact")}>
          Contact support team
        </button>
        <button type="button" onClick={() => navigate("/")}>
          <span>Continue</span>
          <IoArrowForward />
        </button>
      </div>
    </main>
  );
}
