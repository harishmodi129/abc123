import React, { useState } from "react";

const RedLight = () => {
  let c = 0;

  const [colorValue, setColorValue] = useState(" ");
  const [count, setCount] = useState(0);

  const handlebuttonChange = () => {
    let c1 = count;
    console.log(c1++);
    setCount(c1++);
    if (count === 1) {
      setColorValue("red");
      // setCount(c++);
      // console.log(count);
      // console.log(c);
    } else if (count === 2) {
      setColorValue("yellow");
      // setCount(c++);
      // console.log(count);
      // console.log(c);
    } else if (count === 3) {
      setColorValue("green");
      setCount(1);
      // console.log(count);
      // console.log(c);
    }
    // else if (count > 3) {
    //   setColorValue("");
    //   setCount("");
    // }
  };

  return (
    <div>
      <button
        onClick={handlebuttonChange}
        style={{ backgroundColor: `${colorValue}` }}
      >
        please click me{" "}
      </button>
    </div>
  );
};

export default RedLight;
