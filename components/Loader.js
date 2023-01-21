import React from "react";
import { motion } from "framer-motion";
import { GoPrimitiveDot } from "react-icons/go";
import styled from "styled-components";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "50%",
  },
};

const DotTransition = {
  duration: 0.5,
  yoyo: Infinity,
  type: "easeInOut",
};

const Loader = () => {
  return (
    <div className="flex justify-center w-full py-4">
      <DotContainerStyled
        className="flex gap-1"
        variants={ContainerVariants}
        initial="initial"
        animate="animate"
      >
        {/* children */}
        <motion.div variants={DotVariants} transition={DotTransition}>
          <GoPrimitiveDot className="text-3xl" />
        </motion.div>
        <motion.div variants={DotVariants} transition={DotTransition}>
          <GoPrimitiveDot className="text-3xl" />
        </motion.div>
        <motion.div variants={DotVariants} transition={DotTransition}>
          <GoPrimitiveDot className="text-3xl" />
        </motion.div>
      </DotContainerStyled>
    </div>
  );
};

export default Loader;

const DotContainerStyled = styled(motion.div)`
  color: ${(props) => props.theme.textColor};
`;
