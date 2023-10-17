import { useEffect, useRef } from "react";

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoUrl = "https://5492-118-218-199-56.ngrok.io/video";
      videoRef.current.src = videoUrl;
    }
  }, [videoRef]);

  return (
    <div>
      <h2>Video Player</h2>
      <video ref={videoRef} muted controls width="640" height="360" autoPlay></video>
    </div>
  );
};
export default App;
