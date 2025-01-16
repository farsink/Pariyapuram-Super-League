import React , { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import styled from "styled-components";
import Standings from "../Components/Standings";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
import Overview from "../Components/Overview";
import Fixture from "../Components/Fixture";
import Results from "../Components/Results";
import { useUser } from "@clerk/clerk-react";
import { toast, ToastContainer,Slide } from "react-toastify";


function Home() {
  const [key, setKey] = useState("overview");
  const { user } = useUser(); // Get user data from the context

   useEffect(() => {
     if (user) {
       // Display a toast notification if the user is logged in
       toast.success(`Logged in as ${user.username || user.primaryEmailAddress.emailAddress}`);
     }
   }, [user]);

  return (
    <>
      <StyledWrapper>
        {/* Parallax Section */}
        <div className="parallax-section">
          <div className="overlay">
            <Container>
              <Row>
                <Col className="text-start text-white">
                  <h1 className="display-4 fw-bold">Pariyapuram Super League: Season 8 is Here!</h1>
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        {/* Scrolling Content */}
        <Container fluid className="content-section ">
          <div className="home-content-header d-flex gap-3 mt-3">
            <div className="logo-home">
              <img
                src="../src/assets/psl-logo1.png"
                alt="logo"
                className="img-fluid"
                width="50wv"
                height="50hv"
                style={{ borderRight: "1px solid white", paddingRight: "10px" }} // Inline styles
              />
            </div>
            <h2 className="text-white">SEASON 8</h2>
          </div>
          <hr />
          <div className="tab-section">
            <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="custom-tabs ">
              <Tab eventKey="overview" title="Overview">
                <div className="tab-content-wrapper">
                  <Overview />
                </div>
              </Tab>
              <Tab eventKey="Fixtures" title="Fixtures">
                <div className="tab-content-wrapper">
                  <Fixture />
                </div>
              </Tab>
              <Tab eventKey="results" title="Results">
                <div className="tab-content-wrapper">
                  <Results />
                </div>
              </Tab>
              <Tab eventKey="standings" title="Standings">
                <div className="tab-content-wrapper">
                  <Standings />
                </div>
              </Tab>
              <Tab eventKey="top-players" title="Top Players">
                <div className="tab-content">Top Players content goes here.</div>
              </Tab>
            </Tabs>
          </div>
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="dark"
        />
      </StyledWrapper>
    </>
  );
}
const StyledWrapper = styled.div`
  .parallax-section {
    font-family: "Lexend";
    font-weight: bold;
    height: 80vh;
    background: url("../src/assets/Home.jpg") no-repeat center center fixed;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
  }

  .parallax-section h1,
  .parallax-section p {
    color: white;
  }
  .overlay {
    width: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
  }

  /* Scrolling content section */
  .content-section {
    font-family: "Lexend";
    padding: 2rem;
    background-color: var(--primary-color);
    min-height: 100vh;
  }
  /* Table Styles */
  .tab-section {
    background-color: #fff;
    padding: 1rem;
    border-top: 4px solid #ff6a5c;
    border-radius: 5px;
  }
  .custom-tabs .nav-tabs {
    border-bottom: none;
    justify-content: center;
  }

  .custom-tabs .nav-link {
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    margin-right: 1rem;
    transition: color 0.3s, border-bottom 0.3s;
    padding: 0.5rem 1rem;
    border: none;
  }

  .custom-tabs .nav-link:hover {
    color: #000;
  }

  .custom-tabs .nav-link.active {
    font-weight: bold;
    color: #000;
    border: none;
    border-bottom: 4px solid #000; /* Black underline for the active tab */
  }
  .tab-content {
    margin-top: 1.5rem;
    font-size: 0.9rem;
  }
  .tab-content-wrapper {
    max-height: calc(100vh - 217px);
    overflow-y: auto;
    padding: 1rem;
  }
  .tab-section {
    position: -webkit-sticky;
    position: sticky;
    top: 80px; /* Adjust based on your navbar height */
    z-index: 10;
  }

  /* scroll tabs*/
  ::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Background of the scrollbar track */
  }

  ::-webkit-scrollbar-thumb {
    background: #ff6a5c; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the scrollbar thumb on hover */
  }
`;
export default Home;
