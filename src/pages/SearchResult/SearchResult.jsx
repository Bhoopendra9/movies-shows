import React from "react";
import "./SearchResult.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../../utils/Api";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import noResults from "../../assets/no-results.png";
import Spinner from "../../components/Spinner/Spinner";
import Moviecard from "../../components/Moviecard/Moviecard";

const SearchResult = () => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [pageNum, setpageNum] = useState(1);

  const { query } = useParams(); 

  const fetchInitialData = () => {
    setloading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setdata(res);
        setpageNum((prev) => prev + 1);
        setloading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setdata(res);
        }
        setpageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setpageNum(1)
    fetchInitialData();
  }, [query]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`search ${
                  data?.total_results > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_page}
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;
                  return (
                    <Moviecard key={index} data={item} fromSearch={true} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
