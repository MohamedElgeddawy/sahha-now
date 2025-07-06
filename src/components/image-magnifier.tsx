import Image from "next/image";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";

type ImageProps = React.ComponentProps<typeof Image>;

const ImageMagnifier = (props: ImageProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const {
    value: showMagnifier,
    setTrue: showMagnifierTrue,
    setFalse: showMagnifierFalse,
  } = useBoolean(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative size-full"
      onMouseEnter={showMagnifierTrue}
      onMouseLeave={showMagnifierFalse}
      onMouseMove={handleMouseMove}
    >
      <Image {...props} />
      {showMagnifier && (
        <div
          className="absolute inset-0 bg-black pointer-events-none z-10"
          
        >
          <div
            className="border-2 bg-cover border-white bg-no-repeat z-10"
            style={{
              backgroundImage: `url(${props.src})`,

              backgroundSize: "100%",
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
