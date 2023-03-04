import React, { useState } from "react";
import "./Trending.scss";

import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import Switchtab from "../../../components/Switchtab/Switchtab";
import useFetch from "../../../Hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const Trending = () => {
  const [endpoint, setendpoint] = useState("day");

  const { data, loading } = useFetch(`/trending/movie/${endpoint}`);
  console.log(data);

  const onTabchange = (tab) => {
    setendpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carousel-section">
      <ContentWrapper>
        <div className="top-header">
          <span className="carousel-title">Trending</span>
          <Switchtab data={["Day", "Week"]} onTabchange={onTabchange} />
        </div>
        <Carousel data={data?.results} loading={loading} />
      </ContentWrapper>
    </div>
  );
};

export default Trending;
