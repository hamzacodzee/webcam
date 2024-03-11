import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";

const WebCam = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");
  const [changeCameraMode, setChangeCameraMode] = useState(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImage(imageSrc);
    const tracks = webcamRef.current.video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  }, [webcamRef]);

  const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: changeCameraMode ? "user" : "environment",
  };

  // const reset = () => {
  //   setChangeCameraMode(true);
  //   setImage("");
  // };

  return (
    <div>
      {!image && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />

          <button onClick={capture}>Capture photo</button>
          <button onClick={() => setChangeCameraMode(!changeCameraMode)}>
            Change Mode
          </button>
        </>
      )}
      {image && <img src={image} alt="" />}
      {/* <button onClick={reset}>Reset</button> */}
    </div>
  );
};

export default WebCam;
