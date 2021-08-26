import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Col, Row } from "react-bootstrap";
import "./JobPage.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoIosCall, IoIosPin } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { BiMessageAdd } from "react-icons/bi";
import Card from "react-bootstrap/Card";
import { FaPhoneAlt } from "react-icons/fa";
import cogoToast from "cogo-toast";
import jobService from "../../services/job-service/job.service";
import authService from "../../services/auth/auth.service";

function JobPage() {
  const idObj = useParams();
  const loggedUser = authService.getLoggedUser();

  const url = window.location;
  const [job, setJob] = useState({});
  const [applicants, setApplicants] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);

  useEffect(() => {
    jobService.getJobById(idObj.id).then((res) => {
      const data = res.data;
      console.log(res.data);
      setJob(data);
      console.log(job);
      if (data.userAccount.id === loggedUser.id) {
        setShowApplicants(true);
      } else {
        setShowApplicants(false);
      }
    });
  }, []);

  const handleJoinJob = () => {
    //TODO: handle apply to job method using service method
    let reqBody = {
      serviceId: idObj.id,
      userId: loggedUser.id,
    };
    jobService
      .applyToJob(reqBody)
      .then((res) => {
        window.alert("Success!");
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  useEffect(() => {
    jobService.getApplicants(idObj.id).then((res) => {
      const data = res.data;
      setApplicants(data);
    });
  }, [idObj, loggedUser]);

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
            <Row style={{ width: "100%" }}>
              <Col
                className="business-second-row-col"
                style={{ maxWidth: "40%" }}
              >
                <span className="business-reviews" style={{ width: "100%" }}>
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
                  {job.userAccount !== undefined ? job.userAccount.email : ""}
                </span>
              </div>
            </Row>
          </Col>
          <Col className="business-shortcut-options-col" sm={6}>
            <div className="business-shortcut-options">
              <button
                className="business-shortcut-options-btn save-business-btn"
                onClick={() => handleJoinJob()}
              >
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
                <span>
                  <b>Descriere: </b>
                </span>
                <span>{job.jobDescription}</span>
              </div>

              <div className="job-card-info-section">
                <span>
                  <b>Categorie: </b>
                </span>
                <span>{job.categorie}</span>
              </div>

              <div className="job-card-info-section">
                <span>
                  <b>Locatie: </b>
                </span>
                <span>{job.jobLocation}</span>
              </div>
            </Card.Body>
          </Card>
        </Row>

        {showApplicants && (
          <Row className="business-shortcuts-row review-section">
            <Card style={{ width: "60%" }}>
              <Card.Title
                className="business-presentation-card-title reviews-card-title "
                style={{ textTransform: "uppercase" }}
              >
                Au aplicat la acest job {applicants.length} persoane
              </Card.Title>
              <Card.Body className="review-section-body">
                {applicants.map((applicant) => {
                  return (
                    <>
                      <Card style={{ width: "3››8rem" }}>
                        <Card.Body
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                          }}
                        >
                          <Card.Title style={{ width: "100%" }}>
                            {" "}
                            <b>Username:</b> {applicant.username}
                          </Card.Title>
                          <Card.Subtitle
                            className="mb-2 text-muted"
                            style={{
                              borderBottom: "2px solid black",
                              width: "100%",
                              paddingBottom: "10px",
                            }}
                          >
                            <b>Email:</b> {applicant.email}
                          </Card.Subtitle>
                          <Card.Text style={{ width: "100%" }}>
                            <div className="">
                              <div className="">
                                <b>Nume: </b>
                                {applicant.userDetails.firstName}{" "}
                                {applicant.userDetails.lastName}
                              </div>
                              <div className="">
                                <b>Telefon: </b>
                                {applicant.userDetails.phone}{" "}
                              </div>
                              <div className="">
                                <b>Oras: </b>
                                {applicant.userDetails.city}{" "}
                              </div>
                              <div className="">
                                <b>Experienta: </b>
                                {
                                  applicant.userDetails.experienceDescription
                                }{" "}
                              </div>
                              <div className="">
                                <b>Aptitudini: </b>
                                {applicant.userDetails.skills}{" "}
                              </div>
                            </div>
                          </Card.Text>
                          <div className="">
                            <Card.Link
                              style={{
                                backgroundColor: "#41976f",
                                color: "#fff",
                                padding: "10px 15px 10px 15px",
                                borderRadius: "5px",
                              }}
                              href={`tel:${applicant.userDetails.phone}`}
                            >
                              <IoIosCall style={{ marginRight: "10px" }} />
                              Apeleaza
                            </Card.Link>
                            <Card.Link
                              style={{
                                backgroundColor: "#41976f",
                                color: "#fff",
                                padding: "10px 15px 10px 15px",
                                borderRadius: "5px",
                              }}
                              href={`mailto:${applicant.email}?subject=Discutie job`}
                            >
                              <MdEmail style={{ marginRight: "10px" }} />
                              Trimite email
                            </Card.Link>
                          </div>
                        </Card.Body>
                      </Card>
                    </>
                  );
                })}
              </Card.Body>
            </Card>
          </Row>
        )}
      </div>
    </div>
  );
}

export default JobPage;
