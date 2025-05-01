import "./styles.css";

import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { memo, useEffect, useState } from "react";

function InputQuantitySpinner({
  defaultValue,
  min = 1,
  max = 999,
  onOption = () => {},
}) {
  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (value) => {
    if (value >= min && value <= max) {
      setQuantity(value);
    }
    return;
  };

  const handleChangeInput = (value) => {
    if (value < min) {
      setQuantity(min);
    } else if (value > max) {
      setQuantity(max);
    } else {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (quantity >= min && quantity <= max) {
        onOption(quantity);
      }
    }, 1000);

    return () => clearTimeout(timerID);
  }, [quantity]);

  useEffect(() => {
    setQuantity(defaultValue);
  }, [defaultValue]);

  return (
    <div className=" flex justify-between items-center border border-gray-300 rounded-lg p-0.5 w-28 select-none">
      <div
        className={` w-1/3 h-full flex justify-center items-center cursor-pointer ${
          quantity == min ? "opacity-55" : "text-black"
        }`}
        onClick={() => handleChangeQuantity(quantity - 1)}
      >
        <IoMdRemove size={20} className=" cursor-pointer" />
      </div>
      <div className=" w-2/3">
        <input
          className=" w-full h-full outline-none px-2 text-center text-black py-1"
          value={quantity}
          type="number"
          min={min}
          max={max}
          onChange={(e) => handleChangeInput(+e.target.value)}
        />
      </div>
      <div
        className={` w-1/3 h-full flex justify-center items-center cursor-pointer ${
          quantity == max ? "opacity-55" : "text-black"
        }`}
        onClick={() => handleChangeQuantity(quantity + 1)}
      >
        <IoMdAdd size={20} className=" cursor-pointer" />
      </div>
    </div>
  );
}

export default memo(InputQuantitySpinner);
