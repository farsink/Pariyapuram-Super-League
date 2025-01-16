
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

function Results() {
    
const matches = [
  { home: "Spurs", away: "Newcastle", score: "1-2", stadium: "Tottenham Hotspur Stadium, London" },
  { home: "Aston Villa", away: "Leicester", score: "2-1", stadium: "Villa Park, Birmingham" },
  { home: "Bournemouth", away: "Everton", score: "1-0", stadium: "Vitality Stadium, Bournemouth" },
  {
    home: "Crystal Palace",
    away: "Chelsea",
    score: "1-1",
    stadium: "Selhurst Park, London",

  },
  { home: "Man City", away: "West Ham", score: "1-1", stadium: "Etihad Stadium, Manchester" },
  {
    home: "Southampton",
    away: "Brentford",
    score: "0-5",
    stadium: "St. Mary's Stadium, Southampton",
  },
  { home: "Brighton", away: "Arsenal", score: "1-1", stadium: "American Express Stadium, Falmer" },
];
  return (
    <><StyledWrapper>
      <Container fluid className="match-fixture">
        {matches.map((match, index) => (
          <Row key={index} className={`match-row`}>
            <Col xs={2} className="team-logo">
              <img src={`/logos/${match.home.replace(" ", "_")}.png`} alt={`${match.home} logo`} />
              {match.home}
            </Col>
            <Col xs={2} className="score text-center">
              {match.score}
            </Col>
            <Col xs={2} className="team-logo text-right">
              <img src={`/logos/${match.away.replace(" ", "_")}.png`} alt={`${match.away} logo`} />
              {match.away}
            </Col>
            <Col xs={6} className="stadium text-right">
              <span className="stadium-icon">&#127971;</span> {match.stadium}
            </Col>
          </Row>
        ))}
      </Container>
      </StyledWrapper>
    </>
  );
}

export default Results

const StyledWrapper = styled.div`
  .match-fixture {
    padding: 20px;
    background-color: #f8f9fa;
  }

  .match-row {
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .match-row:hover {
    background: linear-gradient(90deg, #6a0dad, #c012c6);
    color: white;
  }

  
  .team-logo {
    display: flex;
    align-items: center;
  }

  .team-logo img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  .score {
    font-weight: bold;
  }

  .stadium {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .stadium-icon {
    margin-right: 5px;
  }

  @media (max-width: 768px) {
    .team-logo img {
      width: 25px;
      height: 25px;
    }

    .score {
      font-size: 1rem;
    }

    .stadium {
      font-size: 0.9rem;
    }
  }
`;