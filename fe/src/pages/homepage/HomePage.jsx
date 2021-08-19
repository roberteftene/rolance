import "./HomePage.css";
import { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import abstractBanner from "../../_assets/_img/aaron-burden-qJrg0ANseFE-unsplash.jpg";
import Form from "react-bootstrap/Form";
import { FaRocket } from "react-icons/fa";
import AuthService from "../../services/auth/auth.service";
import { Container } from "react-bootstrap";
import jobService from "../../services/job-service/job.service";
import JobCard from "../../components/searched-job/JobCard";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobsLocations: new Set(),
      jobsSearched: [],
    };
    this.currentUser = AuthService.getLoggedUser();
  }

  componentDidMount() {
    jobService.getJobsLocation().then((res) => {
      let data = new Set();
      res.data.forEach((el) => {
        data.add(el);
      });

      this.setState({ jobsLocations: data });
    });
  }

  handleExplore = () => {
    //TODO: call filter api\
    const location = document.querySelector(".locationSelect").value;
    const category = document.querySelector(".categorySelect").value;
    const price = document.querySelector(".priceSelect").value;
    const skills = document.querySelector(".skillSelect").value;

    let options = {
      city: location,
      category: category,
      price: price,
      skills: skills,
    };
    console.log(options);
    jobService
      .getJobsFiltered({
        city: location,
        category: category,
        price: price,
        skills: skills,
      })
      .then((res) => {
        const jobs = res.data;
        this.setState({ jobsSearched: jobs });
      });
  };

  businessesArrayToGridArray(totalCols) {
    let gridArray = [[]];
    let countColumns = 1;
    for (var i = 0; i < this.state.jobsSearched.length; i++) {
      gridArray[gridArray.length - 1].push(this.state.jobsSearched[i]);
      if (countColumns <= totalCols) {
        countColumns++;
      }
      if (
        countColumns > totalCols &&
        i !== this.state.jobsSearched.length - 1
      ) {
        countColumns = 1;
        gridArray.push([]);
      }
    }
    return gridArray;
  }

  render() {
    let gridArray = this.businessesArrayToGridArray(3);
    return (
      <div className="container-homepage-big">
        <div className="homePage-container">
          <Card className="homepage-search-card" style={{ width: "85%" }}>
            <Card.Img
              variant="top"
              className="header-banner"
              src={abstractBanner}
            />
            <Card.Body>
              <Card.Title className="homepage-search-title">
                Salut <b>{this.currentUser.username}</b>, spor la cautat!
              </Card.Title>
              <Card.Text className="homepage-search-description">
                Te rugam sa introduceti detaliile potrive in campurile de mai
                jos pentru o cautare cat mai exacta.
              </Card.Text>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="typeOfServiceControlSelect">
                      <Form.Label>Locatie job</Form.Label>
                      <Form.Control
                        as="select"
                        custom
                        className="locationSelect"
                      >
                        {[...this.state.jobsLocations].map((el) => {
                          return <option>{el}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="locationControlSelect">
                      <Form.Label>Categorie</Form.Label>
                      <Form.Control
                        as="select"
                        controlid="subscriptionType"
                        className="categorySelect"
                      >
                        <option value="Altceva">Altceva</option>
                        <option value="Dezvoltare Software">
                          Dezvoltare Software
                        </option>
                        <option value="Agricultura">Agricultura</option>
                        <option value="Constructii">Constructii</option>
                        <option value="Service">Service</option>
                        <option value="Instalatii">Instalatii</option>
                        <option value="Amenajari">Amenajari</option>
                        <option value="Protectie si paza">
                          Protectie si paza
                        </option>
                        <option value="Menaj/Curatenie">Menaj/Curatenie</option>
                        <option value="Imobiliare">Imobiliare</option>
                        <option value="Logistica">Logistica</option>
                        <option value="Audit">Audit</option>
                        <option value="Financiar/Contabilitate">
                          Financiar/Contabilitate
                        </option>
                        <option value="T Hardware">IT Hardware</option>
                        <option value="Suport IT">Suport IT</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Telecomunicatii">Telecomunicatii</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Copyrighting">Copyrighting</option>
                        <option value="Promoter">Promoter</option>
                        <option value="Managment">Managment</option>
                        <option value="Publicitate">Publicitate</option>
                        <option value="Juridic">Juridic</option>
                        <option value="Traduceri">Traduceri</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Educatie">Educatie</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="control control-reviewContent">
                      <Form.Label>Prag suma acordata</Form.Label>
                      <Form.Control
                        type="text"
                        className="priceSelect"
                        placeholder="Introduceti pragul dorit (RON)"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="control control-reviewContent">
                      <Form.Label>Aptitudini</Form.Label>
                      <Form.Control
                        type="text"
                        className="skillSelect"
                        placeholder="Introduceti aptitudinile"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
              <Button
                style={{ width: "20%" }}
                className="homepage-btn-explore"
                variant="primary"
                onClick={() => this.handleExplore()}
              >
                <FaRocket></FaRocket> Explorati
              </Button>
            </Card.Body>
          </Card>

          <div className="searched-container">
            {gridArray.map((row) => {
              return (
                <Row>
                  {row.map((col) => {
                    return (
                      <Col>
                        <JobCard job={col} ></JobCard>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
