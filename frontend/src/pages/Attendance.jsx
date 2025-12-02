import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import DefaultContained from "../components/Button/Buttons";
import DefaultModal from "../components/Modal/DefaultModal";
import { notifySuccess } from "../components/Toastify/notifications";
import { ToastContainer } from "react-toastify";
//videoConstraints more details ! ! !
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const Attendance = () => {
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [isClockRunning, setIsClockRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClicktimeIn = () => {
    setIsModalOpen(true);
  };
  
  const capture = useCallback(() => {
    setIsModalOpen(false);
    //Time Stop to Capture in Time in set to False ! ! !
    setIsClockRunning(false);
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured:", imageSrc);
    setScreenshot(imageSrc);        
    notifySuccess("You’re ready too go.");
  }, []);

  useEffect(() => {
  // Helper to update time
  const updateTime = () => {
    const now = new Date();
    // Date
    const phDate = now.toLocaleDateString("en-PH", {
      timeZone: "Asia/Manila",
      weekday: "long",
      day: "numeric",
      year: "numeric",
    });
    setCurrentDate(phDate);

    // Time
    const phTimeOnly = now.toLocaleTimeString("en-PH", {
      timeZone: "Asia/Manila",
    });

    setCurrentDateTime(phTimeOnly);
    console.log("ok ")
    console.log( intervalRef.current)


  };

  // Initial update
  updateTime();

  // Set up interval if clock is running
  if (isClockRunning) {
    intervalRef.current = setInterval(updateTime, 1000);
    console.log(intervalRef.current + "hahah --------")
  }

// Cleanup this one reserve for unmonted ! ! ! 
  return () => {
  //React runs the useEffect body on first render,
  //  but it only stores the cleanup function to be used later if needed. to stop the timer ! ! ! 
    clearInterval(intervalRef.current);
    console.log("set to CLEAR INTERVAL :  " + intervalRef.current)

  };

}, [isClockRunning]);


  return (
    <div className="relative min-h-screen rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-800 via-indigo-400 to-blue-400">
      <div className="absolute inset-0">
        <div className="relative h-full w-full [&>div]:absolute [&>div]:h-full [&>div]:w-full [&>div]:bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [&>div]:[background-size:16px_16px] [&>div]:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <div></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Date and Time Display */}
        <div className="border-2 border-indigo-500 rounded-xl p-6 flex flex-col items-center space-y-4 bg-white shadow-lg">
          <p className="text-4xl font-semibold text-indigo-600 font-mono tracking-wide">
            {currentDateTime}
          </p>
          <div className="border border-indigo-300 rounded-lg px-4 py-2 bg-indigo-50 w-full text-center">
            <p className="text-lg text-indigo-700 font-medium tracking-wide">
              {currentDate}
            </p>
          </div>
        </div>

        {/* Webcam or Captured Image */}
        {!screenshot ? (
          <>
            <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-gray-400 shadow-md">
              <Webcam
                ref={webcamRef}
                audio={false}
                height={720}
                screenshotFormat="image/jpeg"
                width={1280}
                videoConstraints={videoConstraints}
                className="w-full h-full object-cover"
              />
            </div>
            <DefaultContained buttonName="Time In" onClick={onClicktimeIn} />
          </>
        ) : (
          <div className="w-50 h-50 rounded-full overflow-hidden border-4 border-blue-500 shadow-md">
            <img
              src={screenshot}
              alt="Captured"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Modal for Confirmation */}
        <DefaultModal
          Header="Time In Confirmation"
          Content="Confirm your Time In!"
          onConfirm={capture}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Attendance;
