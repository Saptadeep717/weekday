import React from "react";
import { useState } from "react";
import "./card.css";
const Card = ({
  jdUid,
  jdLink,
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  minExp,
  maxExp,
  jobRole,
  companyName,
  logoUrl,
}) => {
  const tempDesription = `${jobDetailsFromCompany?.substring(0, 200)}...`;
  const [description, setDescription] = useState(tempDesription);
  const [readMore, setReadmore] = useState(false);
  const readmoreHandler = () => {
    setReadmore(!readMore);
    if (!readMore) {
      setDescription(jobDetailsFromCompany);
    } else {
      setDescription(tempDesription);
    }
  };

  return (
    <div className="card">
      <div className="cardData">
        <header className="header">
          <div className="imageContainer">
            <img src={logoUrl} alt={companyName} />
          </div>
          <div className="textContainer">
            <div className="cname">{companyName}</div>
            <div className="cjrole">{jobRole}</div>
            <div className="cjloc">{location}</div>
          </div>
        </header>
        <body className="body">
          <div className="salary">
            {`Estimated Salary: ${
              minJdSalary
                ? `$${minJdSalary} - ${maxJdSalary}`
                : ` max $${maxJdSalary}`
            } ✅`}
          </div>
          <div className="aboutCom">
            <span>{`About Company:`}</span>
            <div className="aboutUs">
              <span>{`About us:`}</span>
              <div className="desc" onClick={readmoreHandler}>
                {description}
                <span className="read-more" onClick={readmoreHandler}>
                  {" "}
                  {readMore ? "show less" : "read more"}
                </span>
              </div>
            </div>
          </div>
        </body>
        <footer className="footer">
          {minExp && (
            <div className="experience">
              <span>Minimum Experience</span>
              <span>{`${minExp} years`}</span>
            </div>
          )}
        </footer>
      </div>
      <div className="buttonContainer">
        <button className="btn">Easy Apply 🔗</button>
      </div>
    </div>
  );
};

export default Card;
