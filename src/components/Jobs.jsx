import { useState, useEffect } from "react";
import Card from "./Card";
import Filter from "./Filter";
import { useSelector } from "react-redux";

const Jobs = () => {
  const posts = useSelector((state) => state.getAllJobList.jobList);
  const [jobList, setJobList] = useState([]);

  return (
    <div>
      <div>
        <Filter jobList={jobList} setJobList={setJobList} />
      </div>
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
