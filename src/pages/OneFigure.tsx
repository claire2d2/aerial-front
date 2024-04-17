import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

type figType = {
  id: string;
  name: string;
  image: string;
  discipline: {
    name: string;
    ref: string;
  };
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
};

const OneFigure = () => {
  const { currDiscipline, currDisciplineRef } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchFigData() {
    try {
      const response = await aerialApi.get(`/figures/${figureRef}`);
      console.log(response.data);
      setFigData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFigData();
  }, []);

  /* if user tries to access a figure that does not match the current discipline, redirect:
   ** find the location name that is being accessed
   ** check whether the current figure data discipline matches the location
   ** if not show error message, and button to go back to the correct discipline*/

  const currLocation = location.pathname.split("/")[1];
  if (figData && figData.discipline.ref !== currLocation) {
    return (
      <div>
        Looks like this figure doesn't exist for the {currDiscipline}
        discipline
        <button onClick={() => navigate(`/${currDisciplineRef}/figures`)}>
          Go back to {currDiscipline} figures
        </button>
      </div>
    );
  }

  // If data is still loading, return loading page
  if (!figData) {
    return <div>Loading</div>;
  }
  // style figure page here
  return (
    <div>
      This will be the page for the figure {figData?.name}
      <div>
        <img src={figData.image} alt="" />
      </div>
    </div>
  );
};

export default OneFigure;
