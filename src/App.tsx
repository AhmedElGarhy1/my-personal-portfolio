import { useEffect, useState } from "react";
import { Vector2 } from "three";
import LoadingComponent from "./components/Loading";
import Landing from "./components/threeD/Landing";
// import FollowMouseAnimation from "./components/utils/CursorAnimation";

import VirtualScroll from "virtual-scroll";
import { useAppDispatch } from "./hooks/store";
import {
  addToScrollY,
  updateAspectRatio,
  updateIsMobile,
  updateWidth,
} from "./redux/slices/app";

const scroller = new VirtualScroll({
  // passive: false,
});

function App() {
  const dispatch = useAppDispatch();
  const [mouse2D, setMouse2D] = useState<Vector2>(new Vector2(0, 0));
  useEffect(() => {
    // mouse movment
    window.addEventListener("touchmove", (e) => {
      const { clientX, clientY } = e.touches[0];
      const x = (clientX / window.innerWidth) * 2 - 1;
      const y = -(clientY / window.innerHeight) * 2 + 1;
      setMouse2D(new Vector2(x, y));
    });
    window.addEventListener("mousemove", ({ clientX, clientY }) => {
      const y = -(clientY / window.innerHeight) * 2 + 1;
      const x = (clientX / window.innerWidth) * 2 - 1;
      setMouse2D(new Vector2(x, y));
    });
    window.addEventListener("pointerdown", () => {
      // dispatch(updateMouseClicked(true));
    });
    window.addEventListener("pointerup", () => {
      // dispatch(updateMouseClicked(false));
    });
    // scroll movement
    scroller.on((e) => {
      dispatch(addToScrollY(-e.deltaY));
    });

    const mediaQuery = window.matchMedia("(max-width: 500px)");
    // Set the initial value of the `isMobile` state variable
    dispatch(updateIsMobile(mediaQuery.matches));

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = () => {
      dispatch(updateIsMobile(mediaQuery.matches));
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    const handleResize = () => {
      dispatch(updateAspectRatio(innerWidth / innerHeight));
      dispatch(updateWidth(window.innerWidth));
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("touchmove", () => null);
      window.removeEventListener("pointermove", () => null);
      window.removeEventListener("pointerdown", () => null);
      window.removeEventListener("pointerup", () => null);
      window.removeEventListener("resize", () => null);
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      <div className="overflow-hidden h-full">
        <LoadingComponent />
        <div className="wrapper cursor-none h-[-webkit-fill-available] overflow-auto">
          <Landing mouse2D={mouse2D} />
        </div>
      </div>
    </>
  );
}

export default App;
