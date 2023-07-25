import React, { useContext, useRef } from "react";
import Row from "react-bootstrap/Row";
// import leftArrow from "../img/arrow-left.svg";
// import rightArrow from "../img/arrow-right.svg";
// import whiteLeftArrow from "../img/arrow-left.svg";
// import blackLeftArrow from "../img/arrow-left.svg";
import leftArrowWhite from "../img/left_arrow_white.svg";
import leftArrowBlack from "../img/left_arrow_black.svg";
import rightArrowWhite from "../img/right_arrow_white.svg";
import rightArrowBlack from '../img/right_arrow_black.svg';
import styles from "./Strip.module.css";
import { DarkModeContext } from "../DarkModeContext";

const Strip = ({ array }) => {
  const { darkMode } = useContext(DarkModeContext)
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
    <Row>
      <div className={styles.wrapper}>
        <img
          src={darkMode ? leftArrowWhite : leftArrowBlack}
          style={{height: '30px', width: 'auto', marginBottom: '150px'}}
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
          src={darkMode ? rightArrowWhite :rightArrowBlack}
          style={{height: '30px', width: 'auto', marginBottom: '150px'}}
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
