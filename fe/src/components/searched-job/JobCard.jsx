import { Component } from "react";
import Card from "react-bootstrap/Card";
import "./JobCard.css";

export default class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card className="searched-card" style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Titlu job - {this.props.job.jobTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <p className="searched-service-category">
              Categorie job - {this.props.job.categorie}
            </p>
          </Card.Subtitle>
          <Card.Text>
            <span>
            Descriere - {this.props.job.jobDescription}
            </span>
            <br></br>
            <span>
              Durata - {this.props.job.jobDuration}
            </span>
            <br></br>
            <span>
              Locatie - {this.props.job.jobLocation}
            </span>
            <br></br>
            <span>
              Pret incepand de la - {this.props.job.jobPayment} RON
            </span>
            </Card.Text>
          <Card.Link href={`/job/${this.props.job.jobId}`}>
            Citeste mai mult
          </Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
