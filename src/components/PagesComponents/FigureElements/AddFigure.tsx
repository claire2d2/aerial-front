import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import useUser from "../../../context/useUser";
import aerialApi from "../../../service/aerialApi";

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

const AddFigure = () => {
  const { currDiscipline, zones } = useUser();

  const [formState, setFormState] = useState<formType>({
    name: "",
    ref: "",
    discipline: "",
    difficulty: "",
    image: "",
    imgArtist: "",
    imgArtistUrl: "",
    focus: [],
  });

  useEffect(() => {
    console.log(currDiscipline._id);
  }, [formState]);

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
    const ref = formState.name.split(" ").join("-");
    const disciplineId = currDiscipline?._id;
    if (disciplineId) {
      setFormState({ ...formState, discipline: disciplineId, ref: ref });
    }
    try {
      const response = await aerialApi.post("/figures", formState);
      console.log(response);
      if (response.status === 201) {
        console.log("figure created", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const { name, difficulty, image, imgArtist, imgArtistUrl } = formState;

  return (
    <div>
      <h3>Add a figure to the database:</h3>
      <form onSubmit={handleSubmit} className="flex flex-col">
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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddFigure;
