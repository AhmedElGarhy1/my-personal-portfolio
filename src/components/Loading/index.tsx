import { motion } from "framer-motion";
import { FC } from "react";

const LoadingVariants = (delay: number) => ({
  initial: {
    height: "100%",
    top: "0%",
  },
  animate: {
    top: "-100%",
    transition: { delay, duration: 0.8, ease: "easeInOut" },
  },
});

const circleLoadingVariants = (delay: number) => ({
  initial: {
    height: "500px",
  },
  animate: {
    height: ["200px", "0px"],
    transition: { delay, duration: 1, ease: "easeInOut" },
  },
});

const LoadingComponent: FC = () => {
  return (
    <>
      <motion.div
        variants={LoadingVariants(0.5)}
        initial="initial"
        animate="animate"
        className="fixed w-full">
        <motion.div
          className={
            "relative bg-[#2435b7] w-full h-full text-white text-center flex justify-center items-center text-6xl"
          }>
          Hello
          <motion.div
            className="w-[110%]  bg-[#2435b7] rounded-[50%] absolute translate-y-1/2 bottom-0"
            variants={circleLoadingVariants(0.5)}
            initial="initial"
            animate="animate"
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default LoadingComponent;
