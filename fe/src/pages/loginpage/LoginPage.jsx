import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import SignInHero from "../../_assets/_img/signinHero.png";
import "./LoginPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cogoToast from "cogo-toast";
import { withRouter, useHistory } from "react-router-dom";
import AuthService from "../../services/auth/auth.service";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    if (username.length < 3) {
      cogoToast.error("Username incorrect");
      valid = false;
    }
    if (password.length === 0) {
      cogoToast.error("The password is incorrect");
      valid = false;
    }

    if (valid) {
      AuthService.login(username, password)
        .then((res) => {
          cogoToast.success("Welcome " + username);
          history.push("/home");
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
          Un loc de unde poti angaja usor profesionisti care sa se ocupe de nevoile tale sau de unde iti poti duce cariera ta profesionala la nivelul următor.
          </p>
          <div className="img-container">
            <img src={SignInHero} alt="Graphic image" />
          </div>
        </div>
      </Col>
      <Col className="presentation-col form-col">
        <div className="form-container">
          <h1>Conectare</h1>
          <Form>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Nume utilizator"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleLogin(e)}
            >
              Explore
            </Button>
          </Form>
          <p className="already">
            Nu ai cont?{" "}
            <a href="/signup" className="already-registered">
              Creeaza un cont
            </a>
          </p>
          <p className="already">
            Parola uitata?{" "}
            <a href="/signup" className="already-registered">
              Trimite mail de recuperare
            </a>
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(LoginPage);
