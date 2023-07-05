import { useEffect, useState, useRef } from "react";
import ShaderTextMesh from "../../ShaderTextMesh";

const Content = () => {
  const [startXPos, setStartXPos] = useState(0);
  const [scale, setScale] = useState(1);
  const textRef = useRef<Text>();

  useEffect(() => {
    const handleResize = () => {
      setScale(Math.min(innerWidth * 0.0014, 0.8));
      const x = -(window.innerWidth / 150);
      setStartXPos(x);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", () => null);
    };
  }, []);

  return (
    <>
      <ShaderTextMesh
        ref={textRef}
        position={[startXPos, 0, 0]}
        fontSize={scale}
        text={`Hello \nMy name is Ahmed \nJavascript Developer`}
      />
    </>
  );
};

export default Content;
