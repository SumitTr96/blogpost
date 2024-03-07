import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            {
              <img
                src={process.env.PUBLIC_URL + "/images/logo.png"}
                className="logo-navbar"
                alt="logo"
                thumbnail
                style={{
                  width: "2rem",
                  height: "2rem",
                }}
              />
            }
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/CreatePost">Create Post</Nav.Link>
              <Nav.Link href="/Authors">Authors</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/UserProfile">User</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
