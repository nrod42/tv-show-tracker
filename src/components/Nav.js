import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, Nav, Navbar } from "react-bootstrap";

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

  //   return (
  //     <nav className="nav">
  //       <div className="navTabs">
  //         <ul className="pageTabs">
  //           <li>
  //             <Link to={"/tv-show-tracker"} className="homeBtn">
  //               Home
  //             </Link>
  //           </li>
  //           <li>
  //             <Link to="/tv-show-tracker/lists/" className="listsBtn">
  //               Lists
  //             </Link>
  //           </li>
  //           <li>
  //             <Link
  //               to={"/tv-show-tracker/movies/top-rated"}
  //               className="moviesBtn"
  //             >
  //               Movies
  //             </Link>
  //           </li>
  //           <li>
  //             <Link
  //               to={"/tv-show-tracker/series/top-rated"}
  //               className="seriesBtn"
  //             >
  //               Series
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>
  //       <div className="searchSection">
  //         <form onSubmit={handleSearch} role="search">
  //           <input
  //             onChange={handleSearchInput}
  //             id="search"
  //             type="text"
  //             value={searchInput}
  //             placeholder={"Search TV Shows"}
  //             aria-label="Search"
  //           ></input>
  //           <button onClick={handleSearch} type="submit">
  //             <img src={searchIcon} alt="search button"></img>
  //           </button>
  //         </form>
  //       </div>
  //     </nav>
  //   );
  // };

  // export default Nav;

  return (
    <div className="local-bootstrap">
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}></Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
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
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              onChange={handleSearchInput}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchInput}
            />
            <Button
              variant="outline-success"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navi;
