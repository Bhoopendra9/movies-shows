import React from "react";
import "./Details.scss";

import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";

import Detailsbanner from "./Detailsbanner/Detailsbanner";
import Cast from "./Cast/Cast";
import Videosection from "./Videosection/Videosection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div>
      <Detailsbanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <Videosection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
