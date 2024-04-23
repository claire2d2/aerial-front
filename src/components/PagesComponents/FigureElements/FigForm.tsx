import { useState } from "react";
import { figType, figFormType } from "../../Types";
import { handleChange, handleZoneChange } from "./FigFormFunctions";
import useUser from "../../../context/useUser";

// what will show when the edit mode is turned on

type FigFormProps = {
  figData: figType;
};

const FigForm: React.FC<FigFormProps> = ({ figData }) => {
  const { zones } = useUser();
  const [formState, setFormState] = useState<figFormType>({
    name: figData.name,
    ref: figData.ref,
    discipline: figData.discipline._id,
    difficulty: figData.difficulty,
    image: figData.image,
    imgArtist: figData.imgArtist,
    imgArtistUrl: figData.imgArtistUrl,
    focus: [],
  });

  const { name, difficulty, image, imgArtist, imgArtistUrl } = formState;

  return (
    <form className="FigInfo  flex flex-col lg:flex-row lg:basis-1/2 gap-2 justify-center items-center mb-2 px-2 ">
      {/* Title, figure image */}
      <div className="FigCard flex flex-col justify-center items-center gap-4">
        <input
          id="name"
          value={name}
          name="name"
          placeholder="Figure Name"
          className="font-bold text-4xl capitalize text-darkgray text-center"
          onChange={(e) => handleChange(e, formState, setFormState)}
        ></input>
        <div className="aspect-square h-60 drop-shadow-md dark:brightness-90 ">
          <img
            src={figData.image}
            alt={`image of ${figData?.name}`}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
      </div>
      {/* Level, difficulty and favorite */}
      <div className="flex-col flex lg:basis-1/2">
        <div className="font-semibold text-lg  text-main dark:text-textdark text-base ">
          <label htmlFor="difficulty">Level:</label>{" "}
          <p className="capitalize font-normal text-text dark:text-textdark">
            <input
              type="text"
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={(e) => handleChange(e, formState, setFormState)}
            />
          </p>
        </div>
        <div className="font-semibold text-lg  text-main dark:text-textdark text-base ">
          <label htmlFor="focus">Focuses on:</label>

          <div className="flex font-normal text-text gap-2 flex-wrap justify-start">
            {zones?.map((zone, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`focus-${index}`}
                  name="focus"
                  value={zone._id}
                  onChange={(e) => handleZoneChange(e, setFormState)}
                />
                <label htmlFor={`zone-${index}`}>{zone.name}</label>
              </div>
            ))}
          </div>

          <div className={`flex flex-col w-full font-normal text-base `}>
            <div className="font-semibold text-main">Image info: </div>
            <label htmlFor="image">Image url:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={image}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="border-disabled border rounded-lg drop-shadow-md py-1 px-2"
            />
            <label htmlFor="imgArtist">Name of Website</label>
            <input
              type="text"
              id="imgArtist"
              name="image"
              value={imgArtist}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="border-disabled border rounded-lg drop-shadow-md py-1 px-2"
            />
            <label htmlFor="imgArtistUrl">Website link</label>
            <input
              type="text"
              id="imgArtistUrl"
              name="image"
              value={imgArtistUrl}
              onChange={(e) => handleChange(e, formState, setFormState)}
              className="border-disabled border rounded-lg drop-shadow-md py-1 px-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FigForm;
