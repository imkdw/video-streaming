import React from "react";
import VideoJS from "./VideoJS";

const App = () => {
  // <div>
  //   <h2>Video Player</h2>
  //   <video muted controls width="640" height="360" autoPlay>
  //     <source src="http://localhost:4000/video" />
  //   </video>
  // </div>

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://localhost:4000/video",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      // videojs.log("player is waiting");
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
};
export default App;
