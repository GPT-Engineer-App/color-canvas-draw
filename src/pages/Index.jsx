import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack, HStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(brushSizes[2]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ cursor: "crosshair" }}
      />
      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={4}>
          {colors.map((c) => (
            <IconButton
              key={c}
              aria-label={c}
              icon={<FaCircle color={c} />}
              isRound
              size="lg"
              onClick={() => setColor(c)}
              border={color === c ? "2px solid black" : "none"}
            />
          ))}
        </HStack>
        <HStack spacing={4}>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`${size}px`}
              icon={<Box as="span" width={`${size}px`} height={`${size}px`} borderRadius="50%" bg="black" />}
              isRound
              size="lg"
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? "2px solid black" : "none"}
            />
          ))}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Index;