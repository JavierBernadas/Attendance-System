import * as React from "react";
import { useState, useEffect, setTimeOut } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import UserAPI from "../../src/api/user_api";
import Buttons from "../components/Button/Buttons";
import CreateUser from "../components/Modal/CreateUser";
import TextField from "@mui/material/TextField";
import ErrorNotif from "../components/Modal/ErrorNotif";
import { Button } from "@mui/material";
import {
  notifySuccess,
  notifyError,
} from "../components/Toastify/notifications";
import { ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
const columns = [
  { id: "firstName", label: "First Name", minWidth: 100 },
  { id: "lastName", label: "Last Name", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 10 },

  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "role",
    label: "Role",
    minWidth: 170,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "center",
  },

  // {
  //   id: "assigned",
  //   label: "Assigned",
  //   minWidth: 170,
  //   align: "right",
  // },
];

export default function Users() {
  const [user, setUser] = useState(null);
  const [countList, setCountList] = useState(0);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const storedToken = localStorage.getItem("token");
  const [createModal, setCreateModal] = useState(false);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);


  const handleChangePage = (event, new_page) => {
    console.log(" newPage : ", new_page);
    setPage(new_page);

    //just pass a emty search to navigate to another page without a  search !
    const apiPage = new_page + 1; // convert from 0 → 1
    UserData(apiPage, rowsPerPage, "");
  };

  //row page change !
  const handleChangeRowsPerPage = (event) => {
    console.log("+event.target.value : " + +event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
    //just pass a emty search to navigate to another page without a  search !
    UserData(1, event.target.value, ""); // reset to page 1
  };

  // Modal Form to Create User !
  const toggleCreateModal = () => {
    setCreateModal(true);
  };


  // Fetch Users !
  const UserData = async (page_count, count_limit, search_data) => {
    setLoading(true); // start loading temp to see loading state !

    try {

      const response = await UserAPI.GetUsers(
        storedToken,
        page_count,
        count_limit,
        search_data
      );

      console.log("response fetch users :", response);
      // check if token expired !
      if (response?.error === "Not authenticated") {
        console.log("Token expired -> redirecting...Show Modal !");
        setOpen(true);
        // return;
      }

      // ✅ Safely check if the data exists
      const users = response?.data?.users || [];
      // ✅ Update state
      setUser(users);
      setCountList(response?.data?.total || 0); // 0 if no data !

    } catch (error) {

      console.error("Failed to fetch users:", error);
      // Optional: show an error message to the user
    } finally {
      setLoading(false); // always stop loading
    }
  };




 // Generate Tem Password for User !
  const GenerateTempPassword = (length = 10) => {
    return Math.random()
      .toString(36)
      .slice(2, 2 + length);
  };

  // Crete new User ! 
  const NewCreatedUser = async (user_value) => {

    if (!user_value) {
      console.error("NewCreatedUser: No user data provided.");
      notifyError("No user data provided!");
      return;
    }

    const tempPassword = GenerateTempPassword(10);
    console.log("Generated Temporary Password: ", tempPassword);

    const payLoad = {
      firstName: user_value.firstName,
      lastName: user_value.lastName,
      age: user_value.age,
      role: user_value.role,
      email: user_value.email,
      password: tempPassword,
    };

    console.log("Prepared Payload to API:", payLoad);

    try {

      // Call API to create user
      const response = await UserAPI.CreateUser(storedToken, payLoad);
      console.log("response : ", response);

      // 1️⃣ Handle token expired
      if (response?.error === "Not authenticated") {
        setOpen(true); // show session expired modal
        return;
      }

      // 2️⃣ Handle backend validation errors
      if (!response?.success) {
        notifyError(response?.message || "Failed to create user!");
        return;
      }

      // 3️⃣ Show success toast FIRST before updating state
      notifySuccess(response?.data?.message || "User successfully created!");

      // 4️⃣ Delay before refresh
      setTimeout(() => {
        UserData(page + 1, rowsPerPage, "");
      }, 5000);

      // return API response if needed
    } catch (error) {
      console.error("Error creating user:", error);
      notifyError(error);
    }
  };

  const HandleDelete = async (user_id) => {
    try {
      const response = await UserAPI.DeleteUser(storedToken, user_id);
      // check if token expired !
      if (response?.error === "Not authenticated") {
        console.log("Token expired -> redirecting...Show Modal !");
        setOpen(true);
      }

      notifySuccess(response.userData.message);
      // Wait a bit so toast is visible before re-render
      setTimeout(() => {
        UserData(1, rowsPerPage, "");
      }, 200);
      console.log(response);
    } catch (error) {
      console.error("Error Delete user:", error);
      notifyError(error);
    }
  };


    // useEffect for the data to render this page and display !
  useEffect(() => {
    // Debounce = delay calling a function until the user stops typing. search !
    const delayDebounce = setTimeout(() => {
      setLoading(true);
      UserData(1, 10, search);
      // setRowsPerPage(10);
      // add this code to reset i ecnounter bug for this  ! working now !
      setPage(0);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[200px]">
        <CircularProgress disableShrink />
      </div>
    );

  if (!user) return <p>No user data</p>;


  return (
    <div className=" ">
      <div className="flex items-center justify-between mb-5 gap-3">
        {/* Left: Search Bar */}
        <TextField
          label="Search users..."
          placeholder="Type to search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />

        {/* Right: Button */}
        <Buttons buttonName="Invite User" onClick={toggleCreateModal} />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
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
              {user.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                user.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      let value;

                      // Handle delete button column
                      if (column.id === "action") {
                        return (
                          <TableCell key={column.id} align="center">
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => HandleDelete(row._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        );
                      }

                      if (column.id === "assigned") {
                        // commend lang sa ang assinged !
                        value = row.createdBy?.name || "-";
                      } else {
                        value = row[column.id];
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={countList} // total how many data in data base !
          rowsPerPage={rowsPerPage}
          page={page} // total page !
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        {/* modal to create invite user !  */}
        <CreateUser
          open={createModal}
          onClose={() => setCreateModal(false)}
          newUserData={NewCreatedUser}
        />
      </Paper>
      <ErrorNotif
        open={open}
        clickHandleOpen={() => setOpen(true)}
        clickHandleClose={() => setOpen(false)}
      />
      <ToastContainer />
    </div>
  );
}


  //filter function ! ! ! this function is good when data is already fetch and use that data to filter ! but the best approach is to search inside the data base !

  // const filteredUsers = user.filter((row) => {
  //   const searchLower = search.toLowerCase();
  //   return (
  //     row.firstName?.toLowerCase().includes(searchLower) ||
  //     row.lastName?.toLowerCase().includes(searchLower) ||
  //     row.email?.toLowerCase().includes(searchLower)
  //     // row.role?.toLowerCase().includes(searchLower) || remove lang ! !
  //     // row.createdBy?.name?.toLowerCase().includes(searchLower) remove lang ! !
  //   );
  // });