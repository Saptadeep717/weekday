import { useState, useEffect } from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [jobList, setJobList] = useState([]);

  const posts = useSelector((state) => state.getAllJobList.jobList);
  useEffect(() => {
    setJobList(posts);
    console.log("133333+++++");
  }, [posts]);

  return (
    <div>
      <div className="filterContainer"></div>
      <div className="cardsContainer">
        {jobList &&
          jobList.map((job, index) => {
            return <Card key={index} {...job}></Card>;
          })}
      </div>
    </div>
  );
};
export default Jobs;
