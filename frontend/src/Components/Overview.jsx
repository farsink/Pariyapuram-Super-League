import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { getNews } from "../Api/ApiList";
import { serverurl } from "../Api/ServerURL";

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
  const [News, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };
    fetchNews();
  }, []);

  return (
    <StyledCard>
      <Container className='my-5'>
        <Row className='justify-content-center'>
          <Col md={8}>
            <Card className='custom-card mb-4'>
              <Card.Img
                variant='top'
                src={News[0]?.image}
                alt='Premier League'
              />
              <Card.Body>
                <Card.Title className='custom-card-title'>
                  {News[0]?.title}
                </Card.Title>

                <Card.Text className='custom-card-subtext'>
                  {News[0]?.description}
                </Card.Text>
              </Card.Body>
            </Card>
            {News?.slice(1).map((card, index) => (
              <Card key={index} className='custom-small-card mb-3'>
                <Card.Body className='d-flex align-items-center'>
                  <Card.Img
                    variant='top'
                    src={card.image}
                    alt={card.title}
                    className='me-3'
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <Card.Title className='custom-small-card-title'>
                      {card.title}
                    </Card.Title>
                    <Card.Text className='custom-small-card-text'>
                      {card.description}
                    </Card.Text>
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
