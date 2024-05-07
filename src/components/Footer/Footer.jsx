import "./Footer.css";
import image from "../../assets/logo.png";
export default function Component() {
  return (
    <footer>
      <div className="footercontainer">
        <div className="footerfirstsection">
          <div className="iconfooter">
            <img src={image} alt="maxshine logo" />
          </div>
          <p>
            Maxshine is a professional company that specializes in the
            development of long-throw dual-action polishers and other detailing
            tools.
          </p>
          <div className="foooterfirts-button">
            <button className="">Maxshine USA</button>
            <button className="">Maxshine Distributor</button>
          </div>
        </div>
        <div className="footeraboutsection">
          <h3 className="">About Maxshine</h3>
          <ul className="">
            <li>
              <ChevronRightIcon className="" />
              Our Company
            </li>
            <li>
              <ChevronRightIcon className="" />
              Products
            </li>
            <li>
              <ChevronRightIcon className="" />
              News
            </li>
            <li>
              <ChevronRightIcon className="" />
              Warranty Reg.
            </li>
            <li>
              <ChevronRightIcon className="" />
              Download Catalog
            </li>
          </ul>
        </div>
        <div className="footerblogrollsection">
          <h3 className="">Blogroll</h3>
          <ul className="">
            <li>
              <ChevronRightIcon className="" />
              Maxshine Polisher
            </li>
            <li>
              <ChevronRightIcon className="" />
              Maxshine Private Label
            </li>
            <li>
              <ChevronRightIcon className="" />
              Pro Car Dryer
            </li>
            <li>
              <ChevronRightIcon className="" />
              MaxClean Brush
            </li>
            <li>
              <ChevronRightIcon className="" />
              Pro Clay Bar
            </li>
            <li>
              <ChevronRightIcon className="" />
              Pro Foam Lance
            </li>
          </ul>
        </div>
        <div className="footercontactsection">
          <h3 className="">Talk with our support</h3>
          <ul className="">
            <li>+86 553 499 6266</li>
            <li>+86 553 393 2199</li>
            <li>sales@maxshine.cn</li>
            <li>Monday - Friday, 9AM - 6PM,UTC+8</li>
          </ul>
        </div>
      </div>
      <div className="footercopyright">
        <p>Copyright © 2024 SYM INDUSTRIE. All rights reserved.</p>
      </div>
    </footer>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
