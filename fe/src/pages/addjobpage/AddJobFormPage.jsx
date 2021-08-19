import { useEffect, useState } from "react";
import "./AddJobFormPage.css";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";
import React from "react";
import { Button } from "react-bootstrap";
import AuthService from "../../services/auth/auth.service";
import { useHistory } from "react-router";
import jobService from "../../services/job-service/job.service";

const labels = {
  1: "Terrible",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function AddJobFormPage() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDuration, setJobDuration] = useState("");
  const [jobPayment, setJobPayment] = useState("");
  const [jobCategory, setJobCategory] = useState("Dezvoltare Software");
  const [skills, setSkills] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const history = useHistory();

  const idObj = useParams();
  const currLoggedUser = AuthService.getLoggedUser();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (currLoggedUser === null) {
      //TODO: api for guest adding review
      console.log("Nu e user");
    } else {
      const reqBody = {
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        jobLocation: jobLocation,
        startDate: visitDate,
        jobDuration: jobDuration,
        jobPayment: jobPayment,
        skills: skills,
        categorie: jobCategory,
      };
      jobService
        .addJob(reqBody, currLoggedUser.token, currLoggedUser.id)
        .then((res) => {
          history.push("/home");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="review-form-container">
      <div className="form-body">
        <div className="form-header">
          <div className="form-header-business">
            <h1>Posteaza job</h1>
            <span>
              Nu mai ezita, sute de profesionisti asteapta sa te ajute cu
              problema ta.
            </span>
          </div>
          <div className="form-header-thanks-block">
            <span className="form-header-thanks">
              Contribuie la cresterea inteligenta a pietei de profesionisti in
              diverse domenii.
              <br></br>
              <b>Multumim in avans!</b>
            </span>
          </div>
        </div>
        <div className="form-content">
          <Form className="review-form">
            <Form.Group controlId="control control-reviewTitle">
              <Form.Label>Titlu job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descriere pe scurt a jobului"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Descriere job</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descrie in cateva fraze ce constituie mai exact jobul pe care il postezi"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Locatie job</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Introduceti orasul unde se va desfasura jobul. Introduceti online in cazul respectiv. "
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewVisit">
              <Form.Label>Data de inceput</Form.Label>
              <Form.Text className="text-muted">
                Introdu data de incepere a jobului (Optional)
              </Form.Text>
              <Form.Control
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                type="date"
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Timp alocat pentru job</Form.Label>
              <Form.Text className="text-muted">
                Ce perioada de timp estimezi ca va fi necesara pentru
                indeplinirea jobului? (Optional)
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Introdu perioada"
                value={jobDuration}
                onChange={(e) => setJobDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Plata job</Form.Label>
              <Form.Text className="text-muted">
                Care este suma estimativa pe care o veti oferi pentru
                indeplinirea jobului? (RON)
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Introduceti valoare plata"
                value={jobPayment}
                onChange={(e) => setJobPayment(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Aptitudini necesare</Form.Label>
              <Form.Text className="text-muted">
                Introuduceti minim 3 aptitudini necesare pentru indeplinirea
                jobului.
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Introduceti aptitudini"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="control control-reviewContent">
              <Form.Label>Categoria jobului</Form.Label>
              <Form.Text className="text-muted">
                Selectati categoria corespunzatoare pentru jobul introdus
              </Form.Text>
             \
            </Form.Group>
          </Form>
        </div>
        <div className="form-footer">
          <Button
            onClick={(e) => handleSubmitReview(e)}
            variant="primary"
            className="submit-review-btn"
          >
            Posteaza jobul
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddJobFormPage;
