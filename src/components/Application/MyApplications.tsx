import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  coverLetter: string;
  resume: {
    url: string;
  };
}

const MyApplications: React.FC = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState<Application[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resumeImageUrl, setResumeImageUrl] = useState<string>("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/application/employerAll`, {
            withCredentials: true,
          });
          setApplications(res.data.applications);
        } else {
          const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/application/jobSeekerAll`, {
            withCredentials: true,
          });
          setApplications(res.data.applications);
        }
      } catch (error:any) {
        toast.error(error.response.data.message);
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const deleteApplication = async (id: string) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/application/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) => prevApplications.filter((application) => application._id !== id));
    } catch (error:any) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl: string) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <h4>No Applications Found</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

interface JobSeekerCardProps {
  element: Application;
  deleteApplication: (id: string) => void;
  openModal: (imageUrl: string) => void;
}

const JobSeekerCard: React.FC<JobSeekerCardProps> = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
      </div>
    </div>
  );
};

interface EmployerCardProps {
  element: Application;
  openModal: (imageUrl: string) => void;
}

const EmployerCard: React.FC<EmployerCardProps> = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
    </div>
  );
};
