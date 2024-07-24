import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

 type job =
  {
  _id: string;
  title: string;
  description: string;
  category: string;
  country: string;
  city: string;
  location: string;
  fixedSalary?: number;
  salaryFrom?: number;
  salaryTo?: number;
  expired: boolean;
  jobPostedOn: Date;
  postedBy: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<job[]>([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getAll", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data.jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs &&
            jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;