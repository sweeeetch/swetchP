import React from "react";
import ReactPlayer from "react-player/vimeo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./VoiceOver.css"; // Import CSS

const VoiceOver = () => {
  const videos = [
    {
      src: "https://vimeo.com/1055385981/cae563efe7",
      title: "second voice , Arabic Voice for",
      link: {
        text: "wellcomdev",
        url: "https://www.instagram.com/reel/DDSRtUfMEMV/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
      },
    },
    {
      src: "https://vimeo.com/1056743144/2c21f5134e?ts=0&share=copy",
      title: "Voice : Algerian Darja ",
      link: { text: "Five wings", url: "#" },
    },
    // {
    //   src: "https://vimeo.com/1056726772/2af15a077d?ts=0&share=copy",
    //   title: "For Fun : voice + filming + editing",
    // },
    // {
    //   src: "https://vimeo.com/1056729408/1f7691e45f?ts=0&share=copy",
    //   title: "For Fun : voice + filming + editing",
    // },
    {
      src: "https://vimeo.com/1056780625/b0178a2787?ts=0&share=copy",
      title: "Arabic Voice for ",
      link: {
        text: "Badratkhayr",
        url: "https://www.instagram.com/reel/DBPVOdyOl_y/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
    },
    {
      src: "https://vimeo.com/1056726772/2af15a077d?ts=0&share=copy",
      title: "English + Arabic voice ",
      link: {
        text: "24th Recap",
        url: "https://www.instagram.com/reel/DETLAJao7IQ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      },
    },
    {
      src: "https://vimeo.com/1056729408/1f7691e45f?ts=0&share=copy",
      title: "English + French Voice  ",
      link: { text: "Vivre", url: "#skills" },
    },
  ];

  return (
    <section className="voice-over">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        // autoplay={{ delay: 5000, disableOnInteraction: false }}
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
              controls={true}
              playing={false}
              muted={true}
            />
            {/* Render Title with Link */}
            <span className="slide-title">
              {video.title}
              <a
                href={video.link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {video.link.text}
              </a>
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VoiceOver;
