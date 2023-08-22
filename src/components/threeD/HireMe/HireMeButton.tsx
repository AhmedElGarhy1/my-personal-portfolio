import { FC } from "react";

export interface IHireMeButtonParams {
  isOpened: boolean;
  toggleHireMe: () => void;
}

const HireMeButton: FC<IHireMeButtonParams> = ({ toggleHireMe }) => {
  return (
    <button onClick={toggleHireMe} className="hire-me-button">
      <span>Hire Me {"-->"} </span>
    </button>
  );
};

export default HireMeButton;
