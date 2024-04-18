import { useState, useEffect } from "react";
import { FormEvent } from "react";

useState;
const StatusToggle = () => {
  const [range, setRange] = useState<number>(0);
  const [status, setStatus] = useState("Not seen yet");

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const selectedInput = Number(e.currentTarget.value);
    setRange(selectedInput);
  };

  useEffect(() => {
    switch (range) {
      case 0:
        setStatus("Not seen yet");
        break;
      case 10:
        setStatus("Wishlist");
        break;
      case 20:
        setStatus("Training");
        break;
      case 30:
        setStatus("One Side");
        break;
      case 40:
        setStatus("Mastered");
        break;
    }
  }, [range]);

  return (
    <div className="flex max-w-md flex-col gap-4">
      <input
        type="range"
        min="0"
        max="40"
        value={range}
        step="10"
        onInput={handleInputChange}
        className={`range w-full h-2 mb-6 appearance-none bg-disabled rounded-lg cursor-pointer range-sm  ${
          range < 20
            ? "accent-gray"
            : range < 30
            ? "accent-darkgray"
            : range < 40
            ? "accent-green "
            : "accent-golden"
        }`}
      />
      <p id="rangeValue">{status}</p>
      <p> </p>
    </div>
  );
};

export default StatusToggle;
