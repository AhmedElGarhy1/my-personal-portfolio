import { useProgress } from "@react-three/drei";
import { useEffect, useState, FC } from "react";
import { TypeAnimation } from "react-type-animation";
import HireMeButton, {
  IHireMeButtonParams,
} from "./threeD/HireMe/HireMeButton";

const delay = 500;

const IntroText: FC<IHireMeButtonParams> = (props) => {
  const { progress } = useProgress();

  const [start, setStart] = useState(false);
  const [isVisableButton, setIsVisableButton] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      setStart(true);
      setTimeout(() => {
        setIsVisableButton(true);
      }, 20500);
    }
  }, [progress]);

  if (!start) return <></>;

  return (
    <>
      <div className="mb-8 fixed bottom-1/2 translate-y-1/2 text-white left-8">
        <p>
          Speed up <br /> Communication
        </p>
        <TypeAnimation
          sequence={[delay, "Ahmed ElGarhy"]}
          wrapper="h1"
          speed={20}
          className="text-6xl"
          cursor={false}
        />
        <TypeAnimation
          sequence={[
            delay + 2500,
            "MERN-Stack Developer",
            2000,
            "Full-Stack Javascript Developer",
            2000,
            "Full-Stack Typescript Developer",
          ]}
          wrapper="h2"
          speed={20}
          className="text-2xl text-center mt-4"
          cursor={false}
        />
        <TypeAnimation
          sequence={[delay + 17000, "Based in Egypt"]}
          wrapper="h2"
          speed={20}
          className="text-2xl text-center"
          cursor={false}
        />
      </div>
      <div className="fixed top-2/3 left-8">
        {isVisableButton && <HireMeButton {...props} />}
      </div>
    </>
  );
};

export default IntroText;
