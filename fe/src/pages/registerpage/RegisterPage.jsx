import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignUpHero from "../../_assets/_img/signupHero.png";
import Form from "react-bootstrap/Form";
import "./RegisterPage.css";
import React, { useState } from "react";
import { isEmail } from "validator";
import cogoToast from "cogo-toast";
import { withRouter, useHistory } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasService, setHasService] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (username.length < 3) {
      cogoToast.error("Please enter the entire name");
      valid = false;
    }
    if (!isEmail(email)) {
      cogoToast.error("Please enter a valid email");
      valid = false;
    }
    if (password.length < 3) {
      cogoToast.error("Please enter a stronger password");
      valid = false;
    }
    let role = ["user"];
    if (hasService) {
      role.push("employee");
    } else {
      role.push("businessowner");
    }
    console.log(role);

    if (valid) {
      AuthService.register(username, email, password, role)
        .then(() => {
          cogoToast.success("Successfully registered");
          AuthService.login(username, password)
            .then(() => history.push("/accountdetails"))
            .catch((err) => cogoToast.warn(err.message));
        })
        .catch((e) => cogoToast.warn(e.message));
    }
  };

  return (
    <Row>
      <Col className="presentation-col details-col">
        <div className="details-container">
          <h1 className="details-heading">WorkACERs</h1>
          <p className="details-description">
            Un loc de unde poti angaja usor profesionisti care sa se ocupe de
            nevoile tale sau de unde iti poti duce cariera ta profesionala la
            nivelul următor.
          </p>
          <div className="img-container">
            <img src={SignUpHero} alt="Graphic image" />
          </div>
        </div>
      </Col>
      <Col className="presentation-col form-col">
        <div className="form-container">
          <h1>Creeaza cont</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Introdu numele de utilizator"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Introdu adresa de mail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Nu o sa impartasim credentialele cu altcineva.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="Parola"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCheckbox">
              <Form.Text className="text-muted">
                Vreau sa folosesc contul pentru a aplica la diferite joburi in
                cadrul aplicatiei
              </Form.Text>
              <Form.Check
                type="switch"
                label=""
                onChange={(e) => setHasService(e.target.checked)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Urmatorul pas
            </Button>
          </Form>
          <p className="already">
            Ai deja cont?{" "}
            <a href="/signin" className="already-registered">
              Conecteaza-te!
            </a>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(RegisterPage);
