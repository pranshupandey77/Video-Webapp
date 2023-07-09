import React, { useRef, useEffect, useState } from "react";
import { videoArr } from "../common/common.js";
import "./style.css";

const Webapp = () => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState();

  useEffect(() => {
    console.log(currentVideo);
    if (currentVideo) {
      currentVideo.play();
      currentVideo.muted = false;
    }
  }, [currentVideo]);

  useEffect(() => {
    const handleScroll = () => {
      const videos = videoRefs.current;

      videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;
        if (isVisible) {
          setCurrentVideo(video);
        } else {
          video.pause();
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      {videoArr.map((arr, index) => {
        const recommendation = arr.data.recommendation;
        return recommendation.map((video, index) => (
          <div className="video_wrapper" key={video.video_url.med + index}>
            <video
              className="video_container"
              key={video.video_url.med}
              ref={(ref) => (videoRefs.current[index] = ref)}
              controls={true}
              autoPlay
            >
              <source
                src={video.video_url.med}
                type="video/mp4"
                className="video"
              />
            </video>
          </div>
        ));
      })}
    </div>
  );
};

export default Webapp;
