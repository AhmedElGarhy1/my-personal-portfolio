import { FC } from "react";
import LoadingComponent from "./components/Loading";
import Landing from "./components/threeD/Landing";

const SectionComponent: FC<{ color: string }> = ({ color }) => {
  return (
    <>
      <div className={color + " h-screen w-full snap-start"}></div>
    </>
  );
};

function App() {
  return (
    <>
      <LoadingComponent />
      <div className="wrapper h-screen overflow-auto">
        <Landing />
        <SectionComponent color="bg-blue-600" />
        <SectionComponent color="bg-red-600" />
        <SectionComponent color="bg-green-600" />
        <SectionComponent color="bg-blue-600" />
        <SectionComponent color="bg-yellow-600" />
        <SectionComponent color="bg-blue-600" />
        <SectionComponent color="bg-red-600" />
        <SectionComponent color="bg-green-600" />
        <SectionComponent color="bg-blue-600" />
        <SectionComponent color="bg-yellow-600" />
      </div>
    </>
  );
}

export default App;
