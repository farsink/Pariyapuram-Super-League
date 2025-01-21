import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Offcanvas,
  Button,
  Accordion,
  Image,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import "../App.css";
import styled from "styled-components";
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const CustomOffcanvas = styled(Offcanvas)`
  z-index: 10; /* Lower z-index for Offcanvas */
`;
const SocialIconsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #242325;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
const OffcanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const OffcanvasContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <div className="mt-3" type="button" onClick={decoratedOnClick}>
      <h4>{children}</h4>
    </div>
  );
}
function Navbarpsl() {
  const [show, setShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useUser(); // Get user data from the context

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
     }
  }, [user]);

  return (
    <Navbar
      className="sticky-top"
      style={{ height: "80px", backgroundColor: "#0D0C1D", color: "#F7F7FF", zIndex: "1000" }}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ">
            <Button
              onClick={show ? handleClose : handleShow}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 25"
                fill="rgb(255, 255, 255)"
                width="24"
                height="24"
              >
                <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
              </svg>
            </Button>

            
              <Nav.Link className="text-white mt-2" as={Link} to={"/tickets"}>
                TICKETS
              </Nav.Link>
           
            <Nav.Link className="text-white mt-2" as={Link} to={"/fixtures"}>
              FIXTURES
            </Nav.Link>
            <Nav.Link className="text-white mt-2" as={Link} to={"/videos"}>
              VIDEOS
            </Nav.Link>
            <Nav.Link className="text-white mt-2" as={Link} to={"/news"}>
              NEWS
            </Nav.Link>
          </Nav>
          <Navbar.Brand >
            <Link to={"/"}>
              <Image
                src="./src/assets/LogoText.png"
                style={{
                  width: "100px",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </Link>{" "}
            {/* Replace with your logo */}
          </Navbar.Brand>
          <Nav className="gap-3 mx-2">
            <Nav.Link as={Link} to={"/search"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M11 2C15.968 2 20 6.032 20 11C20 15.968 15.968 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2ZM11 18C14.8675 18 18 14.8675 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18ZM19.4853 18.0711L22.3137 20.8995L20.8995 22.3137L18.0711 19.4853L19.4853 18.0711Z"></path>
              </svg>{" "}
              {/* Replace with your search icon */}
            </Nav.Link>
            <Nav.Link  as={Link} to={"/notifications"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 15H13V17H11V15ZM13 13.3551V14H11V12.5C11 11.9477 11.4477 11.5 12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.2723 8.5 10.6656 9.01823 10.5288 9.70577L8.56731 9.31346C8.88637 7.70919 10.302 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10C15.5 11.5855 14.4457 12.9248 13 13.3551Z"></path>
              </svg>
            </Nav.Link>
            <Nav.Link as={Link} to={loggedIn ? "/profile" : "/login"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="rgba(255,255,255,1)"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z"></path>
              </svg>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CustomOffcanvas
        show={show}
        onHide={handleClose}
        style={{ backgroundColor: "#242325" }}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="mt-3">
          <Accordion>
            <CustomToggle eventKey="0">NEWS</CustomToggle>

            <Accordion.Collapse eventKey="0">
              <div className="offcanvas-body">
                <h4>LATEST NEWS</h4>
                <h4>ARTICLES</h4>
                <h4>GALLERY</h4>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <Accordion>
            <CustomToggle eventKey="1">TEAMS</CustomToggle>

            <Accordion.Collapse eventKey="1">
              <div className="offcanvas-body">
                <h4>WINNERS</h4>
                <h4>RANKINGS</h4>
                <h4>PLAYERS</h4>
                <h4>STATS</h4>
              </div>
            </Accordion.Collapse>
          </Accordion>

          <Accordion>
            <CustomToggle eventKey="1">SEASONS</CustomToggle>

            <Accordion.Collapse eventKey="1">
              <div className="offcanvas-body">
                <h4>2024-25</h4>
                <h4>2023-24</h4>
                <h4>2022-23</h4>
                <h4>2021-22</h4>
              </div>
            </Accordion.Collapse>
          </Accordion>
          <hr />
          <div className="mt-3">
            <h4>PARTNERS</h4>
            <h4>SEARCH</h4>
            <Link to="/profile">
              <h4>PROFILE</h4>
            </Link>
          </div>

          <SocialIconsContainer className="d-flex justify-content-center gap-5">
            <FaFacebookSquare className="me-2" size={24} />
            <FaInstagram className="me-2" size={24} />
            <FaTwitter className="me-2" size={24} />
            <FaYoutube className="me-2" size={24} />
          </SocialIconsContainer>
        </Offcanvas.Body>
      </CustomOffcanvas>
    </Navbar>
  );
}

export default Navbarpsl;
