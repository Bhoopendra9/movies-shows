import React from "react";
import "./Home.scss";


import HeroBanner from "./Herobanner/HeroBanner";
import Trending from "./Trending/Trending";
import Popular from "../Home/Popular/Popular";
import TopRated from "./TopRated/TopRated";

const Home = () => {
  return (
    <div className="home_page">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
