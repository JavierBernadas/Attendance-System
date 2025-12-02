import React, { useState ,useEffect} from "react";
import SampleTest from "../assets/images/images.jpg";
import EditIcon from "@mui/icons-material/Edit";
import Buttons from "../components/Button/Buttons";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { IconButton, Box } from '@mui/material';
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../components/Context/AuthProvider";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UserProfile = () => {
  const [Edit, setEdit] = useState(true);
  const {  userRole , userName } = useAuth();

  const [userData, setUserData] = useState({
    name: "",
    role: "",
    avatar: "/broken-image.jpg",
  });

  console.log( " DATA FROM LOCALSTORAGE : " + userRole    + " - " + userName )

  // const userData = {
  //   name: "Javier Bernadas Canoy ",
  //   role: "Admin",
  //   avatar: "/broken-image.jpg",
  // };

  const handleEditAvatar = ()=>
  {
    console.log("YEAH")
  }
  
const onChange = (e)=>
{
     const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Set the full base64 string to the image state
        console.log(reader.result)
        //  setUserData(...userData , userData.avatar : reader.result);
         setUserData({
  ...userData,
  avatar: reader.result,
});
      }
    };

    reader.onerror = (error) => {
      console.log(error, reader.result);
    };
}


useEffect(() => {
  if (userName || userRole) {
    setUserData((prev) => ({
      ...prev,
      name: userName,
      role: userRole,
    }));
  }
}, [userName, userRole]);
  return (
    <div className="flex items-center justify-center  dark:bg-gray-900">
      <div className="relative w-full max-w-md bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Edit Button at top-right */}
        <div className="absolute top-4 right-4">
          {Edit ? (
            <Buttons
              buttonName="Edit"
              onClick={() => setEdit(false)}
              startIcon={<EditIcon />}
            />
          ) : (
            <Buttons
              buttonName="Save"
              onClick={() => setEdit(true)}
              startIcon={<SaveIcon />}
            />
          )}
        </div>

        {/* Centered content */}

        <div className="flex flex-col items-center pb-10 mt-16">
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
    <Avatar
      sx={{ width: 70, height: 70 }}
      alt={userData.name}
      src={userData.avatar}
    />
    
    {/* Edit icon overlay */}
    {Edit ? "" : 
    <div>
       {/* <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                  // onChange={handleUploadImage}
                >
                  Upload Profile
                  <VisuallyHiddenInput type="file" />
                </Button> */}
            <IconButton
      component="label"
      size="small"
      sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '4px',
        zIndex: 10,
        '&:hover': {
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <VisuallyHiddenInput type="file" accept="image/*" onChange={onChange} />
      <EditIcon fontSize="small" />
    </IconButton>
    </div>
  
    
    }
      
  </Box>
          
          <input
            type="name"
            id="name"
            name="name"
            value={userData.name}
            disabled={Edit}
            className=" p-3 rounded-lg mt-3 text-center  bg-gray-100 text-sm text-gray-700 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            placeholder="name@flowbite.com"
            required
          />
          <p className="inline-block px-4 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-red-200 shadow-sm my-2">
            {userData.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
