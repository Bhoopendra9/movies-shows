import React from "react";
import "./HeroBanner.scss";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import useFetch from "../../../Hooks/useFetch";

import Img from "../../../components/lazyLoadImage/img";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [background, setbackground] = useState("");
  const [query, setquery] = useState("");
  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");
  const { url } = useSelector((state) => state.home);

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setbackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className="herobanner">
      {!loading && (
        <div className="backdrop_img">
          <Img src={background} />
        </div>
      )}
      
      <div className="opacity_layer"></div>

      <ContentWrapper>
        <div className="herobanner_content">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of movies, TV shows and people to discover. Explore now
          </span>
          <div className="searchinput">
            <input
              type="text"
              placeholder="Search for a movie or TV show..."
              onChange={(e) => setquery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
