import LoadingComponent from "./components/Loading";
import Landing from "./components/threeD/Landing";
// import FollowMouseAnimation from "./components/utils/CursorAnimation";

function App() {
  return (
    <>
      <div className="overflow-hidden h-[-webkit-fill-available]">
        <LoadingComponent />
        <div className="wrapper h-[-webkit-fill-available] overflow-auto">
          <Landing />
        </div>
      </div>
    </>
  );
}

export default App;
