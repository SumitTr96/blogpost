import React from "react";
import { Card } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";

const DisplayData = ({ userId, country, name, description, url }) => {
  return (
    <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 4 }).map((_, userId) => (
        <>
          <Col key={userId}>
            <Card style={{ width: "17rem" }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body style={{ columnGap: "2rem" }}>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>Country: {country}</Card.Text>
                <Button href={url} variant="primary" target="_blank">
                  VISIT
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </>
      ))}
    </Row>
  );
};
export default DisplayData;
