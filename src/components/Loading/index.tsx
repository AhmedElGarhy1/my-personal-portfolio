import { useProgress } from "@react-three/drei";
import { motion, useAnimationControls } from "framer-motion";
import { FC, useEffect } from "react";

const LoadingVariants = {
  initial: {
    height: "100%",
    top: "0%",
  },
  animate: {
    top: "-100%",
    transition: { delay: 0.5, duration: 0.8, ease: "easeInOut" },
  },
};

const circleLoadingVariants = {
  initial: {
    height: "500px",
  },
  animate: {
    height: ["200px", "0px"],
    transition: { delay: 0.5, duration: 1, ease: "easeInOut" },
  },
};

const LoadingComponent: FC = () => {
  const { progress } = useProgress();
  const loadingControle = useAnimationControls();
  const circleControle = useAnimationControls();
  useEffect(() => {
    if (progress === 100) {
      loadingControle.start(LoadingVariants.animate);
      circleControle.start(circleLoadingVariants.animate);
      console.log(progress);
    }
  }, [progress]);

  return (
    <>
      <motion.div
        variants={LoadingVariants}
        animate={loadingControle}
        initial="initial"
        className="fixed w-full  z-50">
        <motion.div
          className={
            "relative bg-main-color w-full h-full text-white text-center flex justify-center items-center "
          }>
          <div>
            <h1 className="text-6xl">* Hello</h1>
            <p className="text-lg absolute w-full text-center left-0 z-10 bottom-3 ">
              {progress} %
            </p>
          </div>
          <motion.div
            className="w-[110%]  bg-main-color rounded-[50%] absolute translate-y-1/2 bottom-0"
            variants={circleLoadingVariants}
            initial="initial"
            animate={circleControle}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default LoadingComponent;
