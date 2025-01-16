import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

function Fixture() {
  const matches = [
    {
      homeTeam: "Tottenham Hotspur",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 1,
      awayTeam: "Newcastle United",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 2,
      status: "Full time",
      date: "Yesterday",
    },
    {
      homeTeam: "Aston Villa",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 2,
      awayTeam: "Leicester City",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 1,
      status: "Full time",
      date: "Yesterday",
    },
    {
      homeTeam: "Southampton",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 0,
      awayTeam: "Brentford",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 5,
      status: "Full time",
      date: "Yesterday",
    },
    {
      homeTeam: "Manchester City",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 4,
      awayTeam: "West Ham United",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 1,
      status: "Full time",
      date: "Yesterday",
    },
    {
      homeTeam: "AFC Bournemouth",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 1,
      awayTeam: "Everton",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 0,
      status: "Full time",
      date: "Yesterday",
    },
    {
      homeTeam: "Crystal Palace",
      homeLogo: "https://via.placeholder.com/30",
      homeScore: 1,
      awayTeam: "Chelsea",
      awayLogo: "https://via.placeholder.com/30",
      awayScore: 1,
      status: "Full time",
      date: "Yesterday",
    },
  ];
  return (
    <>
    <StyledWrapper>
      <Container className="my-5">
        <h4>Matchday 20</h4>
        <Row className="g-4">
          {matches.map((match, index) => (
            <Col key={index} md={4}>
              <Card className="match-card">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        src={match.homeLogo}
                        alt={match.homeTeam}
                        className="me-2"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <span>{match.homeTeam}</span>
                    </div>
                    <span className="match-score">{match.homeScore}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex align-items-center">
                      <img
                        src={match.awayLogo}
                        alt={match.awayTeam}
                        className="me-2"
                        style={{ width: "24px", height: "24px" }}
                      />
                      <span>{match.awayTeam}</span>
                    </div>
                        <span className="match-score">{match.awayScore}</span>
                  </div>
                  <div className="text-center mt-3">
                    <span className="match-status">{match.status}</span>
                    <span className="match-date">{match.date}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      </StyledWrapper>
    </>
  );
}

export default Fixture;

const StyledWrapper = styled.div`
  .match-card {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    padding: 1rem;
  }

  .match-score {
    font-size: 1.25rem;
    font-weight: bold;
  }

  .match-status {
    font-size: 0.875rem;
    color: #555;
    display: block;
  }

  .match-date {
    font-size: 0.875rem;
    color: #999;
  }
`;
