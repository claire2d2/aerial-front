import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

import StatusToggle from "../components/FigureElements/StatusToggle";
import ProgressLog from "../components/FigureElements/ProgressLog";
import { HiHeart } from "react-icons/hi2";

type figType = {
  _id: string;
  name: string;
  ref: string;
  image: string;
  discipline: {
    name: string;
    ref: string;
  };
  difficulty: string;
  imgArtist: string;
  imgArtistUrl: string;
  // comments:
};

const OneFigure = () => {
  const { currDiscipline, currDisciplineRef } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);
  // imported in StatusToggle component
  const [status, setStatus] = useState<string>("Not seen yet");
  const [oneSideStatus, setOneSideStatus] = useState<string | null>(null);
  // imported in ProgressLog component

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
  if (!figData || !figureRef) {
    return <div>Loading</div>;
  }
  // style figure page here
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="FigInfo flex flex-col gap-2 justify-center items-center lg:basis-2/3">
        <h1 className="font-bold text-4xl capitalize">{figData?.name}</h1>
        <div className="aspect-square h-60 drop-shadow-md">
          <img
            src={figData.image}
            alt={`image of ${figData?.name}`}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
        <div className="font-semibold text-lg text-center text-main">
          <p>Level:</p>{" "}
          <p className="capitalize font-normal text-text">
            {figData?.difficulty}
          </p>
        </div>
        <div className="w-full px-20 py-2 flex flex-col text-center">
          <p className="font-semibold text-lg text-main">Status:</p>
          <StatusToggle
            status={status}
            setStatus={setStatus}
            oneSideStatus={oneSideStatus}
            setOneSideStatus={setOneSideStatus}
            currFigId={figData._id}
          />
        </div>
        <div className="w-full flex gap-4 items-center justify-center">
          <HiHeart className="text-golden" />
          Add to favorites
        </div>
        <ProgressLog currFigId={figData._id} />
      </div>
      <div className="RightSide bg-green-200 lg:basis-1/3">
        <div>Entries</div>
        <div>Exits</div>
      </div>
    </div>
  );
};

export default OneFigure;
