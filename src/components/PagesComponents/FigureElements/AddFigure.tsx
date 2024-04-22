import {
  useState,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
} from "react";
import useUser from "../../../context/useUser";
import { AxiosError } from "axios";
import { figType } from "../../Types";
import aerialApi from "../../../service/aerialApi";
import { fetchFigures } from "../FiguresFunctions";

type formType = {
  name: string;
  ref: string;
  discipline: string;
  difficulty: string;
  image: string;
  imgArtist: string;
  imgArtistUrl: string;
  focus: string[];
};

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
  const [formState, setFormState] = useState<formType>(defaultFormState);

  // get available zones of focus

  // change the form state when user inputs
  async function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const key = e.currentTarget.id;
    const value = e.currentTarget.value;
    setFormState({ ...formState, [key]: value });
  }

  // handle multiple values selection
  async function handleZoneChange(e: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = e.target;
    if (checked) {
      setFormState((prevState) => ({
        ...prevState,
        focus: [...prevState.focus, value],
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        focus: prevState.focus.filter((zone) => zone !== value),
      }));
    }
  }

  /* function to handle form submission (=> user creation)
   ** if creation is successful, navigate to login page directly
   ** if unsuccessful, error message appears detailing why
   */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      console.log(formState);
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
    <div>
      <h3>Add a figure to the database:</h3>
      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col">
        <div>
          <label htmlFor="figName">Figure Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Figure name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <div>Discipline:</div> <div>{currDiscipline?.name}</div>
        </div>
        <div>
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={handleChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Figure image</label>
          <input
            type="text"
            id="image"
            placeholder="Input an image url here"
            name="image"
            value={image}
            onChange={handleChange}
          />
        </div>
        <div>And don't forget to give credit to the owners of the image!</div>
        <div>
          <label htmlFor="imgArtist">Image artist/ website :</label>
          <input
            type="text"
            id="imgArtist"
            placeholder="Image artist or website"
            name="imgArtist"
            value={imgArtist}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="imgArtist">Link to the artist / website :</label>
          <input
            type="text"
            id="imgArtistUrl"
            placeholder="Image  URL of artist or website"
            name="imgArtistUrl"
            value={imgArtistUrl}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="focus">Zones of the body the figure focuses on:</label>
        {zones.map((zone, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`focus-${index}`}
              name="focus"
              value={zone._id}
              onChange={handleZoneChange}
            />
            <label htmlFor={`zone-${index}`}>{zone.name}</label>
          </div>
        ))}

        <button
          disabled={name === "" || difficulty === "" || image === ""}
          className="bg-main px-3 disabled:bg-disabled"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddFigure;
