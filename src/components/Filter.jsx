import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import "./filter.css";

const Filter = ({ jobList, setJobList }) => {
  const [minExperience, setMinExperience] = useState(0);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("nota");
  const [minBaseSalary, setMinBaseSalary] = useState(0);
  const [role, setRole] = useState([]);

  const options = [
    { value: "Frontend", label: "Frontend" },
    { value: "Backend", label: "Backend" },
    { value: "IOS", label: "IOS" },
    { value: "Tech Lead", label: "Tech Lead" },
    { value: "Android", label: "Android" },
  ];

  const expValueOptions = [
    { value: 1, label: "1 Years" },
    { value: 3, label: "3 Years" },
    { value: 5, label: "5 Years" },
    { value: 7, label: "7 Years" },
  ];

  const minSalaryOptions = [
    { value: 20, label: "$20" },
    { value: 30, label: "$30" },
    { value: 50, label: "$50" },
    { value: 70, label: "$70" },
  ];
  const locationOptions = [
    { value: "on-site", label: "On-Site" },
    { value: "remote", label: "Remote" },
  ];
  const posts = useSelector((state) => state.getAllJobList.jobList);

  useEffect(() => {
    setJobList(posts);
    filterData();
  }, [posts, companyName, minExperience, location, minBaseSalary, role]);

  function filterData() {
    if (minBaseSalary) {
      minBsSal(posts);
    } else if (location) {
      locationFind(posts);
    }

    if (role?.length > 0) {
      roleFind(posts);
    }
    if (minExperience) {
      minExp(posts);
    } else if (companyName) {
      comName(posts);
    }
  }

  function minBsSal(data) {
    if (minBaseSalary === 0) {
      setJobList(posts);
      return;
    }

    const result = data.filter((ele) => {
      let minJdSalary = ele.minJdSalary || 0;
      let miniBaseSalary = Number(minBaseSalary?.value);
      return minJdSalary && Number(minJdSalary) >= miniBaseSalary;
    });
    setJobList(result);
  }
  function minExp(data) {
    const result = data.filter((ele) => {
      let minExp = ele.minExp || 0;
      let miniExperience = Number(minExperience?.value);
      return minExp && minExp >= miniExperience;
    });
    setJobList(result);
  }
  function comName(data) {
    const result = data.filter((ele) => {
      let tempCompanyName = ele.companyName.toLowerCase();
      return tempCompanyName.includes(companyName.toLowerCase());
    });
    setJobList(result);
  }

  function locationFind(data) {
    const result = data.filter((ele) => {
      let loc = ele.location;
      if (location.value === "remote") return loc.toLowerCase() === "remote";
      if (location.value === "on-site") return loc.toLowerCase() !== "remote";
      if (location === "nota") return true;
    });
    setJobList(result);
  }
  function roleFind(data) {
    const result = data.filter((ele) => {
      let jobrole = ele.jobRole.toLowerCase();
      if (role.find(({ value }) => value.toLowerCase() === jobrole)) return 1;
      return 0;
    });
    setJobList(result);
  }

  const handleMinExperienceChange = (minExperience) => {
    setMinExperience(minExperience);
    setMinBaseSalary(0);
    setLocation("nota");
    setCompanyName("");
    setRole([]);
  };

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
    setMinExperience(0);
    setMinBaseSalary(0);
    setLocation("nota");
    setRole([]);
  };

  const handleLocation = (location) => {
    setLocation(location);
    setMinExperience(0);
    setMinBaseSalary(0);
    setCompanyName("");
    setRole([]);
  };
  const handleSalaryChange = (minBaseSalary) => {
    setMinBaseSalary(minBaseSalary);
    setMinExperience(0);
    setLocation("nota");
    setCompanyName("");
    setRole([]);
  };

  const roleHandleChange = (role) => {
    setRole(role);
    setMinExperience(0);
    setMinBaseSalary(0);
    setCompanyName("");
    setLocation("nota");
  };
  return (
    <div className="filterContainer">
      <div>
        <Select
          options={expValueOptions}
          value={minExperience}
          placeholder="Select Minimum Experience"
          onChange={handleMinExperienceChange}
          noOptionsMessage={() => "No Experience!!"}
          styles={{
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "gray",
            }),
            clearIndicator: (baseStyles) => ({
              ...baseStyles,
              color: "black",
            }),
            minWidth: "2rem",
          }}
        />
      </div>

      <div>
        <Select
          options={locationOptions}
          value={location}
          placeholder="Select Location "
          onChange={handleLocation}
          noOptionsMessage={() => "Location Unavailable!!"}
          styles={{
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "gray",
            }),
            clearIndicator: (baseStyles) => ({
              ...baseStyles,
              color: "black",
            }),
          }}
        />
      </div>

      <div>
        <Select
          options={minSalaryOptions}
          value={minBaseSalary}
          placeholder="Select Minimum Salary"
          onChange={handleSalaryChange}
          noOptionsMessage={() => "Salary Unavaliable!!"}
          styles={{
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "gray",
            }),
            clearIndicator: (baseStyles) => ({
              ...baseStyles,
              color: "black",
            }),
          }}
        />
      </div>

      <div>
        <Select
          options={options}
          value={role}
          placeholder={"Select Role..."}
          onChange={roleHandleChange}
          isMulti
          isSearchable
          noOptionsMessage={() => "No Role Found!!"}
          styles={{
            placeholder: (baseStyles, state) => ({
              ...baseStyles,
              color: "gray",
            }),
            clearIndicator: (baseStyles) => ({
              ...baseStyles,
              color: "black",
            }),
          }}
        />
      </div>
      <div>
        <input
          className="searchBar"
          type="search"
          placeholder="Search By Company..."
          value={companyName}
          onChange={(e) => handleCompanyName(e)}
        />
      </div>
    </div>
  );
};

export default Filter;
