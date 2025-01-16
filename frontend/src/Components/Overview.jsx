import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled.div`
  .custom-card {
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .card-container {
    // overflow: scroll;
  }

  .custom-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .custom-card-text {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .custom-card-subtext {
    font-size: 0.9rem;
    color: #555;
  }
  .custom-small-card {
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  .custom-small-card-title {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .custom-small-card-text {
    font-size: 0.875rem;
    color: #555;
    margin-bottom: 0.25rem;
  }

  .custom-small-card-category {
    font-size: 0.75rem;
    color: #999;
  }
`;

function Overview() {
    const smallCards = [
      {
        title: "Carragher is wrong about Trent & Salah contract distractions",
        text: "The ex-Reds defender has portrayed the players with expiring contracts as the problem at Anfield when the truth is that the club is to blame.",
        category: "Opinion",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Slot believes Trent contract standoff could help Liverpool",
        text: "Arne Slot believes Trent Alexander-Arnold’s contract uncertainty could help him motivate the other players in the Liverpool squad.",
        category: "Liverpool",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Liverpool, beware! Resurgent Arsenal primed for all-time title race",
        text: "The Gunners have re-established themselves as Liverpool’s nearest challengers and look primed for a thrilling title chase.",
        category: "Analysis",
        image: "https://via.placeholder.com/150",
      },
      {
        title: "Transfers LIVE: Salah offered three-year deal at PSG",
        text: "GOAL takes a look at the biggest transfer news and rumours from around the world.",
        category: "Transfers",
        image: "https://via.placeholder.com/150",
      },
    ];
    return (
      <StyledCard>
        
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="custom-card mb-4">
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/600x400"
                  alt="Premier League"
                />
                <Card.Body>
                  <Card.Title className="custom-card-title">PREMIER LEAGUE OVERVIEW</Card.Title>
                  <Card.Text className="custom-card-text">
                    Carragher is wrong about Trent & Salah contract distractions
                  </Card.Text>
                  <Card.Text className="custom-card-subtext">
                    The ex-Reds defender has portrayed the players with expiring contracts as the
                    problem at Anfield when the truth is that the club is to blame.
                  </Card.Text>
                </Card.Body>
              </Card>
              {smallCards.map((card, index) => (
                <Card key={index} className="custom-small-card mb-3">
                  <Card.Body className="d-flex align-items-center">
                    <Card.Img
                      variant="top"
                      src={card.image}
                      alt={card.title}
                      className="me-3"
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                    <div>
                      <Card.Title className="custom-small-card-title">{card.title}</Card.Title>
                      <Card.Text className="custom-small-card-text">{card.text}</Card.Text>
                      <Card.Text className="custom-small-card-category">{card.category}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      </StyledCard>
    );
}

export default Overview;