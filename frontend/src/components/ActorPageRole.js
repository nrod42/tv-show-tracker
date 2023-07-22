import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ActorPageRole = ({ roleInfo }) => {
  const { id, poster, title, year, type, role } = roleInfo;

  return (
    <>
      <Row>
        <Col md={1} style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'start'}}>
            <Link to={
                type === "tv"
                ? `/tv-show-tracker/shows/${id}`
                : `/tv-show-tracker/movies/${id}`
            }>
                <img src={poster} alt={`${title} poster`} />
            </Link>
        </Col>
        <Col md={10} style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'start'}}>
            <Link to={
                type === "tv"
                ? `/tv-show-tracker/shows/${id}`
                : `/tv-show-tracker/movies/${id}`
            }>
                <div>
                    <strong>{title}</strong>
                </div>
            </Link>
            <div>{role}</div>
            {/* <div>{type}</div> */}
        </Col>
        <Col md={1} style={{display:'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'end'}}>
            <div>{year}</div>
            {/* <div>{rating}</div> */}
        </Col>
      </Row> 
    </>
  );
};

export default ActorPageRole;
