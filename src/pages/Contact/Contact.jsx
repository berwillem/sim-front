import { useState } from "react";
import "./Contact.css";
import { CiMail } from "react-icons/ci";
import Navbar from "../../components/Navbar/Navbar";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      email,
      message,
    };

    try {
      await emailjs.send(
        "service_j9929fh",
        "template_gfgle4d",
        templateParams,
        "JwvjYGDMFmRwbSfVI"
      );
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Your message has been sent successfully!",
      });
      setEmail("");
      setMessage("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="contactuscarre">
          <h1>Contact us</h1>
          <h2>Get in touch</h2>
          <h2>Enter Your Email Below </h2>

          <form onSubmit={handleSubmit}>
            <div className="forinput" id="forinputsmall">
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="inputcontact"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <CiMail size={25} style={{ marginRight: "10px" }} />
            </div>
            <div className="forinput">
              <textarea
                name="message"
                id="inputcontactbig"
                placeholder="Enter Your message"
                className="inputcontact"
                value={message}
                onChange={handleMessageChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
