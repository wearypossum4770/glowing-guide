import { useState, useEffect } from "react";
export default function useFetchData(url) {
  let [response, setResponse] = useState();
  let [error, setError] = useState();
  useEffect(() => {
    let options = {
      mode: "cors",
    };
    async function getData() {
      try {
        const resp = await fetch(url, options);
        if (resp.ok) {
          let data = await resp.json();
          setResponse(data);
        }
      } catch (err) {
        setError(err);
      }
    }
    getData();
  }, [url]);
  return { response: response, error: error };
}
