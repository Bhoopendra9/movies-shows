import React, { useRef } from "react";
import "./Carousel.scss";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../CircleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endpoint, title }) => {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const carouselcontainer = useRef();
  const navigation = (dir) => {
    const container = carouselcontainer.current;
    const scrollamount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollamount,
      behavior: "smooth",
    });
  };

  const skeletonitem = () => {
    return (
      <div className="skeletonitem">
        <div className="posterblock skeleton ">
          <div className="textblock">
            <div className="title skeleton"></div>
            <div className="date skeleton"></div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeft arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRight arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselitems" ref={carouselcontainer}>
            {data?.map((item) => {
              const posterurl = item.poster_path
                ? url.poster + item.poster_path
                : PosterFallback;
              return (
                <div
                  key={item.id}
                  className="carouselitem"
                  onClick={() =>
                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                  }
                >
                  <div className="posterBlock">
                    <Img src={posterurl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingskeleton">
            {skeletonitem()}
            {skeletonitem()}
            {skeletonitem()}
            {skeletonitem()}
            {skeletonitem()}
          </div>
        )}
      </ContentWrapper>

    </div>
  );
};


export default Carousel;
