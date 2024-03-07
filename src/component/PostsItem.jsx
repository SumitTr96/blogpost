import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import  {useState} from 'react'
import data from '../data.json'

const PostsItem = () => {
  const [resource]=useState(data)
  return (
    <Row xs={1} md={3} className="g-4">
      {resource.map(({id,title,description,thumbnail,category}) => (
        <Col key={id}>
          <Card >
            <Card.Img variant="top" src={thumbnail} alt="postImage" />
            <Card.Body>
              <Card.Title>
                {title.length > 20 ? title.substring(0, 20)+'...' : title}
              </Card.Title>
              <Card.Text>
                {description.length > 100
                  ? description.substring(0, 100) + "..."
                  : description}
              </Card.Text>
              <a href="/PostDetail">Read More</a>
              <Card.Footer className="quote-footer">
                <PostAuthor/>
                <Link
                  to='/CategoryPosts'
                  className="btn btn-light"
                >
                  {category}
                </Link>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default PostsItem;
