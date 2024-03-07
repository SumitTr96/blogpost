import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import data from "../data.json";

const Authors = () => {
  const [authors, setAuthors] = useState(data);
  return (
    <Row xs={2} sm={3} md={4} className="g-4">

          {authors.map(({ id, author, authorDP }) => (
            <Col key={id}>
              <Link to={"/AuthorPosts"} style={{ textDecoration: "none" }}>
                <br />
                <Card style={{ width: "10rem" }}>
                  <Card.Img variant="top" src={authorDP} />
                  <Card.Body>
                    <Row>
                      <Col>{author}</Col>
                      <Card.Text>Posts: {id}</Card.Text>
                    </Row>
                  </Card.Body>
                </Card>
                <br />
              </Link>
            </Col>
          ))}


    </Row>
  );
};
export default Authors;
