import React, { useEffect } from "react";

function AllowCamera() {
  let localstream;

  useEffect(() => {
    let vid = document.getElementById("vid");
    if (navigator.mediaDevices.getUserMedia !== null) {
      var options = {
        video: true,
        audio: true,
      };
      navigator.getUserMedia(
        options,
        function (stream) {
          vid.srcObject = stream;
          localstream = stream;
          vid.play();
          console.log(stream, "streaming");
        },
        function (e) {
          console.log("background error : " + e.name);
        }
      );
    }
  });

  const capOff = () => {
    let vid = document?.getElementById("vid");
    if (vid) {
      vid.pause();
      vid.src = "";
    }
    localstream?.getTracks()?.forEach((x) => x.stop());
    console.log("all capture devices off");
  };

  const captureSelfie = () => {
    let vid = document.getElementById("vid");
    let canvas = document.createElement("canvas");
    canvas.width = vid.videoWidth;
    canvas.height = vid.videoHeight;
    let context = canvas.getContext("2d");
    context.drawImage(vid, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to base64
    let base64DataUrl = canvas.toDataURL("image/png");
    console.log("Base64 Image:", base64DataUrl);
  };

  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video id="vid" height="120" width="160" autoPlay></video>
      </div>
      <br />
      <button onClick={capOff}>Turn Capture Off</button>
      <button onClick={captureSelfie}>Capture Selfie</button>
    </div>
  );
}

export default AllowCamera;
