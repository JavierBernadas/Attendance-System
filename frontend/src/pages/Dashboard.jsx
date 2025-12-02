import React from "react";
import DefaultCard from "../components/Card/DefaultCard";
import News from "./News";
import Divider from "@mui/material/Divider";
import Events from "./Events";
const Dashboard = () => {
  return (
    <div>
      <Divider textAlign="left">Dashboard</Divider>
      <div className=" flex gap-5 my-5">
        <DefaultCard textAlign="left" tittle="Timesheet" Score="001" />
        <DefaultCard textAlign="left" tittle="Missed Punches" Score="002" />
        <DefaultCard textAlign="left" tittle="Attendance" Score="003" />
      </div>
      {/* //Announcement ! !  */}
      <Divider textAlign="left">Announcement</Divider>
      <div className=" my-10">
        <News />
      </div>
      {/* //news ! !  */}
      <Divider textAlign="left">News</Divider>
      <div className="">
        <div className=" my-5">
          <News />
        </div>
      </div>
      {/* //events ! !  */}
      <Divider textAlign="left">Events</Divider>
      <div className=" flex gap-5 my-5">
        <Events />
        <Events />
        <Events />
      </div>
    </div>
  );
};

export default Dashboard;
