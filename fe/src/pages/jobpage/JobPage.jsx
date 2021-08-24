import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import "./JobPage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoIosPin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import Card from "react-bootstrap/Card";
import { FaPhoneAlt } from "react-icons/fa";
import cogoToast from "cogo-toast";
import jobService from "../../services/job-service/job.service";

function JobPage() {
  const idObj = useParams();

  const url = window.location;
  const [job, setJob] = useState({});

  useEffect(() => {
    jobService.getJobById(idObj.id).then((res) => {
      const data = res.data;
      console.log(res.data);
      setJob(data);
      console.log(job);
    });
  }, []);

  const handleJoinJob = () => {

  }

  useEffect(() => {
      //TODO: get job applicants and display them if the user id from job obj is the same with the user logged in
      //TODO: handle apply to job method using service method
  })

  const handleShareBtn = () => {
    navigator.clipboard.writeText(url);
    cogoToast.success("Link copied in clipboard!");
  };

  return (
    <div className="business-presentation-container">
      <div className="business-presentation">
        <Row className="business-shortcuts-row">
          <Col sm={6}>
            <h1 className="business-title-name">{job.jobTitle}</h1>
            <Row>
              <Col className="business-second-row-col">
                <span className="business-reviews">
                  Plata - {job.jobPayment} RON
                </span>
              </Col>
            </Row>
            <Row className="business-shortcut-contact">
              <div className="shortcut-contact shortcut-contact-location">
                <IoIosPin className="location-icon" />
                <span className=" business-presentation-location">
                  {job.jobLocation}
                </span>
              </div>
              <div className="shortcut-contact shortcut-contact-phone">
                <FaPhoneAlt className="phone-icon" />
                <span className="business-presentation-phone">0752108425</span>
              </div>
              <div className="shortcut-contact shortcut-contact-email">
                <MdEmail className="email-icon" />
                <span className="business-presentation-phone">
                  {job.userAccount.email}
                </span>
              </div>
            </Row>
           
          </Col>
          <Col className="business-shortcut-options-col" sm={6}>
            <div className="business-shortcut-options">
              <button className="business-shortcut-options-btn save-business-btn" onClick={() => handleJoinJob()}>
                <AiOutlineHeart className="shortcut-options-icon" />
                <a class="business-presentation-shortcut-links" href="#">
                  Aplica
                </a>
              </button>
              <button className="business-shortcut-options-btn ">
                <FiShare className="shortcut-options-icon" />
                <a
                  class="business-presentation-shortcut-links"
                  onClick={() => handleShareBtn()}
                >
                  Share
                </a>
              </button>
            </div>
          </Col>
        </Row>
        <Row className="business-shortcuts-row review-section">
              <Card style={{ width: "60%" }}>
                <Card.Title className="business-presentation-card-title reviews-card-title ">
                  Desciere generala
                </Card.Title>
                <Card.Body className="review-section-body">
                    <div className="job-card-info-section">
                    <span>DESCRIERE:</span>
                    <span>{job.jobDescription}</span>
                    </div>

                    <div className="job-card-info-section">
                    <span>CATEGORIE:</span>
                    <span>{job.categorie}</span>
                    </div>

                    <div className="job-card-info-section">
                    <span>LOCATIE:</span>
                    <span>{job.jobLocation}</span>
                    </div>

                </Card.Body>
              </Card>
            </Row>
      </div>
    </div>
  );
}

export default JobPage;
