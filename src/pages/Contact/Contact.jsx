import { useState } from "react";
import "./Contact.css";
import { CiMail } from "react-icons/ci";
import Navbar from "../../components/Navbar/Navbar";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import cover from "../../assets/csm_Menzerna_building_1620x250_13dedd488c.webp"
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
        <Helmet>
            <title>Contact</title>
         
        </Helmet>
      <Navbar />
      <div className="maincontact" id="maincontact1">
        <div className="cover">
          <img src={cover} alt="" />
        </div>
        <div className="ALL">
        <div className="titles">
          <h4>HOW CAN WE HELP YOU?</h4>
          <h2>Contact</h2>
          <p>Do you have a question for us? We have compiled the most frequently asked questions and answers for you.
          If you have additional questions or suggestions, please feel free to contact us. We will respond as quickly as possible.</p>
        </div>
        <div className="infos">
          <div className="info1">
            <h4>How to find us</h4>
          <div className="adress">
          <span>menzerna polishing compounds</span>
            <span>GmbH & Co. KG</span>
            <span>Industriestraße 25</span>
            <span>76470 Birtoutq</span>
            <span>Algeria</span>
          </div>
            <button>Call now</button>
            <button>Calculate Route</button>
          </div>
          <div className="map">       <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3201.0070507539035!2d3.0103239999999998!3d36.650281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDM5JzAxLjAiTiAzwrAwMCczNy4yIkU!5e0!3m2!1sfr!2sdz!4v1717162530808!5m2!1sfr!2sdz"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe></div>
        </div>
        <div className="contactuscarre">
       <div className="titleContact">
       <h1>Contact us</h1>
       </div>
        <div className="checkBox">
          <ul>
          <li className="checkTitle">Your field of activity</li>
     <li><input type="checkbox" name="" id="" color="red" /><label htmlFor="">industreal company</label></li>
     <li><input type="checkbox" name="" id="" /><label htmlFor="">Delear</label></li>
     <li><input type="checkbox" name="" id="" /><label htmlFor="">Delear company</label></li>
     <li><input type="checkbox" name="" id="" /><label htmlFor="">Other</label></li>
          
          </ul>
          <ul>
            <li className="checkTitle" >You want
            </li>
            <li><input type="checkbox" name="" id="" /><label htmlFor="">Delear</label></li>
     <li><input type="checkbox" name="" id="" /><label htmlFor="">Delear company</label></li>
     <li><input type="checkbox" name="" id="" /><label htmlFor="">Other</label></li>
          </ul>
        </div>

          <form onSubmit={handleSubmit}>
            <div className="forinput" id="forinputsmall">
          <div className="inputText">
            <label htmlFor="">Name*</label>
          <input
                type="name"
                name="name"
                placeholder="Enter Your Name"
               
               
              
                required
              />
          </div>
          <div className="inputText">
            <label htmlFor="">Company name</label>
          <input
                type="Company name"
                name="Company name"
                placeholder="Enter Your Company name"
               
             
                required
              />
          </div>
          <div className="inputText">
            <label htmlFor="">Email*</label>
          <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
               
                value={email}
                onChange={handleEmailChange}
                required
              />
          </div>
          <div className="inputText">
            <label htmlFor="">Country*</label>
         <select name="" id="" placeholder="Country">

      
          <option value="">Algeria</option>
         </select>
          </div>
            
            </div>
            <div className="message">
           <div className="inputText">
            <label htmlFor="">Message</label>
            <textarea
                name="message"
                id="inputcontactbig"
                placeholder="Enter Your message"
               
                value={message}
                onChange={handleMessageChange}
                required
              />
           </div>
            </div>
            <div className="checkBox condition">
            <input type="checkbox" name="" id="" /><label htmlFor="">
				Yes, I agree to Sym storing and processing my data to handle my inquiry and to contact me. You can find more information and revocation instructions in our privacy policy.
				</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
       
        </div>
       
    </div>
  );
};

export default Contact;
