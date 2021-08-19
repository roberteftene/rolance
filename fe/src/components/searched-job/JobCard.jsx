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
      <Card className="searched-card" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{this.props.job.jobTitle}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <p className="searched-service-category">
              {this.props.job.categorie}
            </p>
          </Card.Subtitle>
          <Card.Text>{this.props.job.jobDescription}</Card.Text>
          <Card.Link href={`/business/${this.props.job.serviceId}`}>
            View more
          </Card.Link>
        </Card.Body>
      </Card>
    );
  }
}
