import "./Contact.css";
import { CiMail } from "react-icons/ci";
import Navbar from "../../components/Navbar/Navbar";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="contactuscarre">
          <h1>Contact us</h1>
          <h2>Get in touch</h2>
          <h2>Enter Your Email Below </h2>

          <div className="forinput" id="forinputsmall">
            <input
              type="text"
              name="email"
              id=""
              placeholder="Enter Your Email"
              className="inputcontact"
            />
            <CiMail size={25} style={{ marginRight: "10px" }} />
          </div>
          <div className="forinput">
            <textarea
              type="text"
              name="email"
              id="inputcontactbig"
              placeholder="Enter Your message"
              className="inputcontact"
            />
          </div>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
