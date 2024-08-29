import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import { DeleteContact, getContact } from "../../services/contactservices";
import Swal from "sweetalert2";
import { Pagination } from "@mui/material";

export default function StickyHeadTable() {
  const columns = [
    { id: "name", label: "Name", minWidth: 120 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "phonenumber", label: "Phone", minWidth: 100 },
    { id: "need", label: "Need", minWidth: 100 },
    { id: "field", label: "Field", minWidth: 170, align: "left" },
    { id: "message", label: "Message", minWidth: 170, align: "left" },
    { id: "action", label: "Action", minWidth: 170, align: "right" },
  ];

  const [totalPages, setTotalPages] = useState(1);
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getContact(page)
      .then((res) => {
        setContacts(res.data.Contacts);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
      });
  }, [page]);
  console.log(page, "paaaaaaaa");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteContact(id)
          .then(() => {
            Swal.fire("Deleted!", "Your contact has been deleted.", "success");
            setContacts(contacts.filter((contact) => contact._id !== id));
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          });
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "none" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={contact._id}>
                {columns.map((column) => {
                  const value =
                    column.id === "action" ? (
                      <button
                        onClick={() => handleDelete(contact._id)}
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        Delete
                      </button>
                    ) : (
                      contact[column.id]
                    );
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={totalPages} // Assuming 10 rows per page for total count
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      /> */}
      <div
        style={{ display: "flex", justifyContent: "center", padding: "10px" }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </Paper>
  );
}
