import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function TicketCard({match}) {
    
  return (
    <>
      <Card className="ticket-card d-flex w-100">
        <Card.Body>
          <div className="date">{match.date}</div>
          <div className="league">{match.league}</div>
          <div className="teams">{match.teams}</div>
          <div className="details">
            <span className="time">{match.time}</span>
            <span className="location">{match.location}</span>
          </div>
          <Button variant="success" className="view-tickets-btn">
            View Tickets
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default TicketCard