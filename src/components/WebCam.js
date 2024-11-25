// src/WebCam.js
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import './WebCam.css';

// DraggableCircle Component
const DraggableCircle = ({ position, onPositionChange, children }) => {
  const isDragging = useRef(false); // Track if dragging is happening
  const initialMousePos = useRef({ x: 0, y: 0 }); // Initial mouse position for dragging

  // Start dragging when mouse is pressed
  const startDrag = (e) => {
    isDragging.current = true;
    initialMousePos.current = { x: e.clientX, y: e.clientY };
  };

  // Drag the circle as the mouse moves
  const dragCircle = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - initialMousePos.current.x;
      const deltaY = e.clientY - initialMousePos.current.y;
      onPositionChange((prevPos) => ({
        x: prevPos.x + deltaX,
        y: prevPos.y + deltaY,
      }));
      initialMousePos.current = { x: e.clientX, y: e.clientY }; // Update the initial mouse position for smooth dragging
    }
  };

  // Stop dragging when the mouse is released or leaves the area
  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="webcam-circle"
      style={{
        width: "200px", // Set fixed size
        height: "200px",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseMove={dragCircle}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseDown={startDrag} // Start dragging when mouse is pressed on the circle
    >
      {children}
    </div>
  );
};

const WebCam = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Initial position of the webcam circle

  return (
    <div className="webcam-container">
      <DraggableCircle position={position} onPositionChange={setPosition}>
        <Webcam
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="webcam-video"
        />
      </DraggableCircle>
    </div>
  );
};

export default WebCam;
