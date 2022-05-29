import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import AdjustIcon from "@mui/icons-material/Adjust";

import "./carousel.css";

export const CarouselItem = ({ children, width, style }) => {
  return (
    <div className="carousel-item" style={{ width: width, ...style }}>
      {children}
    </div>
  );
};

const Carousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    console.log(newIndex);
    if (newIndex < 0) {
      newIndex = React.Children.count(props.children) - 1;
    } 
    else if(newIndex > (props.arrayLength - 6))
    {
      newIndex= 0;
    }
    else if (newIndex >= React.Children.count(props.children)) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, props.delay);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{...props.carouselStyle}}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          display: "inline-flex",
          justifyContent: "center",
        }}
      >
        <div
          className="inner"
          style={{
            width: "100%",
            transform: `translateX(-${activeIndex * props.transformWidth}%)`,
            ...props.innerDivStyle,
          }}
        >
          {React.Children.map(props.children, (child, index) => {
            return React.cloneElement(child, { width: props.width });
          })}
        </div>

        <IconButton
          style={{ position: "absolute", top: "40%", left: '0%'}}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <ChevronLeftIcon sx={{ height: 50, width: 50 }} />
        </IconButton>

        <IconButton
          style={{ position: "absolute", top: "40%", right: "0%" }}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <ChevronRightIcon sx={{ height: 50, width: 50 }} />
        </IconButton>
      </div>

      <div className="indicators" style={{ ...props.indicatorsStyle}}>
        {React.Children.map(props.children, (child, index) => {
          return (
            <IconButton
              variant="outlined"
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              <AdjustIcon className="icon" sx={{ height: 17, width: 17 }} />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
