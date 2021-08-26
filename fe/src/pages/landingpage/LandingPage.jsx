import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import heroOne from "../../_assets/_img/landing-hero-one.jpg";
import heroTwo from "../../_assets/_img/fifth-hero.png";
import heroThird from "../../_assets/_img/third-hero.png";
import heroFourth from "../../_assets/_img/fourth-hero.png";
import heroFive from "../../_assets/_img/landing-hero-two.jpg";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import React from "react";
import * as $ from "jquery";
import "./LandingPage.css";
import { useHistory } from "react-router";

const LandingPage = (props) => {
 
    const history = useHistory();

  $(function () {
    $(document).scroll(function () {
      var $nav = $(".landing-nav");
      $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
  });

  $(document).ready(() => {
    $(".second-hero").waypoint(
      () => {
        $(".second-hero").css({
          animation: "animate-heroes-left 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".third-hero").waypoint(
      () => {
        $(".third-hero").css({
          animation: "animate-heroes-right 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".fourth-hero").waypoint(
      () => {
        $(".fourth-hero").css({
          animation: "animate-heroes-left 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  $(document).ready(() => {
    $(".five-hero").waypoint(
      () => {
        $(".five-hero").css({
          animation: "animate-heroes-right 1s",
          opacity: "1",
        });
      },
      { offset: "75%" }
    );
  });

  const script = document.createElement("script");
  script.src = "../../../public/_assets/js/jquery.waypoints.min.js";
  script.async = true;
  document.body.appendChild(script);

  return (
    <div className="landing-layout">
      <Navbar className="landing-nav" fixed="top">
        <Navbar.Brand href="#">Workacer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
          <Nav.Link href="#home">Cauta joburi</Nav.Link>
          <Nav.Link href="#home">Posteaza un job</Nav.Link>
            <Nav.Link href="/signin">Log in</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <section id="header-section">
        <Row>
          <Col className="header-details-col">
            <h1 className="header-heading">
              Solutii de freelancing <span className="header-head">proiectate pentru tine</span>
            </h1>
            <p className="header-subheading">
              Gasesti oameni talentati. Construieste-ti afacerea. Condu-ti cariera catre urmatorul nivel.
            </p>
            <div className="header-btn-options">
              <Button
                className="btn btn-explore"
                variant="primary"
                onClick={() => {
                  history.push("/home");
                }}
              >
                Cauta joburi
              </Button>
              <Button className="btn btn-integrate" variant="outline-primary">
                Posteaza un job
              </Button>
            </div>
          </Col>
          <Col>
            <img
              className="heroOne"
              src={heroOne}
              alt="Table with 6 persons"
            ></img>
          </Col>
        </Row>
      </section>
      <section id="second-section">
        <Container className="second-section-row">
          <Row>
            <Col>
              <img
                className="second-hero hero-left"
                src={heroTwo}
                alt="Vector graphic"
              ></img>
            </Col>
            <Col className="second-details-col">
              <h1 className="second-heading">
                Alege un specialist pentru nevoile tale 
              </h1>
              <p className="second-description">
                Cu WorkAcer ai garantia ca vei lucra cu cele mai potrivite persoane in privinta nevoilor tale
              </p>
              <Button
                className="btn btn-explore btn-expore-second"
                variant="secondary"
              >
                Posteaza un job
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-three">
        <Container>
          <Row className="third-row">
            <Col className="third-details">
              <h1 className="third-heading">
                Afla parerea celorlati
              </h1>
              <p className="header-subheading">
                Cu WorkAcer poti verifica experienta altor clienti inainte de a alege un liber profesionist pentru nevoia ta.
              </p>
            </Col>
            <Col>
              <img
                className="third-hero hero-right"
                src={heroThird}
                alt="Review graphic"
              ></img>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-four">
        <Container className="second-section-row">
          <Row>
            <Col>
              <img
                className="fourth-hero hero-left"
                src={heroFourth}
                alt="Vector graphic"
              ></img>
            </Col>
            <Col className="fourth-details-col">
              <h1 className="fourth-heading">
                Pune-ti cunostiintele in lumina
              </h1>
              <p className="second-description">
                Workacer ofera spatiul potrivit pentru orice persoana care detine anumite skill-uri in diverse domenii si isi doreste sa le valorifice
              </p>
              <Button
                className="btn btn-explore btn-expore-second"
                variant="secondary"
              >
                Cauta un job
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="section-five">
        <Container>
          <Row className="third-row">
            <Col className="third-details">
              <h1 className="third-heading">
                Verifica oferta completa
              </h1>
              <p className="header-subheading">
                Gaseste-ti inspiratia in cele peste 100 de skill-uri disponibile in aplicatia noastra
              </p>

              <Form className="five-form" inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Cauta acum</Button>
              </Form>
            </Col>
            <Col>
              <img
                className="five-hero"
                src={heroFive}
                alt="Review graphic"
              ></img>
            </Col>
          </Row>
        </Container>
      </section>

      <footer>
        <Container className="footer-container">
          <Row>
            <Col>
              <p className="footer-logo">WorkAcer</p>
            </Col>
            <Col>
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Add service</a>
                  </li>
                  <li>
                    <a href="#">Log in</a>
                  </li>
                  <li>
                    <a href="#">Register</a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className="footer-menu footer-ref">
                <ul>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by macrovector / Freepik
                    </a>
                  </li>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by pikisuperstar / Freepik
                    </a>
                  </li>
                  <li>
                    <a href="http://www.freepik.com">
                      Designed by katemangostar / Freepik
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
