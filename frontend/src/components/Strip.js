import React, { useRef } from "react";
import Row from "react-bootstrap/Row";
import leftArrow from "../img/arrow-left.svg";
import rightArrow from "../img/arrow-right.svg";
import styles from "./Strip.module.css";

const Strip = ({ title, array }) => {
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
    <Row className="mt-5 mb-5">
      <h2 className="text-center">{title}</h2>
      <div className={styles.wrapper}>
        <img
          src={leftArrow}
          alt="scroll left button"
          className={styles.arrowLeft}
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        ></img>
        <div ref={strip} className={styles.strip}>
          {array}
        </div>
        <img
          src={rightArrow}
          alt="scroll right button"
          className={styles.arrowRight}
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        ></img>
      </div>
    </Row>
  );
};

export default Strip;
