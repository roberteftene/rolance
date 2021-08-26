import "./UserPointsCard.css";
import Card from "react-bootstrap/Card";
import userPng from "../../_assets/_img/userprofileimg.png";
import AuthService from "../../services/auth/auth.service";
import { Col, Row } from "react-bootstrap";
import { AiFillHeart } from "react-icons/ai";
import { MdTagFaces } from "react-icons/md";
import { GiRank3 } from "react-icons/gi";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
function UserPointsCard() {
  const currLoggedUser = AuthService.getLoggedUser();

  const popoverFidelityPoints = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Rank</Popover.Title>
      <Popover.Content>
        <strong>Anagajtul </strong> obtine un anumit rank in urma recenziilor si aprecierilor de la angajatori.
      </Popover.Content>
    </Popover>
  );

  const popoverNoReviews = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Recenzi</Popover.Title>
      <Popover.Content>
      <strong>Angajatorul </strong> are posibilitatea sa lase o recenzie la finalul unui job. Aceste recenzii cresc rank-ul angajatului.
      </Popover.Content>
    </Popover>
  );

  const popoverNoLikes = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Apreciere de la angajator</Popover.Title>
      <Popover.Content>
      <strong>Angajatorul </strong> poate lasa anagajatului un anumit punctaj la finalul jobului.
      </Popover.Content>
    </Popover>
  );

  return (
    <div className="user-points-card-container">
      <Card className="user-points-card" style={{ width: "50%" }}>
        <div className="profile-png-container">
          <Card.Img className="profile-png" variant="top" src={userPng} />
        </div>
        <Card.Body>
          <Card.Title>{currLoggedUser.username}</Card.Title>
          <Card.Subtitle className="user-points-card-subtitle">
            Tine cursorul deasupra numerelor pentru a primi informatii.
          </Card.Subtitle>
          <Row>
            <Col>
              <div className="points-status points-status-reviews">
                <AiFillHeart className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="left"
                  overlay={popoverNoLikes}
                >
                  <span className="points">138</span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <div className="points-status points-status-likes">
                <MdTagFaces className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="bottom"
                  overlay={popoverNoReviews}
                >
                  <span className="points">240</span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <div className="points-status points-status-fidelity">
                <GiRank3 className="points-icon" />
                <OverlayTrigger
                  trigger="hover"
                  placement="right"
                  overlay={popoverFidelityPoints}
                >
                  <span className="points">24</span>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserPointsCard;
