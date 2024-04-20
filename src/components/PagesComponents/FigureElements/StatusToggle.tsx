import { useState, useEffect } from "react";
import { FormEvent } from "react";
import aerialApi from "../../../service/aerialApi";
import { statusType } from "../../Types";

type StatusToggleProps = {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  oneSideStatus: string | null;
  setOneSideStatus: React.Dispatch<React.SetStateAction<string | null>>;
  currFigId: string;
};

const StatusToggle: React.FC<StatusToggleProps> = ({
  status,
  setStatus,
  oneSideStatus,
  setOneSideStatus,
  currFigId,
}) => {
  // get the initial state to edit (to get back to initial state if needed, or disable saving if status = stateToEdit)
  const [range, setRange] = useState<number>(0);
  const [stateToEdit, setStateToEdit] = useState<statusType | null>(null);
  // handle changing the state for the current figure when user switches between ranges
  const [initialRange, setInitialRange] = useState<number>(0);
  const [initialOneSide, setInitialOneSide] = useState<string | null>(null);

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const selectedInput = Number(e.currentTarget.value);
    setRange(selectedInput);
  };

  useEffect(() => {
    switch (range) {
      case 0:
        setStatus("Not seen yet");
        setOneSideStatus(null);
        break;
      case 10:
        setStatus("Wishlist");
        setOneSideStatus(null);
        break;
      case 20:
        setStatus("Training");
        setOneSideStatus(null);
        break;
      case 30:
        setStatus("One Side");
        break;
      case 40:
        setStatus("Mastered");
        setOneSideStatus(null);
        break;
    }
  }, [range]);

  // functions to assign "right side" or "left side" if one side is chosen
  const setOneSide = (e: React.MouseEvent<HTMLElement>, side: string) => {
    e.preventDefault();
    setOneSideStatus(side);
  };

  // find state id to modify
  async function findStateToEdit() {
    try {
      const response = await aerialApi.get<statusType>(
        `/states/fig/${currFigId}`
      );
      setStateToEdit(response.data);
      setRange(response.data.range);
      setInitialRange(response.data.range);
      setOneSideStatus(response.data.oneSide);
      setInitialOneSide(response.data.oneSide);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findStateToEdit();
  }, []);

  // handle form submission

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await aerialApi.put(`/states/${stateToEdit?._id}`, {
        name: status,
        oneSide: oneSideStatus,
        range: range,
      });
      findStateToEdit();
    } catch (error) {
      console.log(error);
      //TODO show error message with what is wrong
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-1 justify-center items-center py-2"
    >
      <input
        type="range"
        min="0"
        max="40"
        value={range}
        step="10"
        onInput={handleInputChange}
        className={`range w-full h-2 appearance-none bg-disabled rounded-lg cursor-pointer range-sm  ${
          range < 20
            ? "accent-gray"
            : range < 30
            ? "accent-darkgray"
            : range < 40
            ? "accent-green "
            : "accent-golden"
        }`}
      />
      <div id="rangeValue" className="w-full my-2 flex">
        <div className="w-full font-semibold">{status}</div>
        <div className={` ${range === 30 ? "w-full flex gap-2" : "hidden"}`}>
          <button
            type="button"
            onClick={(e) => setOneSide(e, "Left Side")}
            className={`w-20 px-1 text-white rounded-md ${
              oneSideStatus !== "Left Side" ? "bg-disabled" : "bg-mainlight"
            }`}
          >
            Left
          </button>
          <button
            type="button"
            onClick={(e) => setOneSide(e, "Right Side")}
            className={`w-20 px-1 text-white rounded-md ${
              oneSideStatus !== "Right Side" ? "bg-disabled" : "bg-mainlight"
            }`}
          >
            Right
          </button>
        </div>
      </div>
      <button
        className="bg-main text-white px-4 py-2 rounded-lg disabled:bg-disabled"
        disabled={
          (initialRange === range && range !== 30) ||
          (range === 30 && initialOneSide === oneSideStatus)
        }
      >
        Save
      </button>
    </form>
  );
};

export default StatusToggle;
