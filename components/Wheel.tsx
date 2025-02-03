"use client";
import React from "react";
import { SpinWheel, ISpinWheelProps } from "spin-wheel-game";

const segments = [
  { segmentText: "Option 1", segColor: "red" },
  { segmentText: "Option 2", segColor: "blue" },
  { segmentText: "Option 3", segColor: "green" },
  // Add more segments as needed
];

const MySpinWheel: React.FC = () => {
  const handleSpinFinish = (result: string) => {
    console.log(`Spun to: ${result}`);
    // Handle the result as needed
  };

  const spinWheelProps: ISpinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 290,
    upDuration: 100,
    downDuration: 600,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return <SpinWheel {...spinWheelProps} />;
};

export default MySpinWheel;
