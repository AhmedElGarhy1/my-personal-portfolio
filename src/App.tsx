import LoadingComponent from "./components/Loading";
import Landing from "./components/threeD/Landing";
// import FollowMouseAnimation from "./components/utils/CursorAnimation";
// import CircleCursor from "./components/utils/CursorAnimation";

function App() {
  return (
    <>
      <div className="overflow-hidden h-full">
        <LoadingComponent />
        <div className="wrapper h-screen overflow-auto">
          <Landing />
        </div>
      </div>
    </>
  );
}

export default App;
