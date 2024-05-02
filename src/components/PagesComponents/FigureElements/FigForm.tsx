import { useState, useEffect, SetStateAction } from "react";
import aerialApi from "../../../service/aerialApi";
import { figType, figFormType } from "../../Types";
import {
  handleChange,
  handleZoneChange,
} from "../../GlobalComponents/FigFormFunctions";
import useUser from "../../../context/useUser";

// what will show when the edit mode is turned on

type FigFormProps = {
  figData: figType;
  setFormMode: React.Dispatch<SetStateAction<boolean>>;
};

const FigForm: React.FC<FigFormProps> = ({ figData, setFormMode }) => {
  const { zones } = useUser();
  const [formState, setFormState] = useState<figFormType>({
    name: figData.name,
    ref: figData.ref,
    discipline: figData.discipline,
    difficulty: figData.difficulty,
    image: figData.image,
    imgArtist: figData.imgArtist,
    imgArtistUrl: figData.imgArtistUrl,
    focus: [],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await aerialApi.put(
        `/figures/${figData._id}`,
        formState
      );
      if (response.status === 200) {
        console.log("figure updated", response.data);
      }
    } catch (error) {
      console.log(error);
    }
    setFormMode(false);
  }

  useEffect(() => {
    const zoneIds = figData.focus.map((zone) => zone._id);
    setFormState((prevFormState) => ({
      ...prevFormState,
      focus: zoneIds,
    }));
  }, [zones]);

  const { name, difficulty, image, imgArtist, imgArtistUrl } = formState;

  // use effect so that ref is correctly inputted when submitting form
  // useEffect(() => {
  //   const ref = formState.name.split(" ").join("-");
  //   setFormState({ ...formState, ref: ref });
  // }, [name]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="FigInfo  flex flex-col lg:flex-row lg:basis-1/2 gap-2 justify-center items-center mb-2 px-2 "
    >
      {/* Title, figure image */}
      <div className="FigCard flex flex-col justify-center items-center gap-4">
        <input
          id="name"
          value={name}
          name="name"
          placeholder="Figure Name"
          className="font-bold text-4xl capitalize text-darkgray text-center dark:text-textdark dark:border dark:border-textdark rounded-lg dark:bg-transparent"
          onChange={(e) => handleChange(e, formState, setFormState)}
        ></input>
        <div className="aspect-square h-60 drop-shadow-md dark:brightness-90 ">
          <img
            src={figData.image}
            alt={`image of ${figData?.name}`}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <button className="bg-main dark:bg-maindark text-white font-bold px-4 py-2 rounded-xl hover:bg-mainvar dark:hover:bg-mainvar">
          Save
        </button>
      </div>
      {/* Level, difficulty and favorite */}
      <div className="flex-col flex lg:basis-1/2">
        <div className="font-semibold text-lg  text-main dark:text-textdark bg-transparent ">
          <label htmlFor="difficulty">Level:</label>{" "}
          <p className="capitalize font-normal text-text dark:text-textdark">
            <select
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="bg-transparent dark:border dark:border-textdark rounded-lg p-1 capitalize"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </p>
        </div>
        <div className="font-semibold  text-main dark:text-textdark text-base ">
          <label htmlFor="focus">Focuses on:</label>

          <div className="flex font-normal text-text gap-2 flex-wrap justify-start">
            {zones?.map((zone, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`focus-${index}`}
                  name="focus"
                  value={zone._id}
                  checked={formState.focus.includes(zone._id)}
                  onChange={(e) => handleZoneChange(e, formState, setFormState)}
                />
                <label
                  htmlFor={`zone-${index}`}
                  className="text-text dark:text-textdark"
                >
                  {zone.name}
                </label>
              </div>
            ))}
          </div>

          <div className={`flex flex-col w-full font-normal text-base `}>
            <div className="font-semibold text-main dark:text-textdark">
              Image info:{" "}
            </div>
            <label htmlFor="image">Image url:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="bg-transparent dark:border dark:border-textdark rounded-lg p-1"
            />
            <label htmlFor="imgArtist">Name of Website</label>
            <input
              type="text"
              id="imgArtist"
              name="image"
              value={imgArtist}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="bg-transparent dark:border dark:border-textdark rounded-lg p-1"
            />
            <label htmlFor="imgArtistUrl">Website link</label>
            <input
              type="text"
              id="imgArtistUrl"
              name="image"
              value={imgArtistUrl}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="bg-transparent dark:border dark:border-textdark rounded-lg p-1"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FigForm;
