import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navi = (props) => {
  const { setSearchQuery } = props;
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/tv-show-tracker/results");
    setSearchQuery(searchInput);
  };

  return (
    <>
      {["lg"].map((expand) => (
        <Navbar
          key={expand}
          bg="dark"
          variant="dark"
          expand={expand}
          className="mb-3"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand as={Link} to="/tv-show-tracker">
              Track TV
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Track TV
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="justify-content-end flex-grow-1 pe-3"
                  style={{ textAlign: "center" }}
                >
                  <Nav.Link as={Link} to={"/tv-show-tracker"}>
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/tv-show-tracker/lists"}>
                    Lists
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/tv-show-tracker/movies/top-rated"}>
                    Movies
                  </Nav.Link>
                  <Nav.Link as={Link} to={"/tv-show-tracker/series/top-rated"}>
                    Series
                  </Nav.Link>
                </Nav>
                <Form onSubmit={handleSearch} className="d-flex searchForm">
                  <Form.Control
                    onChange={handleSearchInput}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchInput}
                  />
                  <Button
                    variant="success"
                    type="submit"
                    onClick={handleSearch}
                  >
                    Search
                  </Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Navi;
