import React, { useState } from "react";
import { Container, Row, Col, Nav, Navbar, Form, Button, Dropdown, Card } from "react-bootstrap";
import styled from "styled-components";
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";

function Admin() {
  // protect The admin route
  const { isSignedIn, user } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }
  if (user.publicMetadata.role !== "admin") {
    return <p>You do not have access to this page.</p>;
  }

  //   sidebar toggle

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      {" "}
      <StyledWrapper>
        <Container fluid className="dashboard-container">
          <Navbar bg="dark" variant="dark" className="top-bar">
            <Navbar.Brand>Dashboard</Navbar.Brand>
            <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Button variant="outline-light" className="mr-2">
            
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <img src="path_to_profile_picture.jpg" alt="Profile" className="profile-pic" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar>
          <Row className="main-content">
            <Col
              xs={isSidebarOpen ? 3 : 1}
              className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}
            >
              <Button variant="dark" onClick={toggleSidebar} className="toggle-button">
                {isSidebarOpen ? "<" : ">"}
              </Button>
              <Nav className="flex-column">
                <Nav.Link href="#home">Dashboard</Nav.Link>
                <Nav.Link href="#fixtures">Fixtures</Nav.Link>
                <Nav.Link href="#players">Players</Nav.Link>
                <Nav.Link href="#bidding">Bidding</Nav.Link>
                <Nav.Link href="#news">News</Nav.Link>
                <Nav.Link href="#live-streaming">Live Streaming</Nav.Link>
                <Nav.Link href="#tickets">Tickets</Nav.Link>
                <Nav.Link href="#users">Users</Nav.Link>
                <Nav.Link href="#settings">Settings</Nav.Link>
              </Nav>
            </Col>
          
          </Row>
        </Container>
      </StyledWrapper>
    </>
  );
}

const StyledWrapper = styled.div`
  .dashboard-container {
    padding: 0;
    margin: 0;
    height: 100vh;
  }

  .top-bar {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main-content {
    display: flex;
    height: calc(100vh - 56px);
  }

  .sidebar {
    background-color: #343a40;
    color: white;
    transition: width 0.3s;
    overflow: hidden;
  }

  .sidebar.open {
    width: 250px;
  }

  .sidebar.closed {
    width: 60px;
  }

  .sidebar .nav-link {
    color: white;
  }

  .sidebar .nav-link:hover {
    background-color: #495057;
  }

  .toggle-button {
    width: 100%;
    border-radius: 0;
  }

  .content {
    padding: 20px;
    background-color: #f8f9fa;
  }

  .stat-card,
  .chart-card,
  .profile-card {
    margin-bottom: 20px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .stat-card .card-title {
    font-size: 14px;
    color: #6c757d;
  }

  .stat-card .card-text {
    font-size: 24px;
    font-weight: bold;
  }

  .chart-card .card-title {
    font-size: 18px;
    font-weight: bold;
  }

  .profile-card .card-title {
    font-size: 20px;
    font-weight: bold;
  }

  .profile-card .card-text {
    font-size: 16px;
    color: #6c757d;
  }

  .profile-pic {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
`;

export default Admin;
