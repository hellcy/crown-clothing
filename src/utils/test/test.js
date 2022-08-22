const func1 = () => () => {
  console.log("func1 runs");
};

func1()();
