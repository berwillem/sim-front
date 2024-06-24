import "./AdminNewsletter.css";
import { getAllNewsletters } from "../../services/Newsletterservices";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import AdminMiniCard from "../../components/AdminMiniCard/AdminMiniCard";
import { FaUsers } from "react-icons/fa6";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

moment.locale("fr"); // Set moment to use French locale

export default function AdminNewsletter() {
  const [page, setPage] = useState(1);
  const [newsletters, setNewsletters] = useState([]);
  const [allNewsletters, setAllNewsletters] = useState([]); // New state to store all newsletters

  useEffect(() => {
    fetchAllNewsletters();
  }, []);

  const [totalPages, setTotalPages] = useState(1);

  const fetchAllNewsletters = async () => {
    try {
      const response = await getAllNewsletters(1);
      const total = response.data.totalPages;
      const allFetchedNewsletters = [];
      for (let i = 1; i <= total; i++) {
        const pageResponse = await getAllNewsletters(i);
        allFetchedNewsletters.push(...pageResponse.data.newsletters);
      }
      setAllNewsletters(allFetchedNewsletters);
      setTotalPages(total);
      setPage(1);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    }
  };

  useEffect(() => {
    // Update displayed newsletters when page changes
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    setNewsletters(allNewsletters.slice(startIndex, endIndex));
  }, [page, allNewsletters]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDownloadAll = () => {
    const emails = allNewsletters
      .map((newsletter) => newsletter.email)
      .join("\n");
    const element = document.createElement("a");
    const file = new Blob([emails], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "all_newsletter_emails.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="admin-stat">
      <div className="mini-cards">
        <AdminMiniCard
          icon={<FaUsers />}
          title={"All Emails registered"}
          stat={allNewsletters.length}
        />

        <div className="foraddbutton">
          <button type="button" className="button" onClick={handleDownloadAll}>
            <h1 className="button__text" id="downloadbuttontext">
              Download All Emails
            </h1>
            <span className="button__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                stroke="currentColor"
                height="24"
                fill="none"
                className="svg"
              >
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="table-stat">
        <div className="titre-stat">
          <ul className="ligne">
            <div className="info-stat newsletterli">
              <li>email</li>
            </div>
            <li>joined at</li>
          </ul>
        </div>
        {newsletters.map((newsletter) => (
          <ul className="stores" id="storesnews" key={newsletter._id}>
            <h1>{newsletter.email}</h1>
            <h1>{moment(newsletter.createdAt).format("DD MMM YYYY")}</h1>
            {console.log(newsletter)}
          </ul>
        ))}
      </div>
      <Pagination count={totalPages} page={page} onChange={handlePageChange} />
    </div>
  );
}
