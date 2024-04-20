import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

import { figType } from "../components/Types";

import StatusToggle from "../components/PagesComponents/FigureElements/StatusToggle";
import ProgressLog from "../components/PagesComponents/FigureElements/ProgressLog";
import EntriesExits from "../components/PagesComponents/FigureElements/EntriesExits";
import FavoriteButton from "../components/PagesComponents/FavoriteButton";

const OneFigure = () => {
  const { currDiscipline, currDisciplineRef } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);
  // imported in StatusToggle component
  const [status, setStatus] = useState<string>("Not seen yet");
  const [oneSideStatus, setOneSideStatus] = useState<string | null>(null);
  // to import in future Favorite component
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchFigData() {
    try {
      const response = await aerialApi.get(`/figures/fig/${figureRef}`);
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
    <div className="w-full flex flex-col lg:flex-row lg:h-full">
      <div className="LeftTopSide flex flex-col lg:h-full lg:basis-2/3 overflow-scroll no-scrollbar">
        <div className="FigInfo flex flex-col lg:flex-row lg:basis-1/2 gap-2 justify-center items-center mb-2">
          {/* Title, figure image + figure credits */}
          <div className="FigCard flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-4xl capitalize">{figData?.name}</h1>
            <div className="aspect-square h-60 drop-shadow-md dark:brightness-90 ">
              <img
                src={figData.image}
                alt={`image of ${figData?.name}`}
                className="object-cover h-full w-full rounded-lg"
              />
            </div>
            <div className="text-xs text-darkgray">
              This image was found on{" "}
              <a
                href={figData.imgArtistUrl}
                target="blank"
                className="underline"
              >
                {figData.imgArtist}
              </a>
            </div>
          </div>
          {/* Level, difficulty and favorite */}
          <div className="flex-col flex items-center lg:basis-1/2 ">
            <div className="font-semibold text-lg text-center text-main dark:text-textdark">
              <p>Level:</p>{" "}
              <p className="capitalize font-normal text-text dark:text-textdark">
                {figData?.difficulty}
              </p>
            </div>
            <div className="font-semibold text-lg text-center text-main dark:text-textdark">
              <p>Focuses on:</p>
              <ul className="text-text font-normal flex flex-row gap-2 capitalize">
                {figData.focus.map((focus) => {
                  return <li>{focus.name}</li>;
                })}
              </ul>
            </div>
            <div className="w-full px-20 py-2 flex flex-col text-center">
              <p className="font-semibold text-lg text-main dark:text-textdark">
                Status:
              </p>
              <div className="py-2">
                <StatusToggle
                  status={status}
                  setStatus={setStatus}
                  oneSideStatus={oneSideStatus}
                  setOneSideStatus={setOneSideStatus}
                  currFigId={figData._id}
                />
              </div>
            </div>
            <div className="w-1/3 flex">
              <FavoriteButton fullButton={true} figId={figData._id} />
            </div>
          </div>
        </div>
        {/* Progress log */}
        <div className="">
          <ProgressLog currFigId={figData._id} />
        </div>
      </div>

      <div className="RightBottomSide flex flex-col lg:h-full lg:basis-1/3">
        <EntriesExits currFigId={figData._id} />
      </div>
    </div>
  );
};

export default OneFigure;
