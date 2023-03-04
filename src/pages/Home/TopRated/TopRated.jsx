import React, { useState } from "react";
// import "./Trending.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Switchtab from "../../../components/Switchtab/Switchtab";
import useFetch from "../../../Hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const TopRated = () => {
  const [endpoint, setendpoint] = useState("movie");

  const { data, loading } = useFetch(`/${endpoint}/top_rated`);
  console.log(data);

  const onTabchange = (tab) => {
    setendpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carousel-section">
      <ContentWrapper>
        <div className="top-header">
          <span className="carousel-title">Top Rated</span>
          <Switchtab data={["Movies", "TV show"]} onTabchange={onTabchange} />
        </div>
        <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
      </ContentWrapper>
    </div>
  );
};

export default TopRated;
