import { useState, FormEvent, SetStateAction, useEffect } from "react";
import useUser from "../../../context/useUser";
import { AxiosError } from "axios";
import { figType, figFormType } from "../../Types";
import aerialApi from "../../../service/aerialApi";
import { fetchFigures } from "../FiguresFunctions";
import {
  handleChange,
  handleZoneChange,
} from "../../GlobalComponents/FigFormFunctions";

type AddFigureProps = {
  currDiscipline: {
    name: string;
    ref: string;
    _id: string;
  };
  setFigures: React.Dispatch<SetStateAction<figType[]>>;
  setShowFigForm: React.Dispatch<SetStateAction<boolean>>;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
  setToastMessage: React.Dispatch<SetStateAction<string>>;
};

const AddFigure: React.FC<AddFigureProps> = ({
  currDiscipline,
  setFigures,
  setShowFigForm,
  setShowToast,
  setToastMessage,
}) => {
  const defaultFormState = {
    name: "",
    ref: "",
    discipline: currDiscipline._id,
    difficulty: "beginner",
    image: "",
    imgArtist: "",
    imgArtistUrl: "",
    focus: [],
  };
  const { zones } = useUser();
  const [formState, setFormState] = useState<figFormType>(defaultFormState);

  // get available zones of focus

  /* function to handle form submission (=> user creation)
   ** if creation is successful, navigate to login page directly
   ** if unsuccessful, error message appears detailing why
   */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await aerialApi.post("/figures", formState);
      console.log(response.data);
      if (response.status === 201) {
        console.log("figure created", response.data);
      }
      // refresh figures page
      fetchFigures(currDiscipline._id, setFigures, [], []);
      // reset form state to initial state
      setFormState(defaultFormState);
      // close form
      setShowFigForm(false);
      // show message success on toast
      setToastMessage("Figure has been successfully added!");
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle error if it is an instance of Error
        console.error(error);
        setToastMessage(error.response?.data.message); // Use type assertion to access message property
      } else {
        // Handle other types of errors
        console.error(error);
        setToastMessage("An unknown error occurred. Please try again.");
      }
    }
    // show toast with message
    setShowToast(true);
    // hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  const { name, difficulty, image, imgArtist, imgArtistUrl } = formState;

  // use effect so that ref is correctly inputted when submitting form
  useEffect(() => {
    const ref = formState.name.split(" ").join("-");
    setFormState({ ...formState, ref: ref });
  }, [name]);

  return (
    <div className="w-full group">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-2 w-[900px] mx-auto py-4"
      >
        <div className="flex gap-3">
          <label htmlFor="figName" className="font-medium">
            Figure Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Figure name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e, formState, setFormState)}
          />
        </div>
        <div className="flex gap-3">
          <div className="font-medium">Discipline:</div>{" "}
          <div className="capitalize">{currDiscipline?.name}</div>
        </div>
        <div className="flex gap-3">
          <label htmlFor="difficulty" className="font-medium">
            Difficulty
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={(e) => handleChange(e, formState, setFormState)}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="flex gap-3">
          <label htmlFor="image" className="font-medium">
            Figure image
          </label>
          <input
            type="text"
            id="image"
            placeholder="Input an image url here"
            name="image"
            value={image}
            onChange={(e) => handleChange(e, formState, setFormState)}
          />
        </div>
        <div className="flex gap-3 font-medium">
          And don't forget to give credit to the owners of the image!
        </div>
        <div className="flex gap-3">
          <label htmlFor="imgArtist" className="font-medium">
            Image artist/ website :
          </label>
          <input
            type="text"
            id="imgArtist"
            placeholder="Image artist or website"
            name="imgArtist"
            value={imgArtist}
            onChange={(e) => handleChange(e, formState, setFormState)}
          />
        </div>
        <div className="flex gap-3">
          <label htmlFor="imgArtist" className="font-medium">
            Link to the artist / website :
          </label>
          <input
            type="text"
            id="imgArtistUrl"
            placeholder="Image  URL of artist or website"
            name="imgArtistUrl"
            value={imgArtistUrl}
            onChange={(e) => handleChange(e, formState, setFormState)}
          />
        </div>

        <label htmlFor="focus" className="font-medium">
          Zones of the body the figure focuses on:
        </label>
        <div className="flex flex-wrap gap-4">
          {zones.map((zone, index) => (
            <div key={index} className="flex gap-1">
              <input
                type="checkbox"
                id={`focus-${index}`}
                name="focus"
                value={zone._id}
                onChange={(e) => handleZoneChange(e, formState, setFormState)}
              />
              <label htmlFor={`zone-${index}`}>{zone.name}</label>
            </div>
          ))}
        </div>

        <button
          disabled={name === "" || difficulty === "" || image === ""}
          className="bg-main px-3 disabled:bg-disabled text-white font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFigure;
