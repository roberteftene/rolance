import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./AccountDetailsPage.css";
import RocketImage from "../../_assets/_img/7750-[Converted].png";
import AuthService from "../../services/auth/auth.service";
import AccountDetailsService from "../../services/account-details/accountdetails.service";
import cogoToast from "cogo-toast";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";

function AccountDetailsPage() {
  const currentUser = AuthService.getLoggedUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [servicePhone, setServicePhone] = useState("");
  const [serviceCity, setServiceCity] = useState("");
  const [serviceCountry, setServiceCountry] = useState("");
  const [isServiceOwner, setIsServiceOwner] = useState(true);
  const [experience, setExperience] = useState("")
  const [skills, setSkills] = useState("")
  const history = useHistory();

  const subscriptions = [{type:"Lunara",value:40}, {type:"Anuala", value: 400}]

  useEffect(() => {
    if (currentUser.roles.includes("ROLE_EMPLOYEE")) {
      setIsServiceOwner(false);
      console.log(currentUser);
      console.log(currentUser.roles.length);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isServiceOwner) {
      AccountDetailsService.saveUserDetails(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          phone: servicePhone,
          country: serviceCountry,
          city: serviceCity,
          experienceDescription: experience,
          skills: skills
        },
        currentUser.token,
        currentUser.id,
      )
        .then(() => {
          history.push("/home");
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log("muie")
      AccountDetailsService.saveUserDetails(
        {
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          phone: servicePhone,
          country: serviceCountry,
          city: serviceCity,
        },
        currentUser.token,
        currentUser.id,
      )
        .then(() => {
          history.push("/home");
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="detailsPage-container">
      <Row className="greetings-container">
        <Col sm={7} className="greetings-block-col">
          <div className="greetings-block">
            <h1 className="greetings-heading">Hi {currentUser.username}!</h1>
            <p className="greetings-message">
              We are glad to see that you want to integrate your business in our
              hub. Please provide us a few more infos about you and your
              business before we get started.
            </p>
          </div>
        </Col>
        <Col sm={4}>
          <div className="greetings-image">
            <img src={RocketImage} alt="rocket" className="greetings-rocket" />
          </div>
        </Col>
      </Row>
      <Row className="additional-details-form-row">
        <div className="additional-details-form">
          <Form className="details-form">
            <h3 className="details-form-headThree">Detalii personale</h3>
            <Form.Group controlId="formFirstName">
              <Form.Label>Prenume</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdu prenumele"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Nume de familie</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdu numele de familie"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Data de nastere</Form.Label>
              <Form.Control
                type="date"
                placeholder="Introdu data de nastere"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formServicePhone">
              <Form.Label>Numar de telefon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdu numar de telefon"
                value={servicePhone}
                onChange={(e) => setServicePhone(e.target.value)}
              />
            </Form.Group>
            <h5>Locatie</h5>
            <Form.Group controlId="formCity">
              <Form.Label>Oras</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdu orasul"
                value={serviceCity}
                onChange={(e) => setServiceCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStreet">
              <Form.Label>Tara</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introdu tara"
                value={serviceCountry}
                onChange={(e) => setServiceCountry(e.target.value)}
              />
            </Form.Group>
            
            {!isServiceOwner && (
              <>
                <h5>Experienta si calificare</h5>
                <Form.Group controlId="formServiceStreetNumber">
                  <Form.Label>Experiente anterioare in domeniu</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Introdu cateva cuvinte legate de experienta ta profesionala"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formServiceStreetNumber">
                  <Form.Label>Calificari</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="Introdu calificarile tale"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            {isServiceOwner === true && (
              <>
                <h3 className="details-form-headThree">Abonament</h3>
                <p className="working-hours-description">
                  Plata va fi gestionat de un serviciu extern
                </p>
                <Form.Control
                  as="select"
                  controlid="subscriptionType"
                  className="subscriptionType"
                >
                  <option value="2">Lunar</option>
                  <option value="3">Anual</option>
                </Form.Control>
                <div className="subscription-container">
                  {subscriptions.map((elem) => {
                    return (
                      <div
                        key={elem.type}
                        className={`card-container card-${elem.type}-container`}
                      >
                        <Card id={`card-${elem.type}`}>
                          <Card.Body>
                            <Card.Title>Plata {elem.type}</Card.Title>
                            <Card.Subtitle>
                              {elem.value} RON
                            </Card.Subtitle>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Start Exploring
            </Button>
          </Form>
        </div>
      </Row>
    </div>
  );
}

export default AccountDetailsPage;
