import { useEffect, useState } from "react";
import { Vector3 } from "three";
import LoadingComponent from "./components/Loading";
import Landing from "./components/threeD/Landing";
// import FollowMouseAnimation from "./components/utils/CursorAnimation";

function App() {
  const [mouse, setMouse] = useState<Vector3>(new Vector3(0, 0, 1));

  useEffect(() => {
    window.addEventListener("touchmove", (e) => {
      const { clientX, clientY } = e.touches[0];
      const y = -(clientY / window.innerHeight) * 2 + 1;
      const x = (clientX / window.innerWidth) * 2 - 1;
      setMouse((prev) => prev?.set(x, y, prev.z));
    });
    window.addEventListener("mousemove", ({ clientX, clientY }) => {
      const y = -(clientY / window.innerHeight) * 2 + 1;
      const x = (clientX / window.innerWidth) * 2 - 1;
      setMouse((prev) => prev?.set(x, y, prev.z));
    });
    window.addEventListener("pointerdown", () => {
      setMouse((prev) => prev?.setZ(0));
    });
    window.addEventListener("pointerup", () => {
      setMouse((prev) => prev?.setZ(1));
    });

    return () => {
      window.removeEventListener("touchmove", () => null);
      window.removeEventListener("pointermove", () => null);
      window.removeEventListener("pointerdown", () => null);
      window.removeEventListener("pointerup", () => null);
    };
  }, []);

  return (
    <>
      <div className="overflow-hidden h-[-webkit-fill-available]">
        <LoadingComponent />
        <div className="wrapper h-[-webkit-fill-available] overflow-auto">
          <Landing mouse={mouse} />
        </div>
      </div>
    </>
  );
}

export default App;
