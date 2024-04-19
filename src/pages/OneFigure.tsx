import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

import StatusToggle from "../components/FigureElements/StatusToggle";
import ProgressLog from "../components/FigureElements/ProgressLog";
import EntriesExits from "../components/FigureElements/EntriesExits";
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

type favoriteType = {
  _id: string;
  user: string;
  figure: string;
};

const OneFigure = () => {
  const { currDiscipline, currDisciplineRef } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);
  // imported in StatusToggle component
  const [status, setStatus] = useState<string>("Not seen yet");
  const [oneSideStatus, setOneSideStatus] = useState<string | null>(null);
  // to import in future Favorite component
  const [favorites, setFavorites] = useState<favoriteType[]>([]);
  const [isFave, setIsFave] = useState<boolean>(false);
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
    fetchFavorites();
    if (favorites?.find((fave) => fave.figure === figData?._id)) {
      setIsFave(true);
    }
  }, []);

  /**
   * Favorites function here
   */

  async function handleFavorite(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault;
    if (isFave) {
      setIsFave(false);
      removeFave();
    } else {
      setIsFave(true);
      makeFave();
    }
    fetchFavorites();
  }

  async function fetchFavorites() {
    try {
      const response = await aerialApi.get("/favorites");
      setFavorites(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeFave() {
    try {
      await aerialApi.delete(`/favorites/${figData?._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function makeFave() {
    try {
      await aerialApi.post(`/favorites/${figData?._id}`);
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className="FigInfo flex flex-col gap-2 justify-center items-center ">
          <h1 className="font-bold text-4xl capitalize">{figData?.name}</h1>
          <div className="aspect-square h-60 drop-shadow-md dark:brightness-90 ">
            <img
              src={figData.image}
              alt={`image of ${figData?.name}`}
              className="object-cover h-full w-full rounded-lg"
            />
          </div>
          <div className="font-semibold text-lg text-center text-main dark:text-textdark">
            <p>Level:</p>{" "}
            <p className="capitalize font-normal text-text dark:text-textdark">
              {figData?.difficulty}
            </p>
          </div>
          <div className="w-full px-20 py-2 flex flex-col text-center">
            <p className="font-semibold text-lg text-main dark:text-textdark">
              Status:
            </p>
            <StatusToggle
              status={status}
              setStatus={setStatus}
              oneSideStatus={oneSideStatus}
              setOneSideStatus={setOneSideStatus}
              currFigId={figData._id}
            />
          </div>
          <button
            onClick={(e) => handleFavorite(e)}
            className={`w-1/3 flex  justify-center gap-2 items-center rounded-lg px-1 py-2 border text-lg font-semibold shadow-sm ${
              isFave ? "border-gray text-main" : "border-disabled text-gray"
            }`}
          >
            <HiHeart
              className={`text-2xl ${isFave ? "text-isFave" : "text-disabled"}`}
            />
            Favorite
          </button>
        </div>
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
