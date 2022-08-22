import { useEffect } from "react";

const TestComponent = () => {
  useEffect(
    () => () => {
      console.log("Component Mounted");
    },
    []
  );
};

export default TestComponent;
