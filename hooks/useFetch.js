import { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders } from "../utils/apis";

const useFetch = (initialValue) => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url !== "") {
      setLoading("loading...");
      setData(initialValue);
      setError(null);
      const source = axios.CancelToken.source();
      const headers = setHeaders();
      const params = { cancelToken: source.token, headers };
      axios
        .get(url, params)
        .then((res) => {
          setLoading(false);
          res.data.result && setData(res.data.result);
        })
        .catch((err) => {
          setLoading(false);
          setError("Sever error");
        })
        .finally(() => {
          setUrl("");
        });
      return () => {
        source.cancel();
      };
    }
  }, [url]);

  return [{ data, loading, error }, setUrl];
};

export default useFetch;
