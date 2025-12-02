import * as React from "react";
import { useState, useEffect , setTimeOut } from "react";
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
import {
  notifySuccess,
  notifyError,
} from "../components/Toastify/notifications";
import { ToastContainer } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 100 },
  { id: 'lastName', label: 'Last Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 10 },


  { id: 'email', label: 'Email', minWidth: 100 },
    {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'assigned',
    label: 'Assigned',
    minWidth: 170,
    align: 'right',
  },
];

export default function Users() {
  const [user, setUser] = useState(null);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const storedToken = localStorage.getItem("token");
  const [createModal, setCreateModal] = useState(false);

  // code for getting user's api !
  const toggleCreateModal = () => {
    setCreateModal(true);
  };

  const UserData = async () => {
       setLoading(true); // start loading temp to see loading state ! 

    try {
      const response = await UserAPI.GetUsers(storedToken);
      // ✅ Safely check if the data exists
      const users = response?.userData?.users || [];
      // ✅ Update state
      setUser(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Optional: show an error message to the user
    } finally {
      setLoading(false); // always stop loading
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // useEffect for the data to render this page and display !
  

  useEffect(() => {
  
  const timer = setTimeout(() => {
    setLoading(true);
    UserData();
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  if (loading) return (
  <div className="flex items-center justify-center h-[200px]">
    <CircularProgress disableShrink />
  </div>
);

  if (!user) return <p>No user data</p>;

  const generateTempPassword = (length = 10) => {
    return Math.random()
      .toString(36)
      .slice(2, 2 + length);
  };

  const NewCreatedUser = async (userValue) => {
    if (!userValue) {
      console.error("NewCreatedUser: No user data provided.");
      notifyError("No user data provided!");
      return;
    }

    const tempPassword = generateTempPassword(10);
    console.log("Generated Temporary Password:", tempPassword);

    const payload = {
      firstName: userValue.firstName,
      lastName: userValue.lastName,
      age: userValue.age,
      role: userValue.role,
      email: userValue.email,
      password: tempPassword,
    };
    console.log("Prepared Payload to API:", payload);
    
    try {
      // Call API to create user
      const response = await UserAPI.PosstUsers(storedToken, payload);
      // Show success toast **before refreshing the list**
      setTimeout(() => {
        notifySuccess("User successfully created!");
      }, 50);

      try {
        await UserData();
      } catch (refreshError) {
        console.warn("Warning: Failed to refresh user list", refreshError);
      }
      // return API response if needed
    } catch (error) {
      console.error("Error creating user:", error);
      notifyError(error);
    }
  };

  return (
    <div className=" ">
      <div className=" mb-5">
        <Buttons buttonName="Invite User" onClick={toggleCreateModal} />
      </div>
       <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {user
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        let value;
                    if (column.id === "assigned") {
                      value = row.createdBy?.name || "-";
                    } else {
                      value = row[column.id];
                    }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={user.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <CreateUser
          open={createModal}
          onClose={() => setCreateModal(false)}
          newUserData={NewCreatedUser}
        />
    </Paper>
      <ToastContainer />
    </div>
  );
}

