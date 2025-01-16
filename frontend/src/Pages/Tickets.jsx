import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import TicketCard from "../Components/TicketCard";

const StyledWrapper = styled.div`
  background-image: url("../src/assets/background_white.png");
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  padding: 0;

  .tickets-container {
    height: 20vh;
    background-image: url("../src/assets/ticket-gradient.png");
    background-size: cover;
  }
  .ticket-card {
    margin-bottom: 15px;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .ticket-card .card-body {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .date {
    font-size: 12px;
    color: #888;
    margin-bottom: 10px;
    

  }

  .league {
    font-size: 14px;
    color: #555;
    margin-bottom: 10px;
  }

  .teams {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .time,
  .location {
    font-size: 14px;
    color: #777;
  }

  .time {
    margin-right: 10px;
  }

  .view-tickets-btn {
    justify-content: end
    padding: 10px 0;
    font-size: 16px;
    border-radius: 25px;
  }
`;

function Tickets() {
const matches = [
  {
    date: "JAN 15 2025",
    league: "ENGLISH PREMIER LEAGUE",
    teams: "Arsenal vs Tottenham Hotspur",
    time: "20:00",
    location: "Emirates Stadium, London, United Kingdom",
  },
  {
    date: "JAN 16 2025",
    league: "ENGLISH PREMIER LEAGUE",
    teams: "Manchester United vs Southampton",
    time: "20:00",
    location: "Old Trafford, Manchester, United Kingdom",
  },
  {
    date: "JAN 18 2025",
    league: "ENGLISH PREMIER LEAGUE",
    teams: "Arsenal vs Astonm",
    time: "17:30",
    location: "Emirates Stadium, London, United Kingdom",
  },
  {
    date: "JAN 19 2025",
    league: "ENGLISH PREMIER LEAGUE",
    teams: "Manchester United vs Brighton & Hove Albion",
    time: "14:00",
    location: "Old Trafford, Manchester, United Kingdom",
  },
];
  return (
    <>
      <StyledWrapper>
        <Container fluid className="tickets-container d-flex align-items-center ">
          <h1
            className="text-white mx-5"
            style={{ fontSize: "50px", fontWeight: "bold", fontFamily: "Lexend" }}
          >
            Tickets.
          </h1>
        </Container>
        <Container className="d-flex mt-5">
          <Row>
            {matches.map((match, index) => (
              <Col xs={12}  key={index}>
                <TicketCard match={match} />
              </Col>
            ))}
          </Row>
        </Container>
      </StyledWrapper>
    </>
  );
}

export default Tickets;
