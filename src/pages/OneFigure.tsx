import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useUser from "../context/useUser";
import aerialApi from "../service/aerialApi";

import { figType } from "../components/Types";

import FigInfo from "../components/PagesComponents/FigureElements/FigInfo";
import FigForm from "../components/PagesComponents/FigureElements/FigForm";

import ProgressLog from "../components/PagesComponents/FigureElements/ProgressLog";
import EntriesExits from "../components/PagesComponents/FigureElements/EntriesExits";
import { HiOutlinePencil, HiArrowCircleLeft } from "react-icons/hi";

const OneFigure = () => {
  const { currDiscipline, modViewOn } = useUser();
  const { figureRef } = useParams<string>();
  const [figData, setFigData] = useState<figType | null>(null);

  const navigate = useNavigate();

  // state for mod to edit form
  const [formMode, setFormMode] = useState<boolean>(false);

  function handleFormMode() {
    setFormMode((prevFormMode) => !prevFormMode);
  }

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
        Looks like this figure doesn't exist for the {currDiscipline?.name}
        discipline
        <button onClick={() => navigate(`/${currDiscipline?.ref}/figures`)}>
          Go back to {currDiscipline?.name} figures
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
      <div className="LeftTopSide relative flex flex-col lg:h-full lg:basis-2/3 overflow-scroll no-scrollbar">
        {modViewOn && (
          <button
            onClick={handleFormMode}
            className="absolute top-2 right-2 rounded-full bg-mainlight hover:bg-mainvar active:bg-main p-2"
          >
            <HiOutlinePencil className="text-white text-xl " />
          </button>
        )}
        <button
          onClick={() => navigate(`/${currDiscipline?.ref}/figures`)}
          className="absolute top-2 left-2 text-3xl text-main"
        >
          {" "}
          <HiArrowCircleLeft />{" "}
        </button>
        {!formMode ? (
          <FigInfo figData={figData} />
        ) : (
          <FigForm figData={figData} />
        )}
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
