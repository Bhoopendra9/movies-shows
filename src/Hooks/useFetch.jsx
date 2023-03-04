import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/Api";

const useFetch = (url) => {
  const [loading, setloading] = useState(null);
  const [data, setdata] = useState(null);
  const [error, seterror] = useState(null);

  useEffect(() => {
    setloading("loading.....");
    setdata(null);
    seterror(null);

    fetchDataFromApi(url)
      .then((res) => {
        setloading(false);
        setdata(res);
      })
      .catch((err) => {
        setloading(false);
        seterror("something went wrong");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
