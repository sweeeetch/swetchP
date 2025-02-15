import React from "react";
import ReactPlayer from "react-player/vimeo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./FilmMaking.css"; // Import styles

const FilmMaking = () => {
  const videos = [
    {
      src: "https://vimeo.com/1056350265/cd81bebacd?ts=0&share=copy",
      title: "FOR FUN : Shot with iphone 7 plus + edited in premiere pro ",
    },
    {
      src: "https://vimeo.com/1056723935/460eeceb4b?ts=0&share=copy",
      title: "For Fun : filming + editing",
    },
    {
      src: "https://vimeo.com/1056726772/2af15a077d?ts=0&share=copy",
      title: "For Fun : voice + filming + editing",
    },
    {
      src: "https://vimeo.com/1056729408/1f7691e45f?ts=0&share=copy",
      title: "For Fun : voice + filming + editing",
    },
    {
      src: "https://vimeo.com/1056735728/62d061a38d?ts=0&share=copy",
      title: "For Fun : filming + editing",
    },
    {
      src: "https://vimeo.com/1056740707/23955c2cde?ts=0&share=copy",
      title: "For Badrat Khayr Club : Editing ",
    },
  ];

  return (
    <section className="film-making">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        // autoplay={{ delay: 5000, disableOnInteraction: true }}
        navigation
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {videos.map((video, index) => (
          <SwiperSlide key={index} className="slide">
            <ReactPlayer
              url={video.src}
              className="slide-video"
              width="80%"
              height="80vh"
              controls={true} // Enable controls
              playing={false} // Auto-play
              muted={true} // Mute autoplay videos
            />
            <span className="slide-title">{video.title}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FilmMaking;
