import { Component } from "react";
import "./ProfilePage.css";
import Navbar from "react-bootstrap/Navbar";
import { Button, Form, Nav } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import UserDetailsCard from "../../components/userdetailscard/UserDetailsCard";
import UserPointsCard from "../../components/userpointscard/UserPointsCard";
import Card from "react-bootstrap/Card";
import jobService from "../../services/job-service/job.service";
import authService from "../../services/auth/auth.service";
import Modal from "react-bootstrap/Modal";

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.loggedUser = authService.getLoggedUser();
    this.state = {
      jobsApplied: [],
      isEmployee: false,
      userJobs: [],
      showReviewModal: false,
      hasAccount: false,
      closebleJobId: 0,
    };
    this.handleCloseJob = this.handleCloseJob.bind(this)
    this.handleDeleteJob = this.handleDeleteJob.bind(this)
  }

  handleOptionClick = (e) => {
    const optionArray = document.querySelectorAll(".navbar-nav")[0];
    optionArray.childNodes.forEach((element) => {
      element.classList.remove("profile-active-option");
    });
    const optionClicked = document.querySelectorAll(
      `.${e.target.classList[0]}`
    )[0];
    optionClicked.classList.add("profile-active-option");
  };

  componentDidMount() {
   
  }

  componentDidMount() {
    const userLogged = authService.getLoggedUser();
    if (userLogged.roles.includes("ROLE_EMPLOYEE")) {
      this.setState({ isEmployee: true });
    } else {
      jobService.getUserJobs(userLogged.id).then((res) => {
        const data = res.data;
        this.setState({ userJobs: data });
      });
    }
    jobService.getJobsApplied(this.loggedUser.id).then((res) => {
      const data = res.data;
      this.setState({ jobsApplied: data });
    });
  }

  handleCloseJob = (id) => {
    this.setState({ showReviewModal: true,closebleJobId:id });
    
  };

  handleDeleteJob = (e) => {
    jobService.closeJob(this.state.closebleJobId).then((res) => {
        window.alert("Job closed!")
        window.location.reload()
    }).catch((err) => {
        window.alert(err)
    })
  };
  render() {
    return (
      <div className="profile-page-container">
        <div className="profile-page-new-container">
          <Row className="profile-top-row">
            <Col>
              <UserPointsCard></UserPointsCard>
            </Col>
            <Col>
              <Row>
                <UserDetailsCard></UserDetailsCard>
              </Row>
            </Col>
          </Row>

          {this.state.isEmployee === false && (
            <>
              <Row className="profile-top-row">
                <Card style={{ width: "75%" }}>
                  <Card.Title
                    className="business-presentation-card-title reviews-card-title "
                    style={{ textTransform: "uppercase" }}
                  >
                    Ai incarcat {this.state.userJobs.length} joburi!
                  </Card.Title>
                  <Card.Body className="review-section-body">
                    {this.state.userJobs.map((job) => {
                      return (
                        <>
                          <Card style={{ width: "48rem", marginTop: "25px" }}>
                            <Card.Body
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                              }}
                            >
                              <Card.Title style={{ width: "100%" }}>
                                {" "}
                                <b>Titlu job:</b> {job.jobTitle}
                              </Card.Title>
                              <Card.Subtitle
                                className="mb-2 text-muted"
                                style={{
                                  borderBottom: "2px solid black",
                                  width: "100%",
                                  paddingBottom: "10px",
                                }}
                              >
                                <b>Categorie:</b> {job.categorie}
                              </Card.Subtitle>
                              <Card.Text style={{ width: "100%" }}>
                                <div className="">
                                  <div className="">
                                    <b>Descriere job: </b>
                                    {job.jobDescription}{" "}
                                  </div>
                                  <div className="">
                                    <b>Perioada de timp: </b>
                                    {job.jobDuration}{" "}
                                  </div>
                                  <div className="">
                                    <b>Locatie: </b>
                                    {job.jobLocation}{" "}
                                  </div>
                                  <div className="">
                                    <b>Aptitudini necesare: </b>
                                    {job.skills}{" "}
                                  </div>
                                  <div className="">
                                    <b>Data incepere: </b>
                                    {job.startDate}{" "}
                                  </div>
                                  <div className="">
                                    <b>Plata: </b>
                                    {job.jobPayment} RON
                                  </div>
                                </div>
                              </Card.Text>
                              <div className="">
                                <Button
                                  style={{
                                    backgroundColor: "#41976f",
                                    color: "#fff",
                                    padding: "10px 15px 10px 15px",
                                    borderRadius: "5px",
                                  }}
                                  onClick={(jobId) => this.handleCloseJob(job.jobId)}
                                >
                                  Inchide job
                                </Button>
                              </div>
                            </Card.Body>
                          </Card>
                        </>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Row>
            </>
          )}
          {this.state.isEmployee === true && (
            <Row className="profile-top-row">
              <Card style={{ width: "75%" }}>
                <Card.Title
                  className="business-presentation-card-title reviews-card-title "
                  style={{ textTransform: "uppercase" }}
                >
                  Ai aplicat la {this.state.jobsApplied.length} joburi
                </Card.Title>
                <Card.Body className="review-section-body">
                  {this.state.jobsApplied.map((job) => {
                    return (
                      <>
                        <Card style={{ width: "38rem" }}>
                          <Card.Body
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Card.Title style={{ width: "100%" }}>
                              {" "}
                              <b>Titlu job:</b> {job.jobTitle}
                            </Card.Title>
                            <Card.Subtitle
                              className="mb-2 text-muted"
                              style={{
                                borderBottom: "2px solid black",
                                width: "100%",
                                paddingBottom: "10px",
                              }}
                            >
                              <b>Categorie:</b> {job.categorie}
                            </Card.Subtitle>
                            <Card.Text style={{ width: "100%" }}>
                              <div className="">
                                <div className="">
                                  <b>Descriere job: </b>
                                  {job.jobDescription}{" "}
                                </div>
                                <div className="">
                                  <b>Perioada de timp: </b>
                                  {job.jobDuration}{" "}
                                </div>
                                <div className="">
                                  <b>Locatie: </b>
                                  {job.jobLocation}{" "}
                                </div>
                                <div className="">
                                  <b>Aptitudini necesare: </b>
                                  {job.skills}{" "}
                                </div>
                                <div className="">
                                  <b>Data incepere: </b>
                                  {job.startDate}{" "}
                                </div>
                                <div className="">
                                  <b>Plata: </b>
                                  {job.jobPayment} RON
                                </div>
                              </div>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </>
                    );
                  })}
                </Card.Body>
              </Card>
            </Row>
          )}
          <Modal
            show={this.state.showReviewModal}
            onHide={() => this.setState({ showReviewModal: false })}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Formular de feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formCheckbox">
                  <Form.Text className="text-muted">
                    Angajatul are cont?
                  </Form.Text>
                  <Form.Check
                    type="switch"
                    label="Da"
                    onChange={(e) =>
                      this.setState({ hasAccount: e.target.checked })
                    }
                  ></Form.Check>
                </Form.Group>

                {this.state.hasAccount === true && (
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Nume de utilizator</Form.Label>
                      <Form.Text className="text-muted">
                        Introduceti numele de utilizator al angajatului
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Introduceti numele de utlizator"
                      />
                    </Form.Group>
                  </Form>
                )}

                {this.state.hasAccount === false && (
                  <>
                    <Form.Group controlId="formClientName">
                      <Form.Label>Nume angajat</Form.Label>
                      <Form.Text className="text-muted">
                        Introduceti numele complet al angajatului
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Introduceti numele angajatului"
                      />
                    </Form.Group>
                  </>
                )}

                <Form.Group controlId="formDetails">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Introduceti feedback ul vostru pentru angajat"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.setState({ showReviewModal: false })}
              >
                Inchide
              </Button>
              <Button
                variant="primary"
                onClick={(e) => this.handleDeleteJob(e)}
              >
                Trimite
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}
