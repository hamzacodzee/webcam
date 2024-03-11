import React, { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState(null);

  console.log("permissionGranted", permissionGranted, error);

  const requestUserMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (webcamRef.current) {
        webcamRef.current.video.srcObject = stream;
        setPermissionGranted(true);
      }
    } catch (error) {
      console.error("Error accessing user media:", error);
      setError(error.message); // Set error message
    }
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
  }, [webcamRef]);

  useEffect(() => {
    requestUserMedia();
  }, [requestUserMedia]);

  return (
    <div>
      {/* {!permissionGranted && !error && (
        <button onClick={requestUserMedia}>Grant Camera Access</button>
      )}
      {error && <p>Error: {error}</p>} */}
      {/* {permissionGranted && ( */}
      <div>
        <Webcam
          audio={false}
          // height={320}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          // width={280}
        />
        <button onClick={capture}>Capture photo</button>
        {image && <img src={image} alt="Captured" />}
      </div>
      {/* )} */}
    </div>
  );
};

export default WebCam;
