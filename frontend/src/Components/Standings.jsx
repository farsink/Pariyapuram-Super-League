import React from "react";
import { Card, Table, Container } from "react-bootstrap";
import styled from "styled-components";

const StyledTable = styled.div`
  .rounded-card {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
  }

  .rounded-card th,
  .rounded-card td {
    padding: 0.75rem;
    text-align: center;
  }

  .rounded-card th {
    background-color: #f8f9fa;
  }

  .top-four td {
    position: relative;
  }

  .top-four td::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: green;
  }
`;
function Standings() {
  const teams = [
    {
      pos: 1,
      team: "Liverpool",
      p: 18,
      w: 14,
      d: 3,
      l: 1,
      gd: 28,
      pts: 45,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 2,
      team: "Arsenal",
      p: 20,
      w: 11,
      d: 7,
      l: 2,
      gd: 21,
      pts: 40,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 3,
      team: "Nottingham",
      p: 19,
      w: 11,
      d: 4,
      l: 4,
      gd: 7,
      pts: 37,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 4,
      team: "Chelsea",
      p: 20,
      w: 10,
      d: 6,
      l: 4,
      gd: 15,
      pts: 36,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 5,
      team: "Newcastle",
      p: 20,
      w: 10,
      d: 5,
      l: 5,
      gd: 12,
      pts: 35,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 6,
      team: "Manchester",
      p: 20,
      w: 10,
      d: 4,
      l: 6,
      gd: 9,
      pts: 34,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 7,
      team: "Bournemouth",
      p: 20,
      w: 9,
      d: 6,
      l: 5,
      gd: 7,
      pts: 33,
      logo: "https://via.placeholder.com/30",
    },
    {
      pos: 8,
      team: "Aston Villa",
      p: 20,
      w: 9,
      d: 5,
      l: 6,
      gd: -2,
      pts: 32,
      logo: "https://via.placeholder.com/30",
    },
  ];
  return (
    <StyledTable>
      <Container className="my-5">
        <Card className="rounded-card">
          <Card.Body className="p-0">
            <Table responsive className="table-striped">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Team</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>+/-</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={index} className={team.pos <= 4 ? "top-four" : ""}>
                    <td>{team.pos}</td>
                    <td className="d-flex align-items-center">
                      <img
                        src={team.logo}
                        alt={team.team}
                        className="me-2"
                        style={{ width: "24px", height: "24px" }}
                      />
                      {team.team}
                    </td>
                    <td>{team.p}</td>
                    <td>{team.w}</td>
                    <td>{team.d}</td>
                    <td>{team.l}</td>
                    <td>{team.gd}</td>
                    <td>{team.pts}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </StyledTable>
  );
}

export default Standings;
