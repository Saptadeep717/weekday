import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import Jobs from "./components/Jobs";
import { addAllJobs } from "./redux/jobSlice";

function App() {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fitItem] = useState("");
  const [innerHeight, setInnerHeight] = useState(800);
  const dispatch = useDispatch();

  const FetchPosts = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(addAllJobs(result.jdList));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    FetchPosts();
  }, [offset]);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, [window.innerHeight]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      setOffset(offset + 10);
    }
  };
  return (
    <>
      <div
        style={{ height: innerHeight + "px", overflowY: "scroll" }}
        onScroll={handleScroll}
      >
        <h1>Candidate Application Platform</h1>
        <Jobs />
      </div>
    </>
  );
}

export default App;
