import React, { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import leftArrow from "../img/arrow-left.svg";
import rightArrow from "../img/arrow-right.svg";

const Strip = ({ title, array }) => {
  //   const array = props.array;

  let scrollInterval;
  const strip = useRef(null);

  const startScroll = (direction) => {
    scrollInterval = setInterval(() => {
      if (direction === "left") {
        strip.current.scrollLeft -= 185 + 10; // 185 is card width and 10 is the flex gap between cards
      } else {
        strip.current.scrollLeft += 185 + 10; // 185 is card width and 10 is the flex gap between cards
      }
    }, 50);
  };

  const stopScroll = () => {
    clearInterval(scrollInterval);
  };

  return (
    <Row style={{ margin: "1.5rem 0", textAlign: "center" }}>
      <h2>{title}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={leftArrow}
          alt="scroll left button"
          className="arrow-left"
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        ></img>
        <div ref={strip} className="strip">
          {array}
        </div>
        <img
          src={rightArrow}
          alt="scroll right button"
          className="arrow-right"
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        ></img>
      </div>
    </Row>
  );
};

export default Strip;
